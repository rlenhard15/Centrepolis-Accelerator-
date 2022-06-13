import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/header/Header';
import AssessmentsSettings from './AssessmentsSettings';
import AssessmentsSteps from './AssessmentsSteps';
import Loader from '../../components/loader/Loader';
import { useAuthContext } from '../../utils/context';

import ArrowRightSmallImg from '../../images/icons/arrow-right-small.svg';

import useHttp from '../../hooks/useHttp.hook';

import './AssessmentsPage.scss';
import { nameOrEmail } from '../../utils/helpers';

function AssessmentsPage(props) {
  const settingsBlockRef = useRef(null);
  const {
    id,
    type,
    startupid: startupId,
  } = props.match.params;
  const {
    authData: { user },
    isMember,
    isSuperAdmin,
    isAdmin,
    logOut,
  } = useAuthContext();

  const { request } = useHttp();
  const [state, setState] = useState({
    activeCategory: 1,
    assessments: [],
    categories: [],
    subCategories: [],
    loading: true,
  });

  const subCategoriesUrl = categoryId => (isMember
    ? `${categoryId}`
    : `${categoryId}?startup_id=${startupId}`);

  const changeSubCategory = async activeCategory => {
    if (activeCategory !== state.activeCategory) {
      const subCategories = await request(`/api/assessments/${id}/categories/${subCategoriesUrl(activeCategory)}`);
      setState(oldState => ({
        ...oldState,
        subCategories,
        activeCategory,
      }));
    }
    if (settingsBlockRef.current?.offsetTop > 100) {
      settingsBlockRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fetchAssessmentSettings = async () => {
    try {
      const categories = await request(`/api/assessments/${id}/categories`);
      const getAssessmentsResponse = await request(`/api/assessments/?startup_id=${startupId}`);
      const assessments = getAssessmentsResponse.map(ass => ({
        ...ass,
        risk_name: ass.name.split(' ')[0],
      }));
      const subCategories = await request(`/api/assessments/${id}/categories/${subCategoriesUrl(categories[0].id)}`);
      const startup = (isAdmin || isSuperAdmin) && (state.startup
        ? state.startup
        : await request(`/api/startups/${startupId}`));

      setState({
        ...state,
        assessments,
        categories,
        subCategories,
        activeCategory: categories[0].id,
        startup,
        loading: false,
      });
    } catch (err) {
      if (err.status === 403 || err.status === 401) {
        logOut();
      }
    }
  };

  useEffect(() => {
    fetchAssessmentSettings();
  }, []);

  return (
    <div className={`assessment-page ${isMember ? 'customer' : 'admin'}`}>
      <Header className="page" {...props} />
      <div className="assessment-page-container">
        {
          !state.loading ? (
            <div className="assessment-settings">
              <div className="assessment-settings-steps">
                <div className="assessment-settings-show-info">
                  <div className="assessment-breadcrumbs">
                    <Link to="/" className="active">Dashboard</Link>
                    <img src={ArrowRightSmallImg} alt="" />
                    {(isAdmin || isSuperAdmin) && (
                    <>
                      <Link
                        to={`/assessments/${startupId}`}
                        className="active"
                      >{state.startup?.name}</Link>
                      <img src={ArrowRightSmallImg} alt="" />
                    </>
                    )}
                    <span>{type} Risk</span>
                  </div>
                  <h3 className="assessment-title">{type} Risk</h3>
                  {
                      isMember
                        ? (
                          <p className="assessment-subtitle">Hi {nameOrEmail(user)}, please complete
                            this assessment on behalf of {user.company_name}.</p>
                        )
                        : (
                          <p className="assessment-subtitle">Hi {nameOrEmail(user)}, you can review
                            assessment below.</p>
                        )
                    }
                </div>
                <div className="assessment-settings-container">
                  <AssessmentsSteps
                    activeCategory={state.activeCategory}
                    changeSubCategory={changeSubCategory}
                    categories={state.categories}
                  />
                  <div className="assessment-settings-update">
                    <AssessmentsSettings
                      settingsBlockRef={settingsBlockRef}
                      assessmentId={id}
                      assessmentName={type}
                      startupId={startupId}
                      changeSubCategory={changeSubCategory}
                      activeCategory={state.activeCategory}
                      assessments={state.assessments}
                      categories={state.categories}
                      subCategories={state.subCategories}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
            : <Loader />
        }
      </div>
    </div>
  );
}

export default AssessmentsPage;
