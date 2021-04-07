import React from 'react';

import { CustomButton } from '../common/Button';
import { CustomSwitch } from '../common/Switch';
import { InputField } from '../../components/common/InputField';

import './NotificationsSettings.scss';

const NotificationsSettings = () => {
  return (
    <div className="notifications-settings">
      <h3 className="notifications-settings-header">Email Notification</h3>
      <InputField
        label="Email"
        name="email"
        // value={values.firstName}
        // onChange={handleChange}
        // error={errors.firstName}
        // errorText={errors.password_message}
      />
      <CustomSwitch
        label="Send email notifications"
        checked={true}
        handleClick={console.log}
      />
      <CustomButton
        className="notifications-settings-submit"
        type="submit"
        label="Save Changes"
      />
    </div>
  );
}

export default NotificationsSettings;
