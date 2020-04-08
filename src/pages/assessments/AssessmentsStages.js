import React from 'react';

import './AssessmentsStages.scss';

const AssessmentsStage = props => {
  return (
    <>
      {
        props.trackWidth ?
        <div
          key={props.id}
          className={`stages-item ${props.isActive ? 'active' : ''}`}
        >
          <span className={`stages-item-circle stage-${props.index}`}></span>
          <span className="stages-item-line" style={{ 'width': props.trackWidth.clientWidth / props.stagesCount + 20}}></span>
          {props.title}
        </div> : null
      }
    </>
  )
}

export default AssessmentsStage