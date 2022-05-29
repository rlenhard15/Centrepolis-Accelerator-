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
      const response = await request(`/api/accelerators`);
      setAccelerators(response.accelerators);
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
            accelerators={accelerators}
            handleClosePopup={handleCloseModal}
            addCustomers={handleIviteAdmin}
          />
        );
      case STARTUP_MODAL:
        return (
          <StartupPopup
            accelerators={accelerators}
            handleClosePopup={handleCloseModal}
            handleCreateStartup={handleCreateStartup}
            startupId={modal.data?.startupId}
            startupName={modal.data?.startupName}
          />
        );
      case ACCELERATOR_MODAL:
        return (
          <AcceleatorPopup
            accelerators={accelerators}
            handleClosePopup={handleCloseModal}
            handleCreateAccelerator={handleCreateAccelerator}
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
      getAcceleratorsRequest();
    }
  }, [page]);

  if (loading && !startupsData) {
    return <Loader />;
  }
  return (
    <>
      {startupsData?.startups.length ? (
          <>
            <div className="dashboard-content-buttons space-x-5 justify-center mb-5">
              <CustomButton
                label="Add Startup"
                handleClick={openCreateStartupPopup}
              />
              {isSuperAdmin
              && [
                <CustomButton
                  key='accelerator'
                  label="Add Accelerator"
                  className="ml-5"
                  handleClick={openCreateAcceleratorPopup}
                />,
                <CustomButton
                  key='admin'
                  label="Add New Admin"
                  handleClick={openShowInvitePopup}
                />
              ]}
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
            openCreateAcceleratorPopup={openCreateAcceleratorPopup}
          />
        )}
      {renderModal()}
    </>
  );
}

export default Dashboard;
