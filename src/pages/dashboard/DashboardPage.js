import React from 'react';

import Header from '../../components/header/Header';

import './DashboardPage.scss';

const DashboardPage = props => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-menu">

      </div>
      <div className="dashboard">
        <div className="dashboard-content">
          <Header {...props} />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
