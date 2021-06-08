import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

import { InputField } from '../common/InputField'

import { CustomButton } from '../common/Button'

import useHttp from '../../hooks/useHttp.hook'
import useForm from '../../hooks/useForm.hook'
import validate from '../../validationRules/createStartup'

import { ReactComponent as CloseIcon } from '../../images/icons/close-icon.svg'


const StartupPopup = props => {
  const { handleClosePopup, handleCreateStartup } = props

  const formData = {
    startupName: '',
  }

  const { loading, request } = useHttp()
  const { values, errors, handleChange, handleSubmit } = useForm(() => createStartup(), validate, formData)

  const createStartup = async () => {
    const startup = {
      name: values.startupName
    }

    const newStartup = await request(`api/startups`, 'POST', { startup })

    handleCreateStartup(newStartup)
    handleClosePopup()
  }

  return (
    <div className="popup">
      <ClickAwayListener onClickAway={handleClosePopup}>
        <div className="popup-content invite-popup">
          <p className="popup-content-title">Create Startup</p>
          <button
            className="popup-close-btn"
            onClick={handleClosePopup}>
            <CloseIcon />
          </button>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <InputField
              label="Startup Name"
              placeholder="Enter team manager’s email address"
              name="startupName"
              value={values.startupName}
              onChange={handleChange}
              error={errors.startupName}
              errorText={errors.startupNameMessage}
            />
            <CustomButton
              type='submit'
              label="Create"
              disabled={loading}
            />
          </form>
        </div>
      </ClickAwayListener>
    </div>
  )
}

export default StartupPopup
