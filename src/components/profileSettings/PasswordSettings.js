import React from 'react';

import { CustomButton } from '../common/Button';
import { InputField } from '../../components/common/InputField';

import './PasswordSettings';

const PasswordSettings = () => {
  return (
    <div className="password-settings">
      <h3 className="password-settings-header">Personal information</h3>

      <div className="password-settings-form-row">
        <InputField
          label="First Name"
          name="firstName"
          // value={values.firstName}
          // onChange={handleChange}
          // error={errors.firstName}
          // errorText={errors.password_message}
        />
        <InputField
          label="Last Name"
          name="lastName"
          // value={values.lastName}
          // onChange={handleChange}
          // error={errors.lastName}
          // errorText={errors.password_message}
        />
      </div>

      <div className="password-settings-form-row">
        <InputField
          label="Email"
          type="email"
          name="email"
          // value={values.email}
          // onChange={handleChange}
          // error={errors.email}
          // errorText={errors.password_message}
        />
        <InputField
          label="Phone Number"
          name="phoneNumber"
          // value={values.phoneNumber}
          // onChange={handleChange}
          // error={errors.phoneNumber}
          // errorText={errors.password_message}
        />
      </div>

      <CustomButton
        className="password-settings-submit"
        type="submit"
        label="Sign Up"
      />
    </div>
  );
}

export default PasswordSettings
