import React, { useEffect, useState } from 'react';
import toastr from 'toastr';

import EmptyDashboard from './EmptyDashboard';
import StartupsTable from './StartupsTable';
import InviteTeamPopup from './InviteTeamPopup';
import StartupPopup from '../startup/StartupPopup';
import { CustomButton } from '../common/Button';
import Pagination from '../common/Pagination';

import { useAuthContext } from '../../utils/context';
import useHttp from '../../hooks/useHttp.hook';

import Loader from '../loader/Loader';
import { fullNameOrEmail } from '../../utils/helpers';
import AcceleatorPopup from '../startup/AcceleatorPopup';

const USER_INVITE_MODAL = 'USER_INVITE_MODAL';
const STARTUP_MODAL = 'STARTUP_MODAL';
const ACCELERATOR_MODAL = 'CREATE_ACCELERATOR_MODAL';

function Dashboard() {
  const {
    authData: { user },
    isSuperAdmin,
    logOut,
    isAdmin,
  } = useAuthContext();
  console.log(user, isSuperAdmin);
  const {
    loading,
    request,
  } = useHttp();

  const [page, setPage] = useState(0);
  const [modal, setModal] = useState(null);
  const [startupsData, setStartups] = useState(null);
  const [accelerators, setAccelerators] = useState(null);

  const handleCloseModal = () => {
    setModal(null);
  };

  const openCreateStartupPopup = () => {
    setModal({ type: STARTUP_MODAL });
  };

  const openCreateAcceleratorPopup = () => {
    setModal({ type: ACCELERATOR_MODAL });
  };

  const openEditStartupPopup = (id, startupName) => {
    setModal({
      type: STARTUP_MODAL,
      data: {
        startupId: id,
        startupName,
      },
    });
  };

  const openShowInvitePopup = () => {
    setModal({ type: USER_INVITE_MODAL });
  };

  const handleIviteAdmin = _admin => {
    getMembersRequest();
    toastr.success('Admin has been invited', 'Success');
  };

  const handleCreateStartup = _startup => {
    getMembersRequest();
    toastr.success('Startup has been created', 'Success');
  };

  const handleCreateAccelerator = _accelerator => {
    getAcceleratorsRequest();
    toastr.success('Accelerator has been created', 'Success');
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const getMembersRequest = async () => {
    try {
      const startups = await request(`/api/startups?page=${page + 1}`);
      if (startups.current_page > startups.total_pages && startups.total_pages !== 0) {
        setPage(page - 1);
      } else {
        setStartups(startups);
      }
    } catch (err) {
      if (err.status === 403 || err.status === 401) {
        logOut();
      }
    }
  };

  const getAcceleratorsRequest = async () => {
    try {
      const accels = await request(`/api/accelerators`);
      setAccelerators(accels);
    } catch (err) {
      if (err.status === 403 || err.status === 401) {
        logOut();
      }
    }
  };

  const handleDeleteStartUp = async id => {
    await request(`/api/startups/${id}`, 'DELETE');
    await getMembersRequest();
  };

  const renderModal = () => {
    switch (modal?.type) {
      case USER_INVITE_MODAL:
        return (
          <InviteTeamPopup
            handleClosePopup={handleCloseModal}
            addCustomers={handleIviteAdmin}
          />
        );
      case STARTUP_MODAL:
        return (
          <StartupPopup
            handleClosePopup={handleCloseModal}
            handleCreateStartup={handleCreateStartup}
            startupId={modal.data?.startupId}
            startupName={modal.data?.startupName}
          />
        );
      case ACCELERATOR_MODAL:
        return (
          <AcceleatorPopup
            handleClosePopup={handleCloseModal}
            handleCreateStartup={handleCreateAccelerator}
            startupId={modal.data?.startupId}
            startupName={modal.data?.startupName}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (isAdmin || isSuperAdmin) {
      getMembersRequest();
    }
  }, [page]);

  if (loading && !startupsData) return <Loader />;

  const displayName = fullNameOrEmail(user);
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
                {isSuperAdmin
                && [
                  <CustomButton
                    label="Add Accelerator"
                    handleClick={openCreateAcceleratorPopup}
                  />,
                  <CustomButton
                    label="Add New Admin"
                    handleClick={openShowInvitePopup}
                  />
                ]}
              </div>
            </div>
            <StartupsTable
              startupsData={startupsData}
              openEditStartupPopup={openEditStartupPopup}
              handleDeleteStartUp={handleDeleteStartUp}
            />
            {startupsData.total_pages > 1
              ? (
                <Pagination
                  page={page}
                  totalPages={startupsData.total_pages}
                  handleChangePage={handleChangePage}
                  itemsName="Startups"
                  outlined
                />
              ) : null}
          </>
        )
        : (
          <EmptyDashboard
            openCreateStartupPopup={openCreateStartupPopup}
            openShowInvitePopup={openShowInvitePopup}
          />
        )}
      {renderModal()}
    </>
  );
}

export default Dashboard;
