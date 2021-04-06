import React from 'react';

import Header from '../../components/header/Header';
import PersonSettings from '../../components/profileSettings/PersonSettings';
import DashboardMenu from '../dashboard/DashboardMenu';

import './ProfileSettings.scss';

const ProfileSettings = props => {

  return (
    <div className="profile-settings-page">
      <DashboardMenu />
      <div className="profile-settings">
        <Header className="board" {...props} />
        <PersonSettings />
      </div>
    </div>
  );
}

export default ProfileSettings;
