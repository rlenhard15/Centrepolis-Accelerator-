import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { InputField } from '../../components/common/InputField';
import { Button } from '../../components/common/Button';

import useHttp from '../../hooks/useHttp.hook';
import useForm from '../../hooks/useForm.hook';
import validate from '../../validationRules/signUp';

import './AuthorizationPage.scss';

const SignUpPage = props => {
  const signUpFields = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };
  const { loading, request } = useHttp();
  const { values, errors, handleChange, handleSubmit } = useForm(singUp, validate, signUpFields);
  const [emailHasTaken, setEmailHasTaken] = useState(false);

  function singUp() {
    signUpRequest();
  };

  const signUpRequest = async () => {
    try {
      const userData = await request(`/users/sign_up`, 'POST', { user: { ...values } });
      localStorage.setItem('userData', JSON.stringify(userData));
      props.history.push('/');
    } catch (err) {
      if (+err === 400) setEmailHasTaken(true);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-page-logo"></div>
      <div className="auth-page-form">
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <h3 className="auth-page-form-title">Sign Up</h3>
          <h4 className="auth-page-form-subtitle">Welcome! Please fill the form to get started</h4>
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
            label="Email Address"
            placeholder="Enter your email address"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email || emailHasTaken}
            errorText={errors.email_message || 'Email has already been taken'}
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
            Already have an account?
            <Link to="/sign_in">Sign in</Link>
          </span>
        </p>
      </div>
    </div>
  )
}

export default SignUpPage
