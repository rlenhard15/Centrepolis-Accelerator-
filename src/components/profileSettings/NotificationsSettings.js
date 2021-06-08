import React from 'react'

import { CustomButton } from '../common/Button'
import { CustomSwitch } from '../common/Switch'
import { InputField } from '../../components/common/InputField'
import useForm from '../../hooks/useForm.hook'
import useHttp from '../../hooks/useHttp.hook'
import validate from '../../validationRules/notifications'
import './NotificationsSettings.scss'

const NotificationsSettings = () => {

  const inviteFields = {
    // TODO
    email: '',
    notificationsEnabled: true,
  }

  const { loading, request } = useHttp()
  const { values, errors, handleChange, handleSubmit, setValues } = useForm(() => changePassword(), validate, inviteFields)

  const changePassword = async () => {
    await request(`api/users/update_email_notification`, 'PUT', {
      email_notification: values.notificationsEnabled
    })
  }

  const handleToggleNotifications = (_e, value) => {
    setValues(values => ({
      ...values,
      notificationsEnabled: value
    }))
  }

  return (
    <div className="notifications-settings">
      <h3 className="notifications-settings-header">Email Notification</h3>
      <InputField
        label="Email"
        name="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        errorText={errors.emailError}
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
  )
}

export default NotificationsSettings
