import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/header/Header';
import AssessmentCreate from './AssessmentsCreate';
import AssessmentsSteps from './AssessmentsSteps';
import Loader from '../../components/loader/Loader';

import ArrowRightSmallImg from '../../images/icons/arrow-right-small.svg';

import useHttp from '../../hooks/useHttp.hook';

import './AssessmentsPage.scss';

const AssessmentsPage = props => {
  const settingsBlockRef = useRef(null);
  const { id, type } = props.match.params;
  const { user, user_type } = props.userData;
  const { request } = useHttp();
  const [state, setState] = useState({
    step: 1,
    assessment: {},
    loading: true
  })

  const changePage = page => {
    setState({ ...state, step: page });
    if (settingsBlockRef.current.offsetTop > 100) {
      settingsBlockRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const fetchAssessmentSettings = async () => {
    const assessment = await request(`/api/assessments/${id}`);
    setState({ ...state, assessment, loading: false });
  }

  useEffect(() => {
    fetchAssessmentSettings();
  }, [])

  return (
    <div className={`assessment-page ${user_type === 'Admin' ? 'admin' : 'customer'}`}>
      <Header className='page' {...props} />
      <div className="assessment-page-container">
        <div className="assessment-breadcrumbs">
          <Link to="/" className="active">Dashboard</Link>
          <img src={ArrowRightSmallImg} alt="" />
          <span>{type} Risk</span>
        </div>
        <h3 className="assessment-title">{type} Risk</h3>
        {
          user_type === 'Admin' ?
            <p className="assessment-subtitle">Hi {user.first_name}, you can review assessment below.</p> :
            <p className="assessment-subtitle">Hi {user.first_name}, please complete this assessment on behalf of {user.company_name}.</p>
        }

        {
          !state.loading ? (
            <div className="assessment-settings">
              <div className="assessment-settings-show">
                <AssessmentsSteps
                  step={state.step}
                  changePage={changePage}
                  settings={state.assessment.description_with_child_models}
                />
              </div>
              <div className="assessment-settings-create">
                <AssessmentCreate
                  settingsBlockRef={settingsBlockRef}
                  assessmentId={id}
                  userType={user_type}
                  step={state.step}
                  changePage={changePage}
                  settings={state.assessment.description_with_child_models}
                />
              </div>
            </div>
          ) :
            <Loader />
        }
      </div>
    </div>
  )
}

export default AssessmentsPage
