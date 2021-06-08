import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { CustomButton } from '../common/Button'
import { InputField } from '../../components/common/InputField'
import useForm from '../../hooks/useForm.hook'
import useHttp from '../../hooks/useHttp.hook'
import validate from '../../validationRules/changePassword'

import './PasswordSettings.scss'

const PasswordSettings = () => {

  const inviteFields = {
    currentPassword: '',
    newPassword: '',
  }

  const { loading, request } = useHttp()
  const { values, errors, handleChange, handleSubmit } = useForm(() => changePassword(), validate, inviteFields)

  const [currentPasswordServerErr, setCurrentPasswordServer] = useState()
  const [newPasswordServerErr, setNewPasswordServer] = useState()

  const changePassword = async () => {
    try {
      const user = {
        current_password: values.currentPassword,
        password: values.newPassword,
      }

      await request(`api/users/change_password`, 'PUT', { user })
    } catch (err) {
      const currentPasswordError = err.body?.current_password?.[0]
      if (currentPasswordError) setCurrentPasswordServer(currentPasswordError)
      const newPasswordError = err.body?.password?.[0]
      if (newPasswordError) setNewPasswordServer(newPasswordError)
    }
  }

  return (
    <div className="password-settings">
      <h3 className="password-settings-header">Change password</h3>
      <InputField
        label="Current password"
        name="currentPassword"
        type="password"
        value={values.currentPassword}
        onChange={handleChange}
        error={errors.currentPassword || !!currentPasswordServerErr}
        errorText={errors.currentPasswordError || currentPasswordServerErr}
      />
      <InputField
        label="New password"
        name="newPassword"
        type="password"
        value={values.newPassword}
        onChange={handleChange}
        error={errors.newPassword || !!newPasswordServerErr}
        errorText={errors.newPasswordError || newPasswordServerErr}
      />
      <CustomButton
        className="password-settings-submit"
        type="submit"
        label="Change Password"
        handleClick={handleSubmit}
        disabled={loading}
      />
      <p className="password-settings-alternative">
        <span>
          Don’t remember your password?
          <Link to="/forgot-password">Reset Password</Link>
        </span>
      </p>
    </div>
  )
}

export default PasswordSettings
