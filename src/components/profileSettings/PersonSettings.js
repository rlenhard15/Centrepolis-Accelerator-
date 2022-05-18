import React, { useState } from 'react';
import { error, success } from 'toastr';

import { CustomButton } from '../common/Button';
import { InputField } from '../common/InputField';
import useForm from '../../hooks/useForm.hook';
import useHttp from '../../hooks/useHttp.hook';
import validate from '../../validationRules/personPatch';
import { useAuthContext } from '../../utils/context';

import './PersonSettings.scss';

function PersonSettings() {
  const {
    authData,
    handleUpdateUser,
  } = useAuthContext();

  const inviteFields = {
    firstName: authData.user.first_name || '',
    lastName: authData.user.last_name || '',
    email: authData.user.email,
    phoneNumber: authData.user.phone_number || '',
  };

  const {
    loading,
    request,
  } = useHttp();
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(() => updateUser(), validate, inviteFields);

  const [emailTakenError, setEmailTakenError] = useState(null);

  const updateUser = async () => {
    try {
      const user = await request('api/users/update_profile', 'PUT', {
        user: {
          first_name: values.firstName,
          last_name: values.lastName,
          phone_number: values.phoneNumber,
          email: values.email,
        },
      });
      handleUpdateUser(user);
      success('Your account has been updated', 'Success');
    } catch (err) {
      const errMessage = err.body?.email?.[0] || 'Something went wrong';
      if (err.status === 422) setEmailTakenError('Email has already been taken');
      error(errMessage, 'Error');
    }
  };

  return (
    <div className="person-settings mt-8">
      <h3 className="person-settings-header">Personal information</h3>

      <div className="person-settings-form-row">
        <InputField
          label="First Name"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          error={errors.firstName}
          errorText={errors.firstNameError}
        />
        <InputField
          label="Last Name"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          error={errors.lastName}
          errorText={errors.lastNameError}
        />
      </div>

      <div className="person-settings-form-row">
        <InputField
          label="Email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email || emailTakenError}
          errorText={errors.emailError || emailTakenError}
        />
        <InputField
          label="Phone Number"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          errorText={errors.phoneNumberError}
        />
      </div>

      <CustomButton
        className="person-settings-submit"
        type="submit"
        label="Save Changes"
        handleClick={handleSubmit}
        disabled={loading}
      />
    </div>
  );
}

export default PersonSettings;
