import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CustomButton } from '../common/Button';

const AssessmentLink = props => {
  const {id, risk_name, customerId, userType, className} = props
  const history = useHistory()

  const handleClick = () => {
    history.push(
      userType !== 'Admin'
        ? `/assessments/${id}/${risk_name}`
        : `/assessments/${id}/${risk_name}/${customerId}`
    )
  }

  return (
    <CustomButton
      handleClick={handleClick}
      className={className}
      label={userType !== 'Admin' ? 'Take assessment' : 'View'}
    />
  )
}

export default AssessmentLink
