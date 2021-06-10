import React, { useState, useEffect } from 'react'

import EmptyDashboard from './EmptyDashboard'
import StartupsTable from './StartupsTable'
import InviteTeamPopup from './InviteTeamPopup'
import StartupPopup from '../startup/StartupPopup'
import { CustomButton } from '../common/Button'
import Pagination from '../common/Pagination'

import { useAuthContext } from '../../CheckAuthorization'
import useHttp from '../../hooks/useHttp.hook'

import Loader from '../loader/Loader'

const Dashboard = () => {
  const { authData: { user }, isSuperAdmin, logOut, isAdmin } = useAuthContext()
  const { loading, request } = useHttp()

  const [page, setPage] = useState(0)
  const [showInvitePopup, setShowInvitePopup] = useState(false)
  const [showCreateStartupPopup, setCreateStartupPopup] = useState(false)
  const [startupsData, setStartups] = useState(null)

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

  const handleIviteAdmin = _admin => {
    getMembersRequest()
  }

  const handleCreateStartup = _startup => {
    getMembersRequest()
  }

  const handleChangePage = (_event, newPage) => {
    setPage(newPage)
  }

  const getMembersRequest = async () => {
    try {
      const startups = await request(`/api/startups?page=${page + 1}`)
      setStartups(startups)
    } catch (err) {
      if (err.status === 403 || err.status === 401) {
        logOut()
      }
    }
  }

  useEffect(() => {
    if (isAdmin || isSuperAdmin) {
      getMembersRequest()
    }
  }, [page])

  if (loading && !startupsData) return <Loader />

  const displayName = [user.first_name, user.last_name].filter(Boolean).join(' ')

  return (
    <>
      {startupsData?.startups.length ? (
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
          <StartupsTable startupsData={startupsData} />
          {startupsData.total_pages ?
            <Pagination
              page={page}
              totalPages={startupsData.total_pages}
              handleChangePage={handleChangePage}
              itemsName='Startup'
              outlined={true}
            /> : null
          }
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
