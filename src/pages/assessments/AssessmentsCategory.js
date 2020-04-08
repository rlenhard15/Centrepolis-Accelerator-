import React, { useState, useEffect, useRef } from 'react';

import AssessmentSlider from './AssessmentsSlider';
import AssessmentsStage from './AssessmentsStages';

import useHttp from '../../hooks/useHttp.hook';

const AssessmentCategory = props => {
  const trackRef = useRef(null);
  const { request } = useHttp();
  const setInitialStages = () => props.stages.map(stage => ({ ...stage, isActive: false }));
  const [state, setState] = useState({
    stages: setInitialStages(),
    loading: true,
    saved: false
  });

  const handleChangeProgress = index => {
    let updatedStages = [...state.stages];
    for (let i = 0; i <= updatedStages.length - 1; i++) {
      if (i <= +index) {
        updatedStages[i].isActive = true;
      } else {
        updatedStages[i].isActive = false;
      }
    }
    setState({ ...state, stages: updatedStages });
  }

  const updateProgressRequest = async position => {
    const { assessmentId, categoryId, subCategoryId } = props;
    const currentStage = state.stages.find(stage => stage.position === position + 1)
    await request(`/api/assessments/${assessmentId}/categories/${categoryId}/sub_categories/${subCategoryId}/update_progress?current_stage_id=${currentStage.id}`, 'POST');
    setState({...state, saved: true})
  }

  useEffect(() => {
    setTimeout(() => setState({ ...state, loading: false }), 100);
  }, [])

  return (
    <React.Fragment
      key={props.category_id}
    >
      <div className="assessment-setting-subtitle-wrapper">
        <p className="assessment-setting-subtitle">{props.index + 1}. {props.title}</p>
        {
          state.saved ? <span className="saved">Changes saved</span> : null
        }
      </div>
      {
        props.userType === 'Customer' ?
          <AssessmentSlider
            steps={props.stages.length}
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
