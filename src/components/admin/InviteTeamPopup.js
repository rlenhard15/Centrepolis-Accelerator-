import React, { useState } from 'react';

import { InputField } from '../common/InputField';
import { CustomButton } from '../common/Button';

import useHttp from '../../hooks/useHttp.hook';
import useForm from '../../hooks/useForm.hook';
import validate from '../../validationRules/inviteTeam';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import CloseIcon from '../../images/icons/close-icon.svg';

import './InviteTeamPopup.scss';

const InviteTeamPopup = props => {
  const inviteFields = {
    email: '',
    company_name: '',
    accelerator_id: Number(process.env.REACT_APP_ACCELERATOR_ID)
  };
  const { loading, request } = useHttp();
  const { values, errors, handleChange, handleSubmit } = useForm(inviteTeam, validate, inviteFields);
  const [inviteErrors, setInviteErrors] = useState({
    inviteEmailError: false,
    inviteCompanyError: false
  })

  function inviteTeam() {
    inviteTeamRequest();
  }

  const inviteTeamRequest = async () => {
    try {
      const newCustomer = await request(`/api/customers`, 'POST', { customer: { ...values } });
      props.addCustomers(newCustomer)
      props.handleClosePopup();
    } catch (err) {
      if (err === 422) return setInviteErrors({inviteCompanyError: false, inviteEmailError:true});
      if (err === 500) return setInviteErrors({inviteEmailError:false, inviteCompanyError:true});
    }
  }

  return (
    <div className="popup">
      <ClickAwayListener onClickAway={props.handleClosePopup}>
        <div className="popup-content invite-popup">
          <p className="popup-content-title">Invite Team Manager</p>
          <button
            className="popup-close-btn"
            onClick={props.handleClosePopup}>
            <img src={CloseIcon} alt="" />
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
            <InputField
              label="Company"
              placeholder="Enter team name"
              type="text"
              name="company_name"
              value={values.company_name}
              onChange={handleChange}
              error={errors.company_name || inviteErrors.inviteCompanyError}
              errorText={errors.company_name_message || '* this company name has already exists'}
            />
            <CustomButton
              type='submit'
              label="Invite Team Manager"
              disabled={loading}
            />
          </form>
        </div>
      </ClickAwayListener>
    </div>
  )
}

export default InviteTeamPopup
