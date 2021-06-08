import React, { useState } from 'react'

import EmptyDashboard from './EmptyDashboard'
import MembersTable from './MembersTable'
import InviteTeamPopup from './InviteTeamPopup'
import StartupPopup from '../startup/StartupPopup'
import { CustomButton } from '../common/Button'
import { useAuthContext } from '../../CheckAuthorization'
import Loader from '../loader/Loader'

const Dashboard = props => {
  const { isSuperAdmin } = useAuthContext()

  const [showInvitePopup, setShowInvitePopup] = useState(false)
  const [showCreateStartupPopup, setCreateStartupPopup] = useState(false)

  const handleCloseModal = () => {
    setShowInvitePopup(false)
    setCreateStartupPopup(false)
  }

  const openCreateStartupPopup = () => {
    setShowInvitePopup(false)
    setCreateStartupPopup(true)
  }

  const openShowInvitePopup = () => {
    setShowInvitePopup(true)
    setCreateStartupPopup(false)
  }

  const handleIviteAdmin = admin => {
    // TODO
  }

  const handleCreateStartup = startup => {
    // TODO
  }

  if (props.loading) return <Loader />

  const displayName = [props.user.first_name, props.user.last_name].filter(Boolean).join(' ')

  return (
    <>
      {props.customers.length ? (
        <>
          <div className="dashboard-content-header">
            <h3 className="dashboard-title">
              {displayName ? `Welcome, ${displayName}!` : 'Welcome!'}
            </h3>
            <div className="dashboard-content-buttons">
              <CustomButton
                label="Add Startup"
                variant="outlined"
                handleClick={openCreateStartupPopup}
              />
              {isSuperAdmin &&
                <CustomButton
                  label="Add New Admin"
                  handleClick={openShowInvitePopup}
                />
              }
            </div>
          </div>
          <MembersTable
            members={props.customers}
            showAssessments={props.showAssessments}
          />
        </>
      ) : (
        <EmptyDashboard
          openCreateStartupPopup={openCreateStartupPopup}
          openShowInvitePopup={openShowInvitePopup}
        />
      )}
      {showCreateStartupPopup &&
        <StartupPopup
          handleClosePopup={handleCloseModal}
          handleCreateStartup={handleCreateStartup}
        />
      }
      {showInvitePopup &&
        <InviteTeamPopup
          handleClosePopup={handleCloseModal}
          addCustomers={handleIviteAdmin}
        />
      }
    </>
  )
}

export default Dashboard
