import React, { useState } from 'react'

import { CustomButton } from '../common/Button'
import { InputField } from '../../components/common/InputField'
import useForm from '../../hooks/useForm.hook'
import useHttp from '../../hooks/useHttp.hook'
import validate from '../../validationRules/personPatch'
import { useAuthContext } from '../../CheckAuthorization'

import './PersonSettings.scss'

const PersonSettings = () => {
  const { authData, handleUpdateUser } = useAuthContext()

  const inviteFields = {
    firstName: authData.user.first_name || '',
    lastName: authData.user.last_name || '',
    email: authData.user.email,
    phoneNumber: authData.user.phone_number || '',
  }

  const { loading, request } = useHttp()
  const { values, errors, handleChange, handleSubmit } = useForm(() => updateUser(), validate, inviteFields)

  // const [inviteErrors, setInviteErrors] = useState({
  //   inviteEmailError: false,
  // })

  const updateUser = async () => {
    try {

      const user = await request(`api/users/update_profile`, 'PUT', {
        user: {
          first_name: values.firstName,
          last_name: values.lastName,
          phone_number: values.phoneNumber
        }
      })
      handleUpdateUser(user)
    } catch (err) {
      // if (err === 422) return setInviteErrors({ inviteEmailError: true })
    }
  }

  return (
    <div className="person-settings">
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
          error={errors.email}
          errorText={errors.emailError}
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
  )
}

export default PersonSettings
