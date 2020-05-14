import React from 'react';

import { Link } from 'react-router-dom';

const AssessmentLink = props => {
  const {id, risk_name, customerId, userType} = props
  return (
    userType !== 'Admin' ?
      <Link to={`/assessments/${id}/${risk_name}`} className={`assessment-link ${!id ? 'disabled' : ''}`}>Take assessment</Link> :
      <Link to={`/assessments/${id}/${risk_name}/${customerId}`} className={`assessment-link ${!id ? 'disabled' : ''}`}>View</Link>
  )
}

export default AssessmentLink
