import React from 'react';
import toastr from 'toastr';

import { CustomButton } from '../common/Button';
import { CustomSwitch } from '../common/Switch';
import { InputField } from '../common/InputField';
import useForm from '../../hooks/useForm.hook';
import useHttp from '../../hooks/useHttp.hook';
import validate from '../../validationRules/notifications';
import { useAuthContext } from '../../utils/context';

import './NotificationsSettings.scss';

function NotificationsSettings() {
  const {
    authData,
    handleUpdateUser,
  } = useAuthContext();

  const inviteFields = {
    notificationsEnabled: authData.user.email_notification,
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
    setValues,
  } = useForm(() => changePassword(), validate, inviteFields);

  const changePassword = async () => {
    try {
      const user = await request('api/users/update_email_notification', 'PUT', {
        email_notification: values.notificationsEnabled.toString(),
      });
      handleUpdateUser(user);
      toastr.success('Notifications have been updated', 'Success');
    } catch (error) {
      toastr.error('Something went wrong', 'Error');
    }
  };

  const handleToggleNotifications = (_e, value) => {
    setValues(values => ({
      ...values,
      notificationsEnabled: value,
    }));
  };

  return (
    <div className="notifications-settings mt-8">
      <h3 className="notifications-settings-header">Email Notification</h3>
      <InputField
        label="Email"
        name="email"
        value={authData.user.email}
        onChange={handleChange}
        error={errors.email}
        errorText={errors.emailError}
        disabled
      />
      <CustomSwitch
        label="Send email notifications"
        checked={values.notificationsEnabled}
        handleClick={handleToggleNotifications}
      />
      <CustomButton
        className="notifications-settings-submit"
        type="submit"
        label="Save Changes"
        handleClick={handleSubmit}
        disabled={loading}
      />
    </div>
  );
}

export default NotificationsSettings;
