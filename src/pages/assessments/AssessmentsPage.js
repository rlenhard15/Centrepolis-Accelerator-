import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/header/Header';
import AssessmentsSettings from './AssessmentsSettings';
import AssessmentsSteps from './AssessmentsSteps';
import Loader from '../../components/loader/Loader';

import ArrowRightSmallImg from '../../images/icons/arrow-right-small.svg';

import useHttp from '../../hooks/useHttp.hook';

import './AssessmentsPage.scss';

const AssessmentsPage = props => {
  const settingsBlockRef = useRef(null);
  const { id, type, customer_id } = props.match.params;
  const { user, user_type } = props.userData;
  const { request } = useHttp();
  const [state, setState] = useState({
    activeCategory: 1,
    assessments: [],
    categories: [],
    subCategories: [],
    loading: true
  });

  const subCategoriesUrl = categoryId => user_type === "Admin" ?
    `${categoryId}?customer_id=${customer_id}` :
    `${categoryId}`;

  const changeSubCategory = async activeCategory => {
    const subCategories = await request(`/api/assessments/${id}/categories/${subCategoriesUrl(activeCategory)}`);
    setState({
      ...state,
      subCategories,
      activeCategory
    });
    if (settingsBlockRef.current.offsetTop > 100) {
      settingsBlockRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const fetchAssessmentSettings = async () => {
    const categories = await request(`/api/assessments/${id}/categories`);
    const getAssessmentsResponse = await request(`/api/assessments/?customer_id=${customer_id}`);
    let assessments = getAssessmentsResponse.map(ass => ({ ...ass, risk_name: ass.name.split(' ')[0] }));

    // until all assessments is not in the database
    assessments = [
      ...assessments,
      { risk_name: 'TRL', risk_type: 'Incomplete' },
      { risk_name: 'MRL', risk_type: 'Incomplete' }
    ];

    const subCategories = await request(`/api/assessments/${id}/categories/${subCategoriesUrl(categories[0].id)}`);
    setState({
      ...state,
      assessments,
      categories,
      subCategories,
      activeCategory: categories[0].id,
      loading: false
    });
  }

  useEffect(() => {
    fetchAssessmentSettings();
  }, [])

  return (
    <div className={`assessment-page ${user_type === 'Admin' ? 'admin' : 'customer'}`}>
      <Header className='page' {...props} />
      <div className="assessment-page-container">
        {
          !state.loading ? (
            <div className="assessment-settings">
              <div className="assessment-settings-steps">
                <div className="assessment-settings-show-info">
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
                </div>
                <AssessmentsSteps
                  activeCategory={state.activeCategory}
                  changeSubCategory={changeSubCategory}
                  categories={state.categories}
                />
              </div>
              <div className="assessment-settings-update">
                <AssessmentsSettings
                  settingsBlockRef={settingsBlockRef}
                  assessmentId={id}
                  assessmentName={type}
                  customerId={customer_id}
                  userType={user_type}
                  activeCategory={state.activeCategory}
                  assessments={state.assessments}
                  categories={state.categories}
                  subCategories={state.subCategories}
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
