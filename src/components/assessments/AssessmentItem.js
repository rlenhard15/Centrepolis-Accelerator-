import React from 'react';
import { Link } from 'react-router-dom';

import RiskProgress from './AssessmentsRiskProgress';

const AssessmentsItem = props => {
  const { id, userType, risk_type, risk_name, risk_class } = props;
  return (
    <div className={`assessment-item ${risk_type !== 'Incomplete' ? 'have-assessment' : ''}`}>
      <div className="assessment-item-top">
        <span className="assessment-item-name">{risk_name} Risk</span>
        <span className={`assessment-item-type ${risk_class || ''}`}>{risk_type}</span>
      </div>
      <div className="assessment-risk-progress">
        <RiskProgress type={risk_type} />
      </div>
      <div className="assessment-item-bottom">
        <span className="assessment-item-risk low">Low</span>
        <span className="assessment-item-risk medium">Medium</span>
        <span className="assessment-item-risk hight">Hight</span>
      </div>
      {
        userType !== 'Admin' ?
          <Link to={`/assessments/${id || props.firstItemId}/${risk_name}`} className="assessment-link">Take assessment</Link> :
          <Link to={`/assessments/${id || props.firstItemId}/${risk_name}`} className="assessment-link">View</Link>
      }
    </div>
  )
}

export default AssessmentsItem
