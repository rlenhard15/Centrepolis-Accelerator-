import React from 'react';
import { useHistory } from 'react-router-dom';


import DashboardMenu from '../dashboard/DashboardMenu';
import { InputField } from '../../components/common/InputField';
import { CustomButton } from '../../components/common/Button';
import Loader from '../../components/loader/Loader';
import SuccessIcon from '../../components/common/SuccessIcon';

import useHttp from '../../hooks/useHttp.hook';
import useForm from '../../hooks/useForm.hook';
import validate from '../../validationRules/signIn';

import './AuthorizationPage.scss';

const signInFields = {
  email: '',
  accelerator_id: Number(process.env.REACT_APP_ACCELERATOR_ID),
};

const ForgotPasswordPage = () => {
  const history = useHistory()
  const { loading, request } = useHttp();
  const { values, errors, handleChange, handleSubmit } = useForm(handleForgotPassword, validate, signInFields);
  // TODO
  const isSuccess = true

  const handleSignInClick = () => {
    history.push('/sign_in')
  }

  return (
    <div className="auth-page">
      <DashboardMenu />
      <div className="auth-page-form">
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          {isSuccess ? (
            <>
              <div className="auth-page-form-success">
                <SuccessIcon />
              </div>
              <h3 className="auth-page-form-title">Success!</h3>
              <h4 className="auth-page-form-subtitle">You have successfully changed the password</h4>
              <CustomButton
                handleClick={handleSignInClick}
                className="auth-page-form-sign-in"
                type="submit"
                label="Sign In"
              />
            </>
          ) : (
            <>
              <h3 className="auth-page-form-title">Forgot Passwod?</h3>
              <h4 className="auth-page-form-subtitle">Enter the email address you used when you joined and we will send you the instructions</h4>
              <InputField
                label="Email Address"
                placeholder="Enter email address"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
                errorText={errors.email_message}
              />
              <CustomButton
                className="auth-page-form-submit-btn"
                type="submit"
                label="Send Instructions"
                disabled={loading}
              />
            </>
          )}
        </form>
        {loading ? <Loader /> : null}
      </div>
    </div>
  );
};

const handleForgotPassword = async () => {
  try {
    // TODO
  } catch (err) {
    // TODO
  }
};

export default ForgotPasswordPage;
