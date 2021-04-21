import React from 'react';
import { Link } from 'react-router-dom';

import { CustomButton } from '../common/Button';
import { InputField } from '../../components/common/InputField';

import './PasswordSettings.scss';

const PasswordSettings = () => {
  return (
    <div className="password-settings">
      <h3 className="password-settings-header">Change password</h3>
      <InputField
        label="Current password"
        name="currentPassword"
        // value={values.firstName}
        // onChange={handleChange}
        // error={errors.firstName}
        // errorText={errors.password_message}
      />
      <InputField
        label="New password"
        name="newPassword"
        // value={values.lastName}
        // onChange={handleChange}
        // error={errors.lastName}
        // errorText={errors.password_message}
      />
      <CustomButton
        className="password-settings-submit"
        type="submit"
        label="Change Password"
      />
      <p className="password-settings-alternative">
        <span>
          Don’t remember your password?
          <Link to="/forgot-password">Reset Password</Link>
        </span>
      </p>
    </div>
  );
}

export default PasswordSettings;
