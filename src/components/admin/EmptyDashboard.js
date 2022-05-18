import React from 'react';

import GridImg from '../../images/icons/empty-db-img.svg';
import { useAuthContext } from '../../utils/context';

import { CustomButton } from '../common/Button';

function EmptyDashboard(props) {
  const { isSuperAdmin } = useAuthContext();

  return (
    <div className="empty-dashboard">
      <div className="empty-dashboard-content">
        <img src={GridImg} alt="" />
        <p className="empty-dashboard-content-title">Start Building your Dashboard!</p>
        <p className="empty-dashboard-content-subtitle">Before we can create your dashboard, we’ll
          first need to get some of your clients in here</p>
        <div className="empty-dashboard-content-buttons">
          <CustomButton
            label="Add Startup"
            variant="outlined"
            handleClick={props.openCreateStartupPopup}
          />
          {isSuperAdmin
          && (
            <CustomButton
              label="Add New Admin"
              handleClick={props.openShowInvitePopup}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default EmptyDashboard;
