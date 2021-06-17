import React, { useEffect, useState } from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

import { InputField } from '../common/InputField'
import CustomSelect from '../common/Select'
import { CustomButton } from '../common/Button'

import useHttp from '../../hooks/useHttp.hook'
import useForm from '../../hooks/useForm.hook'
import { useAuthContext } from '../../CheckAuthorization'
import validate from '../../validationRules/createStartup'

import { ReactComponent as CloseIcon } from '../../images/icons/close-icon.svg'

const StartupPopup = props => {

  const [admins, setAdmins] = useState([])
  const [currentAdmin, setCurrentAdmin] = useState([])

  const { handleClosePopup, handleCreateStartup, startupId, startupName } = props

  const formData = {
    startupName: startupName || '',
  }

  const { isSuperAdmin } = useAuthContext()

  const { loading, request } = useHttp()
  const { values, errors, handleChange, handleSubmit } = useForm(() => createStartup(), validate, formData)

  useEffect(() => {
    if (isSuperAdmin) {

      async function fetchAdmins() {
        const response = await request(`api/admins`)
        const result = response.map(admin => ({ value: admin.id, label: `${admin.first_name} ${admin.last_name}` }))
        setAdmins(result)
      }
      fetchAdmins()
    }
  }, [])

  const createStartup = async () => {

    const startup = isSuperAdmin
      ? { name: values.startupName, admins_startups_attributes: [{ admin_id: currentAdmin.value }] }
      : { name: values.startupName }

    if (startupId) {
      const updatedStartup = await request(`api/startups/${startupId}`, 'PUT', { startup })
      handleCreateStartup(updatedStartup)
    } else {
      const newStartup = await request(`api/startups`, 'POST', { startup })
      handleCreateStartup(newStartup)
    }

    handleClosePopup()
  }

  const handleChangeSelect = (e) => {
    setCurrentAdmin(e)
  }

  return (
    <div className="popup">
      <ClickAwayListener onClickAway={handleClosePopup}>
        <div className="popup-content invite-popup">
          <p className="popup-content-title">{startupId ? 'Update' : 'Create'} Startup</p>
          <button
            className="popup-close-btn"
            onClick={handleClosePopup}>
            <CloseIcon />
          </button>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <InputField
              label="Startup Name"
              placeholder="Enter startup name"
              name="startupName"
              value={values.startupName}
              onChange={handleChange}
              error={errors.startupName}
              errorText={errors.startupNameMessage}
            />
            {isSuperAdmin && (
              <CustomSelect
                label="Assigned User"
                isDisable={loading}
                options={admins}
                placeholder='List of admins'
                value={currentAdmin}
                onChange={(e) => handleChangeSelect(e)}
              />
            )}
            <CustomButton
              type='submit'
              label={startupId ? 'Save' : 'Create'}
              disabled={loading}
            />
          </form>
        </div>
      </ClickAwayListener>
    </div>
  )
}

export default StartupPopup
