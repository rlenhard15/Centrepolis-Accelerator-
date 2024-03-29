import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import toastr from 'toastr';

import DashboardMenu from '../dashboard/DashboardMenu';
import { InputField } from '../../components/common/InputField';
import { CustomButton } from '../../components/common/Button';
import Loader from '../../components/loader/Loader';
import SuccessIcon from '../../components/common/SuccessIcon';

import useHttp from '../../hooks/useHttp.hook';
import useForm from '../../hooks/useForm.hook';
import validate from '../../validationRules/resetPassword';

import './AuthorizationPage.scss';

function ResetPasswordPage(props) {
  const fields = {
    password: '',
  };

  const history = useHistory();
  const {
    loading,
    request,
  } = useHttp();
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(() => handleResetPassword(), validate, fields);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenError, setTokenError] = useState(false);

  useEffect(() => {
    const { token } = parseParams();

    if (!token) {
      history.push('/sign_in');
    }
  }, []);

  const handleResetPassword = async () => {
    const { token } = parseParams();
    try {
      await request('/users/password', 'PUT', {
        reset_password_token: token,
        password: values.password,
      });

      setIsSuccess(true);
    } catch (err) {
      if (err.body.errors?.[0]?.detail?.reset_password_token?.[0] === 'is invalid') {
        setTokenError(true);
      }
      console.log(err.body.errors?.[0]?.detail, tokenError);
      toastr.error('Something went wrong', 'Error');
    }
  };

  const handleSignInClick = () => {
    history.push('/sign_in');
  };

  const parseParams = () => {
    const params = new URLSearchParams(props.location.search);
    const token = params.get('reset_password_token');

    return {
      token,
    };
  };

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
              <h4 className="auth-page-form-subtitle">You have successfully changed the
                password</h4>
              <CustomButton
                handleClick={handleSignInClick}
                className="auth-page-form-sign-in"
                type="submit"
                label="Sign In"
              />
            </>
          ) : (
            <>
              <h3 className="auth-page-form-title">Reset Password</h3>
              <h4 className="auth-page-form-subtitle">Please enter your new password to login into
                your account</h4>
              <InputField
                label="New password"
                placeholder="New password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                error={tokenError || errors.password}
                errorText={tokenError ? 'Reset password token has expired.' : errors.passwordError}
              />
              <CustomButton
                className="auth-page-form-submit-btn"
                type="submit"
                label="Reset Password"
                disabled={loading}
              />
            </>
          )}
        </form>
        {loading ? <Loader /> : null}
      </div>
    </div>
  );
}

export default ResetPasswordPage;
