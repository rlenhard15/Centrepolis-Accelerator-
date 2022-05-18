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
    index,
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

  const handleChangeProgress = index => {
    const updatedStages = [...state.stages];
    updatedStages.forEach((stage, i) => (i <= +index
      ? stage.isActive = true
      : stage.isActive = false));
    setState({
      ...state,
      stages: updatedStages,
      activeStageIndex: index,
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
    setState(state => ({
      ...state,
      saved: true,
    }));
    setTimeout(() => setState(state => ({
      ...state,
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

  const getTitle = title => (title ? `${index + 1}. ${title}` : null);

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
    setTimeout(() => setState(state => ({
      ...state,
      loading: false,
      activeStageIndex,
    })), 100);
  }, []);

  return (
    <React.Fragment
      key={category_id}
    >
      <div className="flex flex-row items-center h-10 justify-between">
        <p className="assessment-setting-subtitle">
          {getTitle(sub_category_title)}
        </p>
        {
          state.saved ? <span className="saved">Changes saved</span> : null
        }
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
