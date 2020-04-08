import React, { useState, useEffect } from 'react';

import Loader from '../loader/Loader';
import AssessmentsItem from './AssessmentItem';
import ArrowRightSmallImg from '../../images/icons/arrow-right-small.svg'

import useHttp from '../../hooks/useHttp.hook';

import './Assessment.scss';

const initialAssessments = [
  { risk_name: 'CRL', risk_type: 'Incomplete' },
  { risk_name: 'MRL', risk_type: 'Incomplete' },
  { risk_name: 'TRL', risk_type: 'Incomplete' }
]

const Assessments = props => {
  const { request } = useHttp();
  const [state, setState] = useState({
    loading: true,
    assessments: null
  })

  const setAssessments = data => {
    data.forEach(ass => {
      let value = ass.risk_value;
      let risk = '';
      let type = '';
      let index = initialAssessments.findIndex(initial => initial.risk_name === ass.name.split(' ')[0]);
      if (value) {
        if (value <= 33) {
          type = 'High Risk';
          risk = 'high';
        } else if (value > 33 && value <= 66) {
          type = 'Medium Risk'
          risk = 'medium';
        } else if (value > 66) {
          type = 'Low Risk';
          risk = 'low';
        }
      } else {
        type = 'Incomplete'
      }
      initialAssessments[index].id = ass.id;
      initialAssessments[index].risk_type = type;
      initialAssessments[index].risk_class = risk;
    })
    setState({
      loading: false,
      assessments: initialAssessments
    })
  }

  const getAssessmentsRequest = async () => {
    const assessments = await request(`/api/assessments/?customer_id=${props.user.id}`);
    console.log(assessments)
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
                <span>{props.user.company_name}</span>
              </div>
              <h3 className="assessment-title">{props.assessmentType} Assessment</h3>
              <p>The progress report for {props.user.company_name} is ready for your review.</p>
            </>
          ) : (
              <>
                <h3 className="assessment-title">{props.user.company_name}</h3>
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
              firstItemId={state.assessments[0].id}
            />)) :
            <Loader />
        }
      </div>
    </div>
  )
}

export default Assessments
