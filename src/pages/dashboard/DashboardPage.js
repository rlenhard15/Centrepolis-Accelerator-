import React from 'react'
import { Route } from 'react-router-dom'

import Header from '../../components/header/Header'
import DashboardMenu from './DashboardMenu'
import AdminDashboard from '../../components/admin/AdminDashboard'
import MemberDashboard from '../../components/member/MemberDashboard'
import Assessments from '../../components/assessments/Assessments'
import { useAuthContext } from '../../CheckAuthorization'


import './DashboardPage.scss'

const DashboardPage = props => {
  const { isMember } = useAuthContext()

  return (
    <div className="dashboard-page">
      <DashboardMenu />
      <div className="dashboard">
        <Header className="board" {...props} />
        <div className="dashboard-content">
          {
            !isMember ? (
              <>
                <Route exact path="/" render={() => <AdminDashboard />} />
                <Route path="/assessments/:id/" render={() =>
                  <Assessments
                    {...props}
                    isPage={false}
                    userType={props.userData.user_type}
                  />}
                />
              </>
            ) :
              <MemberDashboard
                userType={props.userData.user_type}
                userData={props.userData}
                customer={props.userData.user}
              />
          }
        </div>
      </div>
    </div>
  )
}

export default DashboardPage