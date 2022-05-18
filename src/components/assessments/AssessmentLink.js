import React from 'react';
import { useHistory } from 'react-router-dom';

import { CustomButton } from '../common/Button';
import { useAuthContext } from '../../utils/context';

function AssessmentLink(props) {
  const {
    startupId,
    assessment,
    className,
  } = props;
  const {
    id,
    risk_name,
  } = assessment;

  const { isMember } = useAuthContext();
  const history = useHistory();

  const handleClick = () => {
    history.push(
      !isMember
        ? `/assessments/${startupId}/${risk_name}/${id}`
        : `/assessments/${id}/${risk_name}`,
    );
  };

  return (
    <CustomButton
      handleClick={handleClick}
      className={className}
      label={isMember ? 'Take Assessment' : 'View'}
    />
  );
}

export default AssessmentLink;
