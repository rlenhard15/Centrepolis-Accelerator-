import React from 'react';
import { Link } from 'react-router-dom';

import { InputField } from '../../components/common/InputField';
import { Button } from '../../components/common/Button';

import './AuthorizationPage.scss';

const ConfirmAccount = () => {
  return (
    <div className="auth-page">
      <div className="auth-page-logo">
        <h3 className="auth-page-logo-title">Image</h3>
      </div>
      <div className="auth-page-form">
        <form>
          <h3 className="auth-page-form-title">Confirm Account</h3>
          <h4 className="auth-page-form-subtitle">Welcome! Please fill the forms to proceed</h4>
          <InputField
            label="First Name"
            placeholder="Enter your first Name"
            type="text"
          />
          <InputField
            label="Last Name"
            placeholder="Enter your last name"
            type="text"
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
          <InputField
            label="Repeat Password"
            placeholder="Repeat your password"
            type="password"
          />
          <Button
            type="submit"
            label="Sign Up"
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

export default ConfirmAccount
