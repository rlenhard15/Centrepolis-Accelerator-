import React, { useState } from 'react';

import { InputField } from '../../components/common/InputField';
import { Button } from '../../components/common/Button';

import useHttp from '../../hooks/useHttp.hook';
import useForm from '../../hooks/useForm.hook';
import validate from '../../validationRules/inviteTeam';

import CloseIcon from '../../images/icons/close-icon.svg';

import './InviteTeamPopup.scss';

const InviteTeamPopup = props => {
  const inviteFields = {
    email: '',
    company_name: ''
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
      <div className="popup-content invite-popup">
        <p className="popup-content-title">Invite team</p>
        <button
          className="popup-close-btn"
          onClick={props.handleClosePopup}>
          <img src={CloseIcon} alt="" />
        </button>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <InputField
            label="Email Address"
            placeholder="Enter your email address"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email || inviteErrors.inviteEmailError}
            errorText={errors.email_message || '* this email has already been taken'}
          />
          <InputField
            label="Company"
            placeholder="Enter company name"
            type="text"
            name="company_name"
            value={values.company_name}
            onChange={handleChange}
            error={errors.company_name || inviteErrors.inviteCompanyError}
            errorText={errors.company_name_message || '* this company name has already exists'}
          />
          <Button
            label="Invite team"
            disabled={loading}
          />
        </form>
      </div>
    </div>
  )
}

export default InviteTeamPopup
