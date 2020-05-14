import React, { useState, useEffect, useRef } from 'react';

import AssessmentSlider from './AssessmentsSlider';
import AssessmentsStage from './AssessmentsStage';

import useHttp from '../../hooks/useHttp.hook';
import TaskPopup from '../../components/tasks-tracker/TaskPopup';

const AssessmentCategory = props => {
  const trackRef = useRef(null);
  const { request } = useHttp();
  const [state, setState] = useState({
    stages: props.stages,
    infoForCreateTaskFromStage: null,
    loading: true,
    saved: false,
    activeStageIndex: 0,
    showPopup: false
  });
  const stagesCountForFullWidth = 6;

  const checkStagesCountForFullWidth = () => props.stages.length <= stagesCountForFullWidth ? 'full-width' : '';

  const handleChangeProgress = index => {
    let updatedStages = [...state.stages];
    updatedStages.forEach((stage, i) => i <= +index ? stage.isActive = true : stage.isActive = false);
    setState({ ...state, stages: updatedStages, activeStageIndex: index });
  }

  const updateProgressRequest = async position => {
    const { assessmentId, categoryId, subCategoryId } = props;
    const currentStage = state.stages.find(stage => stage.position === position + 1);
    await request(`/api/assessments/${assessmentId}/categories/${categoryId}/sub_categories/${subCategoryId}/update_progress?current_stage_id=${currentStage.id}&customer_id=${props.customerId}`, 'POST');
    setState(state => ({ ...state, saved: true }));
    setTimeout(() => setState(state => ({ ...state, saved: false })), 2000);
  }

  const handleShowAddTaskPopup = stage => {
    setState({ ...state, showPopup: true, infoForCreateTaskFromStage: stage })
  }

  useEffect(() => {
    const activeStageIndex = props.stages.findIndex(stage => props.current_stage_id === stage.id);
    handleChangeProgress(activeStageIndex);
    setTimeout(() => setState(state => ({ ...state, loading: false, activeStageIndex })), 100);
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
      <div className="assessment-stage-scroll-container">
        <div className="assessment-setting-stages">
          <div className={`stages ${checkStagesCountForFullWidth()}`}>
            <div className="stages-slider">
              <div className={`range-track ${state.loading ? 'disable' : ''}`} ref={trackRef}></div>
              {
                props.userType === 'Admin' ?
                  <AssessmentSlider
                    steps={props.stages.length}
                    activeStageIndex={state.activeStageIndex}
                    handleChangeProgress={handleChangeProgress}
                    updateProgressRequest={updateProgressRequest}
                  /> : null
              }
            </div>
            <div className="stages-list">
              {
                state.stages.map((stage, i) =>
                  <AssessmentsStage
                    {...stage}
                    index={i}
                    key={stage.id}
                    trackWidth={trackRef.current}
                    stagesCount={state.stages.length}
                    userType={props.userType}
                    categoryName={props.categoryName}
                    subCategoryName={props.sub_category_title}
                    handleChangeProgress={handleChangeProgress}
                    updateProgressRequest={updateProgressRequest}
                    handleShowAddTaskPopup={handleShowAddTaskPopup}
                  />
                )
              }
            </div>
          </div>
        </div>
      </div>
      {
        state.showPopup &&
        <TaskPopup
          assessments={props.assessments}
          assessmentName={props.assessmentName}
          currentCustomerId={props.customerId}
          handleClosePopup={() => setState({ ...state, showPopup: false })}
          infoForCreateTaskFromStage={state.infoForCreateTaskFromStage}
        />
      }
    </React.Fragment>
  )
}

export default AssessmentCategory
