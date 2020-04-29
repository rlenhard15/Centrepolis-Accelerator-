import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

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
    // For prevent sending request on page with assessments because this page doesn't use info from customer request
    if (props.history.location.pathname.indexOf('/assessments/') === -1) {
      props.userData.user_type === 'Admin' &&
        getCustomersRequest();
    }
  }, [])

  return (
    <div className="dashboard-page">
      <DashboardMenu />
      <div className="dashboard">
        <Header className="board" {...props} />
        <div className="dashboard-content">
          {
            props.userData.user_type === 'Admin' ? (
              <>
                <Route exact path="/" render={() =>
                  <AdminDashboard
                    user={user}
                    customers={customers}
                    addCustomers={addCustomers}
                    loading={loading}
                  />}
                />
                <Route exact path="/assessments/:id" render={() =>
                  <Assessments
                    {...props}
                    isPage={false}
                    userType={props.userData.user_type}
                  />}
                />
              </>
            ) :
              <CustomerDashboard
                userType={props.userData.user_type}
                customer={props.userData.user} 
              />
          }
        </div>
      </div>
    </div>
  )
}

export default DashboardPage