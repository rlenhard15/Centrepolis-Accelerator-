import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import Loader from '../loader/Loader';
import AssessmentsItem from './AssessmentItem';
import TasksTracker from '../tasks-tracker/TasksTracker';
import AssessmentInfoPopup from './AssessmentInfoPopup';
import ArrowRightSmallImg from '../../images/icons/arrow-right-small.svg'

import useHttp from '../../hooks/useHttp.hook';

import './Assessment.scss';

const Assessments = props => {
  const { request } = useHttp();
  const history = useHistory();
  const currentCustomerId = props.userType === 'Admin' ? +props.match.params.id : props.customer.id;
  const [state, setState] = useState({
    customer: props.customer || null,
    assessments: null,
    loading: true,
    showInfoPopup: false,
    assessmentForInfoPopup: ''
  });

  const setAssessments = (data, customer) => {
    let assessments = data.map(ass => {
      let value = ass.risk_value,
        risk_name = ass.name.split(' ')[0],
        risk_class = '',
        risk_type = '';
      if (value) {
        if (value <= 33) {
          risk_type = 'High Risk';
          risk_class = 'high';
        } else if (value > 33 && value <= 66) {
          risk_type = 'Medium Risk'
          risk_class = 'medium';
        } else if (value > 66) {
          risk_type = 'Low Risk';
          risk_class = 'low';
        }
      } else {
        risk_type = 'Incomplete';
      }
      return { ...ass, risk_type, risk_class, risk_name }
    })

    props.userType === 'Admin' ?
      setState({ assessments, customer, loading: false }) :
      setState({ ...state, assessments, loading: false })
  }


  const getAssessmentsRequest = async (customer) => {
    try {
      const assessments = await request(`/api/assessments/?customer_id=${currentCustomerId}`);
      setAssessments(assessments, customer);
    
    } catch (err) {
      if (err === 403 || err === 401) {
        localStorage.removeItem('userData');
        history.push('/sign_in')
      }
    }
  }

  const getCustomersRequest = async () => {
    try {
      const customers = await request(`/api/customers`);
      const customer = customers.find(c => c.id === currentCustomerId);
      getAssessmentsRequest(customer);
    } catch (err) {
      if (err === 403 || err === 401) {
        localStorage.removeItem('userData');
        history.push('/sign_in');
      }
    }
  }

  const handleOpenInfoPopup = assessment => {
    setState({
      ...state,
      showInfoPopup: true,
      assessmentForInfoPopup: assessment
    })
  }

  useEffect(() => {
    props.userType === 'Admin' ?
      getCustomersRequest() :
      getAssessmentsRequest()
  }, [])

  return (
    <div className={`assessment ${props.userType === "Admin" ? 'admin' : 'customer'}`}>
      {
        !state.loading ?
          <>
            <div className="assessment-header">
              {
                props.userType === "Admin" ? (
                  <>
                    <div className="assessment-breadcrumbs">
                      <Link to="/" className="active">Dashboard</Link>
                      <img src={ArrowRightSmallImg} alt="" />
                      <span>{state.customer.company_name}</span>
                    </div>
                    <h3 className="assessment-title">{state.customer.company_name}</h3>
                    <p>The progress report for {state.customer.company_name} is ready for your review.</p>
                  </>
                ) : (
                    <>
                      <h3 className="assessment-title">{state.customer.company_name}</h3>
                      <p>Are you ready to find out your CRL, TRL, MRL risks?</p>
                    </>
                  )
              }
            </div>
            <div className="assessment-risks">
              {
                state.assessments.map((item, i) =>
                  <AssessmentsItem
                    key={i}
                    {...item}
                    userType={props.userType}
                    customerId={currentCustomerId}
                    handleOpenInfoPopup={handleOpenInfoPopup}
                  />)
              }
            </div>
            <TasksTracker
              userType={props.userType}
              assessments={state.assessments}
              currentCustomerId={currentCustomerId}
            />
          </> : <Loader />
      }
      {
        state.showInfoPopup ?
          <AssessmentInfoPopup
            userType={props.userType}
            customerId={currentCustomerId}
            currentAssessment={state.assessmentForInfoPopup}
            handleCloseInfoPopup={() => setState({ ...state, showInfoPopup: false })}
          /> : null
      }
    </div>
  )
}

export default Assessments
