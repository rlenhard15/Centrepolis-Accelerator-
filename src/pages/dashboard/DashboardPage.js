import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'

import Header from '../../components/header/Header'
import DashboardMenu from './DashboardMenu'
import AdminDashboard from '../../components/admin/AdminDashboard'
import MemberDashboard from '../../components/member/MemberDashboard'
import Assessments from '../../components/assessments/Assessments'

import useHttp from '../../hooks/useHttp.hook'

import './DashboardPage.scss'

const DashboardPage = props => {
  const { user } = props.userData
  const { loading, request } = useHttp()
  const [members, setMembers] = useState([])

  const addMembers = newMember => {
    setMembers([...members, newMember])
  }

  const getMembersRequest = async () => {
    try {
      const members = await request(`/api/members`)
      setMembers(members)
    } catch (err) {
      // if (err.status === 403 || err.status === 401) {
      //   localStorage.removeItem('userData');
      //   sessionStorage.removeItem('userData');
      //   props.history.push('/sign_in');
      // }
    }
  }

  useEffect(() => {
    // For prevent sending request on page with assessments because this page doesn't use info from member request
    if (props.history.location.pathname.indexOf('/assessments/') === -1) {
      props.userData.user_type === 'Admin' &&
        getMembersRequest()
    }
  }, [])

  return (
    <div className="dashboard-page">
      <DashboardMenu />
      <div className="dashboard">
        <Header className="board" {...props} />
        <div className="dashboard-content">
          {
            props.userData.user_type !== 'Member' ? (
              <>
                <Route exact path="/" render={() =>
                  <AdminDashboard
                    user={user}
                    customers={members}
                    addMembers={addMembers}
                    loading={loading}
                  />}
                />
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