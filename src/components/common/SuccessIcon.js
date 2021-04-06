import React from 'react';

import checkIcon from '../../images/icons/check.svg';

import './SuccessIcon.scss';

const SuccessIcon = () => {
  return (
    <div className="success-icon">
      <div className="success-icon-inner-cnt">
        <img src={checkIcon} alt="success" />
      </div>
    </div>
  );
};

export default SuccessIcon;
