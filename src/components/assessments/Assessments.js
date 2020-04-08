import React, { useState, useEffect } from 'react';

import Loader from '../loader/Loader';
import AssessmentsItem from './AssessmentItem';
import ArrowRightSmallImg from '../../images/icons/arrow-right-small.svg'

import useHttp from '../../hooks/useHttp.hook';

import './Assessment.scss';

const Assessments = props => {
  const { request } = useHttp();
  const [state, setState] = useState({
    loading: true,
    assessments: null
  });

  const setAssessments = data => {
    const updatedStages = data.map(ass => {
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
        risk_type = 'Incomplete'
      }
      return {...ass, risk_type, risk_class, risk_name}
    })

    setState({
      loading: false,
      assessments: updatedStages
    })
  }

  const getAssessmentsRequest = async () => {
    const assessments = await request(`/api/assessments/?customer_id=${props.customer.id}`);
    setAssessments(assessments);
  }

  useEffect(() => {
    getAssessmentsRequest();
  }, [])

  return (
    <div className={`assessment ${props.userType === "Admin" ? 'admin' : 'customer'}`}>
      <div className="assessment-header">
        {
          props.userType === "Admin" ? (
            <>
              <div className="assessment-breadcrumbs">
                <span onClick={props.hideAssessments} className="active">Dashboard</span>
                <img src={ArrowRightSmallImg} alt="" />
                <span>{props.customer.company_name}</span>
              </div>
              <h3 className="assessment-title">{props.customer.company_name}</h3>
              <p>The progress report for {props.customer.company_name} is ready for your review.</p>
            </>
          ) : (
              <>
                <h3 className="assessment-title">{props.customer.company_name}</h3>
                <p>Are you ready to find out your CRL, TRL, MRL risks?</p>
              </>
            )
        }
      </div>
      <div className="assessment-risks">
        {
          !state.loading ?
            (state.assessments.map((item, i) => <AssessmentsItem
              key={i}
              {...item}
              userType={props.userType}
              customer_id={props.customer.id}
            />)) :
            <Loader />
        }
      </div>
    </div>
  )
}

export default Assessments
