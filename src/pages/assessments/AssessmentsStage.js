import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

import './AssessmentsStage.scss';

const AssessmentsStage = props => {
  const changeProgressByClick = () => {
    props.handleChangeProgress(props.index);
    props.updateProgressRequest(props.index);
  }

  const stageInfo = {
    category: props.categoryName,
    sub_category: props.subCategoryName,
    stage_title: props.title
  };

  return (
    <>
      {
        props.trackWidth ?
          <div
            key={props.id}
            className={`stages-item ${props.isActive ? 'active' : ''}`}
          >
            {
              props.userType === 'Admin' ?
                <span
                  className={`stages-item-circle click stage-${props.index}`}
                  onClick={changeProgressByClick}
                >
                </span> :
                <span
                  className={`stages-item-circle stage-${props.index} ${props.userType === 'Admin' ? 'click' : ''}`}
                >
                </span>
            }
            <span className="stages-item-line" style={{ 'width': props.trackWidth.clientWidth / props.stagesCount + 20 }}></span>
            {props.title}
            {
              props.userType === 'Admin' ?
                <IconButton
                  className="stages-item-btn"
                  onClick={() => props.handleShowAddTaskPopup(stageInfo)}
                >
                  <span className="add-icon"></span>
                </IconButton> : null
            }
          </div> : null
      }
    </>
  )
}

export default AssessmentsStage