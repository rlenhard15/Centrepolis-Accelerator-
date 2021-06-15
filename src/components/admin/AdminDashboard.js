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

const USER_INVITE_MODAL = 'USER_INVITE_MODAL'
const STARTUP_MODAL = 'STARTUP_MODAL'

const Dashboard = () => {
  const { authData: { user }, isSuperAdmin, logOut, isAdmin } = useAuthContext()
  const { loading, request } = useHttp()

  const [page, setPage] = useState(0)
  const [modal, setModal] = useState(null)
  const [startupsData, setStartups] = useState(null)

  const handleCloseModal = () => {
    setModal(null)
  }

  const openCreateStartupPopup = () => {
    setModal({ type: STARTUP_MODAL })
  }

  const openEditStartupPopup = (id, startupName) => {
    setModal({ type: STARTUP_MODAL, data: { startupId: id, startupName } })
  }

  const openShowInvitePopup = () => {
    setModal({ type: USER_INVITE_MODAL })
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
      startups.current_page > startups.total_pages ? setPage(page - 1) : setStartups(startups)

    } catch (err) {
      if (err.status === 403 || err.status === 401) {
        logOut()
      }
    }
  }

  const handleDeleteStartUp = async (id) => {
    await request(`/api/startups/${id}`, 'DELETE')
    await getMembersRequest()
  }

  const renderModal = () => {
    switch (modal?.type) {
      case USER_INVITE_MODAL:
        return (
          <InviteTeamPopup
            handleClosePopup={handleCloseModal}
            addCustomers={handleIviteAdmin}
          />
        )
      case STARTUP_MODAL:
        return (
          <StartupPopup
            handleClosePopup={handleCloseModal}
            handleCreateStartup={handleCreateStartup}
            startupId={modal.data?.startupId}
            startupName={modal.data?.startupName}
          />
        )
      default:
        return null
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
          <StartupsTable
            startupsData={startupsData}
            openEditStartupPopup={openEditStartupPopup}
            handleDeleteStartUp={handleDeleteStartUp}
          />
          {startupsData.total_pages ?
            <Pagination
              page={page}
              totalPages={startupsData.total_pages}
              handleChangePage={handleChangePage}
              itemsName='Startups'
              outlined={true}
            /> : null
          }
        </>
      ) :
        (
          <EmptyDashboard
            openCreateStartupPopup={openCreateStartupPopup}
            openShowInvitePopup={openShowInvitePopup}
          />
        )
      }
      {renderModal()}
    </>
  )
}

export default Dashboard
