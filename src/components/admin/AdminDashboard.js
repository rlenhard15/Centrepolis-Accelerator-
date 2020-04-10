import React, { useState } from 'react';

import EmptyDashboard from './EmptyDashboard';
import CustomersTable from './CustomersTable';
import InviteTeamPopup from './InviteTeamPopup';
import { CustomButton } from '../common/Button';
import Loader from '../loader/Loader';

const Dashboard = props => {
  const [showInvitePopup, setShowInvitePopup] = useState(false);

  return (
    <>
      {
        !props.loading ?
          <>
            {
              props.customers.length ?
                <div className="dashboard-content-header">
                  <h3 className="dashboard-title">{`Welcome, ${props.user.first_name} ${props.user.last_name}!`}</h3>
                  <CustomButton
                    label="Invite Team Manager"
                    handleClick={() => setShowInvitePopup(true)}
                  />
                </div> : null
            }
            {
              props.customers.length ?
                <CustomersTable
                  customers={props.customers}
                  showAssessments={props.showAssessments}
                /> :
                <EmptyDashboard
                  handleShowPopup={() => setShowInvitePopup(true)}
                />
            }
            {
              showInvitePopup &&
              <InviteTeamPopup
                handleClosePopup={() => setShowInvitePopup(false)}
                addCustomers={props.addCustomers}
              />
            }
          </> : <Loader />
      }
    </>
  )
}

export default Dashboard