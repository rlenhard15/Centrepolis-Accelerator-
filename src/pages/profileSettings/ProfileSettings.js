import React, {useContext} from 'react';

import Header from '../../components/header/Header';
import PersonSettings from '../../components/profileSettings/PersonSettings';
import PasswordSettings from '../../components/profileSettings/PasswordSettings';
import NotificationsSettings from '../../components/profileSettings/NotificationsSettings';
import DashboardMenu from '../dashboard/DashboardMenu';

import { useAuthContext, AuthContext } from '../../CheckAuthorization';

import './ProfileSettings.scss';

const ProfileSettings = () => {
  const {authData} = useAuthContext()

  return (
    <div className="profile-settings-page">
      <DashboardMenu />
      <div className="profile-settings">
        <Header className="board" userData={authData} />

        <div className="profile-settings-cnt">
          <div className="profile-settings-content">
            <h1 className="profile-settings-title">Profile Settings</h1>
            <h2 className="profile-settings-subheader">Change the personal information in the fields below</h2>
            <PersonSettings />
            <PasswordSettings />
            <NotificationsSettings />
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProfileSettings;
