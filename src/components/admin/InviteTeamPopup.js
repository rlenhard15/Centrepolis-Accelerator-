import React, { useState } from 'react';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { InputField } from '../common/InputField';
import CustomSelect from '../common/Select';

import { CustomButton } from '../common/Button';

import useHttp from '../../hooks/useHttp.hook';
import useForm from '../../hooks/useForm.hook';
import validate from '../../validationRules/inviteTeam';
import { useAuthContext } from '../../utils/context';

import { ReactComponent as CloseIcon } from '../../images/icons/close-icon.svg';

import './InviteTeamPopup.scss';

function InviteTeamPopup(props) {
  const {
    isTeamLead,
    isAdmin,
    isSuperAdmin,
  } = useAuthContext();
  const [accelerator, setAccelerator] = useState(null);

  const inviteFields = {
    firstName: '',
    lastName: '',
    email: '',
    userType: isTeamLead ? {
      value: 'Member',
    } : isSuperAdmin ? {
      value: 'Admin',
    } : null,
    startupId: props.startupId,
  };

  const acceleratorOptions = (props.accelerators || []).map(accel => ({
    value: accel.id,
    label: accel.name,
  }));

  const inviteTeamRequest = async () => {
    if (isSuperAdmin && !accelerator) {
      setErrors({ accelerator: 'This Field is Required' });
    }
    try {
      const user = {
        email: values.email,
        type: values.userType.value,
        startup_id: values.startupId,
        first_name: values.firstName,
        last_name: values.lastName,
        accelerator_id: accelerator.value,
      };

      const newCustomer = await request('api/users', 'POST', { user });

      props.addCustomers(newCustomer, values.userType.value);
      props.handleClosePopup();
    } catch (err) {
      if (err.status === 422) return setInviteErrors({ inviteEmailError: true });
    }
  };

  const {
    loading,
    request,
  } = useHttp();
  
  const {
    values,
    errors,
    handleChange,
    setValues,
    handleSubmit,
    setErrors
  } = useForm(inviteTeamRequest, validate, inviteFields);

  const [inviteErrors, setInviteErrors] = useState({
    inviteEmailError: false,
  });

  const handleUserTypeChange = option => {
    setValues(v => ({
      ...v,
      userType: option,
    }));
  };

  const getModalTitle = () => {
    if (isSuperAdmin && !props.startupId) return 'Invite Admin';
    return isTeamLead
      ? 'Invite Member'
      : 'Invite User';
  };

  const getUsersOptions = () => {
    if (isSuperAdmin) {
      return [
        {
          label: 'Admin',
          value: 'Admin',
        },
        {
          label: 'Member',
          value: 'Member',
        },
      ];
    }

    if (isAdmin) {
      return [
        {
          label: 'Team Lead',
          value: 'TeamLead',
        },
        {
          label: 'Member',
          value: 'Member',
        },
        {
          label: 'Admin',
          value: 'Admin',
        },
      ];
    }

    if (isTeamLead) {
      return [
        {
          label: 'Member',
          value: 'Member',
        },
      ];
    }
  };

  const userOptions = getUsersOptions();

  return (
    <div className="popup">
      <ClickAwayListener onClickAway={props.handleClosePopup}>
        <div className="popup-content invite-popup">
          <p className="popup-content-title">{getModalTitle()}</p>
          <button
            className="popup-close-btn"
            onClick={props.handleClosePopup}
          >
            <CloseIcon />
          </button>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <InputField
              label="First Name"
              placeholder="Enter user’s first name (optional)"
              type="text"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              error={errors.firstName}
              errorText={errors.firstName}
            />
            <InputField
              label="Last Name"
              placeholder="Enter user’s last name (optional)"
              type="text"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              error={errors.lastName}
              errorText={errors.lastName}
            />
            <InputField
              label="Email Address"
              placeholder="Enter user’s email address"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email || inviteErrors.inviteEmailError}
              errorText={errors.email_message || '* this email has already been taken'}
            />
            {isSuperAdmin && (
              <CustomSelect
                label="Accelerator"
                name="accelerator"
                isDisabled={acceleratorOptions.length === 0}
                options={acceleratorOptions}
                placeholder="List of accelerators"
                value={accelerator}
                onChange={setAccelerator}
                error={errors.accelerator}
                maxMenuHeight={180}
              />
            )}
            {(!isTeamLead && props.startupId) && (
              <CustomSelect
                label="User type"
                placeholder="Select user type"
                value={values.type}
                options={userOptions}
                onChange={handleUserTypeChange}
                error={errors.userType}
                errorText={errors.userTypeMsg}
              />
            )}
            <CustomButton
              type="submit"
              label="Send Invite"
              disabled={loading}
            />
          </form>
        </div>
      </ClickAwayListener>
    </div>
  );
}

export default InviteTeamPopup;
