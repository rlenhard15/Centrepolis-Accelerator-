import React, { useEffect } from 'react';
import toastr from 'toastr';

import DashboardMenu from '../dashboard/DashboardMenu';
import { InputField } from '../../components/common/InputField';
import { CustomButton } from '../../components/common/Button';
import Loader from '../../components/loader/Loader';

import useHttp from '../../hooks/useHttp.hook';
import useForm from '../../hooks/useForm.hook';
import validate from '../../validationRules/confirmAccount';
import { useAuthContext } from '../../utils/context';

import './AuthorizationPage.scss';
import { useHistory } from 'react-router-dom';

function ConfirmAccountPage(props) {
  const confirmFields = {
    password: '',
    first_name: '',
    last_name: '',
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
  } = useForm(confirmAccount, validate, confirmFields);
  const { logIn } = useAuthContext();

  useEffect(() => {
    const {
      token,
      isForgotPassword,
    } = parseParams();
    if (!token) props.history.push('/sign_in');
    if (isForgotPassword) props.history.push(`/users/password-reset?reset_password_token=${token}`);
  }, []);

  function confirmAccount() {
    confirmAccountRequest();
  }

  const confirmAccountRequest = async () => {
    const { token } = parseParams();

    try {
      const userData = await request('/users/password', 'PUT', { reset_password_token: token, ...values });
      logIn(userData, values.keepSignedIn);
      history.push('/.');
    } catch (err) {
      toastr.error('Something went wrong.', 'Error');
    }
  };

  const parseParams = () => {
    const params = new URLSearchParams(props.location.search);
    const token = params.get('reset_password_token');
    const isForgotPassword = params.get('forgot_password') === '\'true\'';

    return {
      token,
      isForgotPassword,
    };
  };

  return (
    <div className="auth-page">
      <DashboardMenu />
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
          <div className="flex flex-row items-center w-full">
            <InputField
              onChange={handleChange}
              value={values.keepSignedIn}
              name="keepSignedIn"
              type="checkbox"
            />
            <label className="auth-page-form-keep-me-signed-in-label">
              Keep me signed in
            </label>
          </div>
          <CustomButton
            type="submit"
            label="Sign In"
            className="auth-page-form-submit-btn"
            disabled={loading}
          />
        </form>
        {
          loading ? <Loader /> : null
        }
      </div>
    </div>
  );
}

export default ConfirmAccountPage;
