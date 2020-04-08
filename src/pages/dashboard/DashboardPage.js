import React, { useState, useEffect } from 'react';

import Header from '../../components/header/Header';
import DashboardMenu from './DashboardMenu';
import AdminDashboard from '../../components/admin/AdminDashboard';
import CustomerDashboard from '../../components/customer/CustomerDashboard';
import Assessments from '../../components/assessments/Assessments';

import useHttp from '../../hooks/useHttp.hook';

import './DashboardPage.scss';

const DashboardPage = props => {
  const { user } = props.userData;
  const { loading, request } = useHttp();
  const [customers, setCustomers] = useState([]);
  const [assessments, setAssessments] = useState({
    showAssessments: false,
    customer: null
  });

  const showAssessments = customer => {
    setAssessments({
      showAssessments: true,
      customer
    })
  }

  const hideAssessments = () => {
    setAssessments({
      showAssessments: false,
      customer: null
    })
  }

  const addCustomers = newCustomer => {
    setCustomers([...customers, newCustomer]);
  }

  const getCustomersRequest = async () => {
    try {
      const customers = await request(`/api/customers`);
      setCustomers(customers);
    } catch (err) {
      if (err === 403) {
        localStorage.removeItem('userData');
        props.history.push('/sign_in');
      }
    }
  }

  useEffect(() => {
    props.userData.user_type === 'Admin' &&
      getCustomersRequest();
  }, [])

  return (
    <div className="dashboard-page">
      <DashboardMenu />
      <div className="dashboard">
        <Header className="board" {...props} />
        <div className="dashboard-content">
          {
            props.userData.user_type === 'Admin' ? (
              !assessments.showAssessments ?
                <AdminDashboard
                  user={user}
                  customers={customers}
                  addCustomers={addCustomers}
                  showAssessments={showAssessments}
                  loading={loading}
                /> :
                <Assessments
                  isPage={false}
                  userType={props.userData.user_type}
                  user={assessments.customer}
                  hideAssessments={hideAssessments}
                />
            ) :
              <CustomerDashboard
                userType={props.userData.user_type}
                user={props.userData.user} />
          }

        </div>
      </div>
    </div>
  )
}

export default DashboardPage
