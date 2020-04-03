import React from 'react';
import { Link } from 'react-router-dom';

import { InputField } from '../../components/common/InputField';
import { Button } from '../../components/common/Button';

import useHttp from '../../hooks/useHttp.hook';
import useForm from '../../hooks/useForm.hook';
import validate from '../../validationRules/confirmAccount';

import './AuthorizationPage.scss';

const ConfirmAccountPage = props => {
  const confirmFields = {
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: ''
  };
  const { loading, request } = useHttp();
  const { values, errors, handleChange, handleSubmit } = useForm(confirmAccount, validate, confirmFields);

  function confirmAccount() {
    confirmAccountRequest();
  }

  const confirmAccountRequest = async () => {
    const resetToken = props.location.search.split('=')[1];
    try {
      const userData = await request(`/users/password`, 'PUT', { reset_password_token: resetToken, ...values });
      localStorage.setItem('userData', JSON.stringify(userData));
      props.history.push('/');
    } catch (err) {}
  }

  return (
    <div className="auth-page">
      <div className="auth-page-logo"></div>
      <div className="auth-page-form">
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <h3 className="auth-page-form-title">Confirm Account</h3>
          <h4 className="auth-page-form-subtitle">Welcome! Please fill the forms to proceed</h4>
          <InputField
            label="First Name"
            placeholder="Enter your first Name"
            type="text"
            name="first_name"
            value={values.first_name}
            onChange={handleChange}
            error={errors.first_name}
            errorText={errors.first_name_message}
          />
          <InputField
            label="Last Name"
            placeholder="Enter your last name"
            type="text"
            name="last_name"
            value={values.last_name}
            onChange={handleChange}
            error={errors.last_name}
            errorText={errors.last_name_message}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            errorText={errors.password_message}
          />
          <InputField
            label="Repeat Password"
            placeholder="Repeat your password"
            type="password"
            name="password_confirmation"
            value={values.password_confirmation}
            onChange={handleChange}
            error={errors.password_confirmation}
            errorText={errors.password_confirmation_message}
          />
          <Button
            type="submit"
            label="Sign Up"
            disabled={loading}
          />
        </form>
        <p className="auth-page-alternative">
          <span>
            Don’t remember your password?
            <Link to="/reset_password">Reset Password</Link>
          </span>
        </p>
      </div>
    </div>
  )
}

export default ConfirmAccountPage
