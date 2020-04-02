import React, { useState, useEffect } from 'react';

import Header from '../../components/header/Header';
import DashboardMenu from './DashboardMenu';
import Dashboard from './Dashboard';
import Assessments from './Assessments';

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
    const customers = await request(`/api/customers`);
    setCustomers(customers);
  }

  useEffect(() => {
    getCustomersRequest();
  }, [])

  return (
    <div className="dashboard-page">
      <DashboardMenu />
      <div className="dashboard">
        <div className="dashboard-content">
          <Header {...props} />
          {
            props.userData.user_type === 'Admin' ? (
              !assessments.showAssessments ?
                <Dashboard
                  user={user}
                  customers={customers}
                  addCustomers={addCustomers}
                  showAssessments={showAssessments}
                  loading={loading}
                /> :
                <Assessments
                  customer={assessments.customer}
                  hideAssessments={hideAssessments}
                />
            ) :
              <p className="thanks-text">Confirmation is successful. <br/> Thank you for accepting the invitation!</p>
          }

        </div>
      </div>
    </div>
  )
}

export default DashboardPage
