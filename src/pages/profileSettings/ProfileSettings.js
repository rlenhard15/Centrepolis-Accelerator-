import React, {useContext} from 'react';

import Header from '../../components/header/Header';
import PersonSettings from '../../components/profileSettings/PersonSettings';
import PasswordSettings from '../../components/profileSettings/PasswordSettings';
import NotificationsSettings from '../../components/profileSettings/NotificationsSettings';
import DashboardMenu from '../dashboard/DashboardMenu';

import { useAuthContext } from '../../CheckAuthorization';
import { Tab, Tabs } from '../../components/common/Tabs';

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
            <Tabs baseUrl="/settings">
              <Tab tab="" label="Assignments">
                <PersonSettings />
              </Tab>
              <Tab tab="security" label="Security">
                <PasswordSettings />
              </Tab>
              <Tab tab="notifications" label="Notifications">
                <NotificationsSettings />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
