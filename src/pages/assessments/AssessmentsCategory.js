import React, { useState, useEffect, useRef } from 'react';

import AssessmentSlider from './AssessmentsSlider';
import AssessmentsStage from './AssessmentsStage';

import useHttp from '../../hooks/useHttp.hook';

const AssessmentCategory = props => {
  const trackRef = useRef(null);
  const { request } = useHttp();
  const [state, setState] = useState({
    stages: props.stages,
    loading: true,
    saved: false,
    activeStageIndex: 0,
  });

  const handleChangeProgress = index => {
    let updatedStages = [...state.stages];
    updatedStages.forEach((stage, i) => i <= +index ? stage.isActive = true : stage.isActive = false);
    setState({ ...state, stages: updatedStages, activeStageIndex: index });
  }

  const updateProgressRequest = async position => {
    const { assessmentId, categoryId, subCategoryId } = props;
    const currentStage = state.stages.find(stage => stage.position === position + 1);
    await request(`/api/assessments/${assessmentId}/categories/${categoryId}/sub_categories/${subCategoryId}/update_progress?current_stage_id=${currentStage.id}`, 'POST');
    setState({ ...state, saved: true })
  }

  useEffect(() => {
    const activeStageIndex = props.stages.findIndex(stage => props.current_stage_id === stage.id);
    handleChangeProgress(activeStageIndex);
    setTimeout(() => setState({ ...state, loading: false, activeStageIndex }), 100);
  }, [])

  return (
    <React.Fragment
      key={props.category_id}
    >
      <div className="assessment-setting-subtitle-wrapper">
        <p className="assessment-setting-subtitle">{props.index + 1}. {props.sub_category_title}</p>
        {
          state.saved ? <span className="saved">Changes saved</span> : null
        }
      </div>
      {
        props.userType === 'Customer' ?
          <AssessmentSlider
            steps={props.stages.length}
            activeStageIndex={state.activeStageIndex}
            handleChangeProgress={handleChangeProgress}
            updateProgressRequest={updateProgressRequest}
          /> : null
      }
      <div className="assessment-setting-stages">
        <div className={`range-track ${state.loading ? 'disable' : ''}`} ref={trackRef}></div>
        <div className="stages">
          {
            state.stages.map((stage, i) =>
              <AssessmentsStage
                key={stage.id}
                {...stage}
                index={i}
                trackWidth={trackRef.current}
                stagesCount={state.stages.length}
              />
            )
          }
        </div>
      </div>
    </React.Fragment>
  )
}

export default AssessmentCategory