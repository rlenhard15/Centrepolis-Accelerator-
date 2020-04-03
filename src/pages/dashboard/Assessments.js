import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../../components/loader/Loader';
import AssessmentsItem from './AssessmentItem';
import ArrowLeftIcon from '../../images/icons/arrow-left.svg';

import useHttp from '../../hooks/useHttp.hook';

import './Assessment.scss';

const initialAssessments = [
  { name: 'MRL', type: 'Incomplete' },
  { name: 'CRL', type: 'Incomplete' },
  { name: 'TRL', type: 'Incomplete' }
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
      let type = '';
      let index = initialAssessments.findIndex(initial => initial.name === ass.name.split(' ')[0]);
      if (value) {
        if (value <= 33) {
          type = 'Low Risk'
        } else if (value > 33 && value <= 66) {
          type = 'Medium Risk'
        } else if (value > 66) {
          type = 'Hight Risk'
        }
      } else {
        type = 'Incomplete'
      }
      initialAssessments[index].type = type;
    })
    setState({
      loading: false,
      assessments: initialAssessments
    })
  }

  const getCustomersRequest = async () => {
    const assessments = await request(`/api/assessments/?customer_id=${props.customer.id}`);
    setAssessments(assessments);
  }

  useEffect(() => {
    getCustomersRequest();
  }, [])

  return (
    <div className="assessment">
      <div className="assessment-header">
        <button
          className="back-btn"
          onClick={props.hideAssessments}
        >
          <img src={ArrowLeftIcon} alt="" />
        </button>
        <h3 className="assessment-title">{props.customer.company_name}</h3>
        <p>The progress report for {props.customer.company_name} is ready for your review - <Link to="">learn more</Link></p>
      </div>
      <div className="assessment-risks">
        {
          !state.loading ?
            state.assessments.map((item, i) => <AssessmentsItem key={i} {...item} />) :
            <Loader />
        }
      </div>
    </div>
  )
}

export default Assessments
