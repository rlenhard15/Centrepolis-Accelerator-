import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import DashboardMenu from '../dashboard/DashboardMenu'
import { InputField } from '../../components/common/InputField'
import { CustomButton } from '../../components/common/Button'
import Loader from '../../components/loader/Loader'
import SuccessIcon from '../../components/common/SuccessIcon'

import useHttp from '../../hooks/useHttp.hook'
import useForm from '../../hooks/useForm.hook'
import validate from '../../validationRules/forgotPassword'

import './AuthorizationPage.scss'

const ForgotPasswordPage = () => {

  const fields = {
    email: '',
  }

  const history = useHistory()
  const { loading, request } = useHttp()
  const { values, errors, handleChange, handleSubmit } = useForm(() => handleForgotPassword(), validate, fields)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleForgotPassword = async (_e) => {
    try {
      await request(`/users/password`, 'POST', {
        user: {
          email: values.email
        }
      })

      setIsSuccess(true)
    } catch (err) {
      console.log(err)
      // TODO
    }
  }

  const handleSignInClick = () => {
    history.push('/sign_in')
  }

  // TODO - success render
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
              {/* <h4 className="auth-page-form-subtitle">You have successfully changed the password</h4> */}
              <h4 className="auth-page-form-subtitle">
                The email has been sent to {values.email}.
              </h4>
              <h4 className="auth-page-form-subtitle">
                Please follow the instructions in the email in order to reset the password.
              </h4>
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
  )
}

export default ForgotPasswordPage
