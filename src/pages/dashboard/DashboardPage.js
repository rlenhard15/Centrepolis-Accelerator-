import React from 'react';
import { Route } from 'react-router-dom';

import Header from '../../components/header/Header';
import DashboardMenu from './DashboardMenu';
import AdminDashboard from '../../components/admin/AdminDashboard';
import MemberDashboard from '../../components/member/MemberDashboard';
import Assessments from '../../components/assessments/Assessments';
import { useAuthContext } from '../../utils/context';

import './DashboardPage.scss';

function DashboardPage(props) {
  const { isMember } = useAuthContext();

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
