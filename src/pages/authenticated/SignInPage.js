import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import DashboardMenu from '../dashboard/DashboardMenu'
import { InputField } from '../../components/common/InputField'
import { CustomButton } from '../../components/common/Button'
import Loader from '../../components/loader/Loader'

import useHttp from '../../hooks/useHttp.hook'
import useForm from '../../hooks/useForm.hook'
import validate from '../../validationRules/signIn'

import './AuthorizationPage.scss'

const SignInPage = props => {
  const signInFields = {
    email: '',
    password: '',
    accelerator_id: Number(process.env.REACT_APP_ACCELERATOR_ID)
  }
  const { loading, request } = useHttp()
  const { values, errors, handleChange, handleSubmit, setValues } = useForm(singIn, validate, signInFields)
  const [authorizationError, setAuthorizationError] = useState(false)

  function singIn() {
    signInRequest()
  };

  const signInRequest = async () => {
    try {
      const userData = await request(`/users/sign_in`, 'POST', { user: { ...values } })

      if (values.keepSignedIn) {
        localStorage.setItem('userData', JSON.stringify(userData))
      } else {
        sessionStorage.setItem('userData', JSON.stringify(userData))
      }

      props.history.push('/')
    } catch (err) {
      if (err.status === 401) setAuthorizationError(true)
    }
  }

  const handleToggle = event => {
    const { name, checked } = event.target
    setValues(values => ({ ...values, [name]: checked }))
  }

  return (
    <div className="auth-page">
      <DashboardMenu />
      <div className="auth-page-form">
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <h3 className="auth-page-form-title">Sign In</h3>
          <h4 className="auth-page-form-subtitle">Welcome back! Please sign in to your account</h4>
          <InputField
            label="Email Address"
            placeholder="Enter your email address"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email || authorizationError}
            errorText={errors.email_message}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password || authorizationError}
            errorText={errors.password_message || 'Invalid email/password'}
          />
          <div className="auth-page-form-keep-me-signed-in">
            <InputField
              onChange={handleToggle}
              checked={values.keepSignedIn}
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
        <p className="auth-page-alternative">
          <span>
            Don’t remember your password?
            <Link to="/forgot-password">Reset Password</Link>
          </span>
        </p>
        {loading ? <Loader /> : null}
      </div>
    </div>
  )
}

export default SignInPage
