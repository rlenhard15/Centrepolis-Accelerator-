import React from 'react';
import { Route } from 'react-router-dom';

import Header from '../../components/header/Header';
import DashboardMenu from './DashboardMenu';
import AdminDashboard from '../../components/admin/AdminDashboard';
import Assessments from '../../components/assessments/Assessments';

import './DashboardPage.scss';

function DashboardPage(props) {
  return (
    <div className="dashboard-page">
      <DashboardMenu />
      <div className="dashboard">
        <Header className="board" {...props} />
        <div className="dashboard-content">
          <Route exact path="/" render={() => <AdminDashboard />} />
          <Route
            path="/assessments/:id/"
            render={() => (
              <Assessments
                {...props}
                isPage={false}
                userType={props.userData.user_type}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
