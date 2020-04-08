import React from 'react';

import GridImg from '../../images/icons/empty-db-img.svg';

import { CustomButton } from '../common/Button';

const EmptyDashboard = props => {
  return(
    <div className="empty-dashboard">
      <div className="empty-dashboard-content">
        <img src={GridImg} alt=""/>
        <p className="empty-dashboard-content-title">Start Building your Dashboard!</p>
        <p className="empty-dashboard-content-subtitle">Before we can create your dashboard, we’ll first need to get some of your clients in here</p>
        <CustomButton
          label="Invite Team Manager"
          handleClick={props.handleShowPopup}
        />
      </div>
    </div>
  )
}

export default EmptyDashboard
