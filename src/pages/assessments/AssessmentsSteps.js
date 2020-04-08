import React from 'react';

import './AssessmentsSteps.scss';

const AssessmentsSteps = props => {
  return (
    <div className="assessment-steps">
      {
        props.categories.map((category, i) =>
          <div
            key={category.id}
            className="assessment-steps-item"
            onClick={() => props.changePage(category.id)}
          >
            <span className={`step-number ${props.activeCategory === category.id ? 'active' : ''}`}>{i + 1}</span>
            <span className="step-name">{category.title}</span>
          </div>)
      }
    </div>
  )
}

export default AssessmentsSteps
