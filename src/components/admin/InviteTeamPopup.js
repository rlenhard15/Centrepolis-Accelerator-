import React, { useState } from 'react'

import { InputField } from '../common/InputField'
import CustomSelect from '../common/Select'

import { CustomButton } from '../common/Button'

import useHttp from '../../hooks/useHttp.hook'
import useForm from '../../hooks/useForm.hook'
import validate from '../../validationRules/inviteTeam'
import { useAuthContext } from '../../CheckAuthorization'

import ClickAwayListener from '@material-ui/core/ClickAwayListener'

import { ReactComponent as CloseIcon } from '../../images/icons/close-icon.svg'


import './InviteTeamPopup.scss'

const InviteTeamPopup = props => {
  const { isStartupAdmin, isAdmin, isSuperAdmin } = useAuthContext()

  const inviteFields = {
    email: '',
    userType: isStartupAdmin ? {
      value: 'Member',
    } : isSuperAdmin ? {
      value: 'Admin'
    } : null,
    startupId: props.startupId,
  }

  const { loading, request } = useHttp()
  const { values, errors, handleChange, setValues, handleSubmit } = useForm(inviteTeam, validate, inviteFields)
  const [inviteErrors, setInviteErrors] = useState({
    inviteEmailError: false,
  })

  function inviteTeam() {
    inviteTeamRequest()
  }

  const inviteTeamRequest = async () => {
    try {
      const user = {
        email: values.email,
        type: values.userType.value,
        startup_id: values.startupId
      }

      const newCustomer = await request(`api/users`, 'POST', { user })

      props.addCustomers(newCustomer, values.userType.value)
      props.handleClosePopup()

    } catch (err) {
      if (err.status === 422) return setInviteErrors({ inviteEmailError: true })
    }
  }

  const handleUserTypeChange = option => {
    setValues(v => ({ ...v, 'userType': option }))
  }

  const getUsersOptions = () => {
    if (isSuperAdmin) {
      return [
        { label: 'Admin', value: 'Admin' },
        { label: 'Member', value: 'Member' },
      ]
    }

    if (isAdmin) {
      return [
        { label: 'StartUp Admin', value: 'StartupAdmin' },
        { label: 'Member', value: 'Member' },
      ]
    }

    if (isStartupAdmin) {
      return [
        { label: 'Member', value: 'Member' },
      ]
    }
  }

  const userOptions = getUsersOptions()

  return (
    <div className="popup">
      <ClickAwayListener onClickAway={props.handleClosePopup}>
        <div className="popup-content invite-popup">
          <p className="popup-content-title">Invite Team Manager</p>
          <button
            className="popup-close-btn"
            onClick={props.handleClosePopup}>
            <CloseIcon />
          </button>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <InputField
              label="Email Address"
              placeholder="Enter team manager’s email address"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email || inviteErrors.inviteEmailError}
              errorText={errors.email_message || '* this email has already been taken'}
            />
            {(!isStartupAdmin && props.startupId) &&
              <CustomSelect
                placeholder="Select user type"
                value={values.type}
                options={userOptions}
                onChange={handleUserTypeChange}
                error={errors.userType}
                errorText={errors.userTypeMsg}
              />
            }
            <CustomButton
              type='submit'
              label="Send Invite"
              disabled={loading}
            />
          </form>
        </div>
      </ClickAwayListener>
    </div>
  )
}

export default InviteTeamPopup
