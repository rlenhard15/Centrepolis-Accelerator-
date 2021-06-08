import React from 'react'

import AssessmentLink from './AssessmentLink'
import RiskProgress from './AssessmentsRiskProgress'

const AssessmentsItem = props => {
  const { startupId, assessment, handleOpenInfoPopup } = props
  const { risk_name, risk_type, risk_class, risk_value } = assessment

  return (
    <div className={`assessment-item ${risk_type !== 'Incomplete' ? 'have-assessment' : ''}`}>
      <div className="assessment-item-top">
        <span className="assessment-item-name">{risk_name} Risk</span>
        <span className={`assessment-item-type ${risk_class || ''}`}>{risk_type}</span>
      </div>
      <div className="assessment-risk-progress">
        <RiskProgress value={risk_value} riskClass={risk_class} riskType={risk_type} />
      </div>
      <div className="assessment-item-bottom">
        <span className="assessment-item-risk low">Low</span>
        <span className="assessment-item-risk medium">Medium</span>
        <span className="assessment-item-risk high">High</span>
      </div>
      <AssessmentLink
        className="assessment-item-button"
        startupId={startupId}
        assessment={assessment}
      />
      <div className="assessment-item-learn-more" onClick={() => handleOpenInfoPopup(assessment)}>
        Learn more
      </div>
    </div>
  )
}

export default AssessmentsItem
