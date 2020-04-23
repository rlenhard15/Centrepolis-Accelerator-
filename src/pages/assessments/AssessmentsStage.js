import React from 'react';

import './AssessmentsStage.scss';

const AssessmentsStage = props => {
  const changeProgressByClick = () => {
    props.handleChangeProgress(props.index);
    props.updateProgressRequest(props.index);
  }
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
                <span className={`stages-item-circle stage-${props.index} ${props.userType === 'Admin' ? 'click' : ''}`}></span>
            }
            <span className="stages-item-line" style={{ 'width': props.trackWidth.clientWidth / props.stagesCount + 20 }}></span>
            {props.title}
          </div> : null
      }
    </>
  )
}

export default AssessmentsStage