import React from 'react';

import './AssessmentsSteps.scss';

const AssessmentsSteps = props => {
  return (
    <div className="assessment-steps">
      {
        props.settings.map((step, i) =>
          <div
            key={step.id}
            className="assessment-steps-item"
            onClick={() => props.changePage(i + 1)}
          >
            <span className={`step-number ${props.step === step.id ? 'active' : ''}`}>{i + 1}</span>
            <span className="step-name">{step.title}</span>
          </div>)
      }
    </div>
  )
}

export default AssessmentsSteps
