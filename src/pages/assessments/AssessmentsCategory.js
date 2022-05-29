import React, { useEffect, useRef, useState } from 'react';
import toastr from 'toastr';

import AssessmentSlider from './AssessmentsSlider';
import AssessmentsStage from './AssessmentsStage';

import useHttp from '../../hooks/useHttp.hook';
import TaskPopup from '../../components/tasks-tracker/TaskPopup';
import { useAuthContext } from '../../utils/context';

function AssessmentCategory(props) {
  const trackRef = useRef(null);
  const { request } = useHttp();
  const { authData: { user } } = useAuthContext();

  const customerId = user.id;
  const { startupId } = props;

  const {
    stages,
    category_id,
    current_stage_id,
    categoryName,
    sub_category_title,
    assessments,
    assessmentName,
  } = props;

  const [state, setState] = useState({
    stages,
    infoForCreateTaskFromStage: null,
    loading: true,
    saved: false,
    activeStageIndex: 0,
    showPopup: false,
  });

  const stagesCountForFullWidth = 6;

  const checkStagesCountForFullWidth = () => (stages.length <= stagesCountForFullWidth
    ? 'full-width'
    : '');

  const handleChangeProgress = indexOfChanges => {
    const updatedStages = [...state.stages];
    updatedStages.forEach((stage, i) => (i <= +indexOfChanges
      ? stage.isActive = true
      : stage.isActive = false));
    setState({
      ...state,
      stages: updatedStages,
      activeStageIndex: indexOfChanges,
    });
  };

  const updateProgressRequest = async position => {
    const {
      assessmentId,
      categoryId,
      subCategoryId,
    } = props;
    const currentStage = state.stages.find(stage => stage.position === position + 1);
    await request(`/api/assessments/${assessmentId}/categories/${categoryId}/sub_categories/${subCategoryId}/update_progress?current_stage_id=${currentStage.id}&startup_id=${startupId}`, 'POST');
    setState(newState => ({
      ...newState,
      saved: true,
    }));
    setTimeout(() => setState(newState => ({
      ...newState,
      saved: false,
    })), 2000);
  };

  const handleShowAddTaskPopup = stage => {
    setState({
      ...state,
      showPopup: true,
      infoForCreateTaskFromStage: stage,
    });
  };

  const handleClosePopup = () => {
    setState({
      ...state,
      showPopup: false,
    });
    toastr.success('Task has been created', 'Success');
  };

  useEffect(() => {
    const activeStageIndex = stages.findIndex(stage => current_stage_id === stage.id);
    handleChangeProgress(activeStageIndex);
    setTimeout(() => setState(newState => ({
      ...newState,
      loading: false,
      activeStageIndex,
    })), 100);
  }, []);

  return (
    <React.Fragment
      key={category_id}
    >
      <div className="flex flex-row items-center h-10 justify-between">
        <p className="assessment-setting-title">
          {categoryName} - {sub_category_title}
        </p>
        {
          state.saved ? <span className="saved">Changes saved</span> : null
        }
      </div>
      <div>
        <p className="text-xs">Please click on the appropriate circle below</p>
      </div>
      <div className="assessment-stage-scroll-container">
        <div className="assessment-setting-stages">
          <div className={`stages ${checkStagesCountForFullWidth()}`}>
            <div className="stages-slider">
              <div className={`range-track ${state.loading ? 'disable' : ''}`} ref={trackRef} />
              <AssessmentSlider
                steps={stages.length}
                activeStageIndex={state.activeStageIndex}
                handleChangeProgress={handleChangeProgress}
                updateProgressRequest={updateProgressRequest}
              />
            </div>
            <div className="stages-list">
              {
                state.stages.map((stage, i) => (
                  <AssessmentsStage
                    {...stage}
                    index={i}
                    isCurrentStage={state.activeStageIndex === i}
                    key={stage.id}
                    trackWidth={trackRef.current}
                    stagesCount={state.stages.length}
                    categoryName={categoryName}
                    subCategoryName={sub_category_title}
                    handleChangeProgress={handleChangeProgress}
                    updateProgressRequest={updateProgressRequest}
                    handleShowAddTaskPopup={handleShowAddTaskPopup}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
      {
        state.showPopup
        && (
          <TaskPopup
            assessments={assessments}
            assessmentName={assessmentName}
            currentCustomerId={customerId}
            handleClosePopup={handleClosePopup}
            infoForCreateTaskFromStage={state.infoForCreateTaskFromStage}
            startupId={startupId}
          />
        )
      }
    </React.Fragment>
  );
}

export default AssessmentCategory;
