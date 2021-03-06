import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toastr from 'toastr';

import Loader from '../loader/Loader';
import AssessmentsItem from './AssessmentItem';
import TasksTracker from '../tasks-tracker/TasksTracker';
import AssessmentInfoPopup from './AssessmentInfoPopup';
import ArrowRightSmallImg from '../../images/icons/arrow-right-small.svg';
import { Tab, Tabs } from '../common/Tabs';
import { CustomButton } from '../common/Button';
import InviteTeamPopup from '../admin/InviteTeamPopup';
import AssessmentUsers from './AssessmentUsers';

import { useAuthContext } from '../../utils/context';
import useHttp from '../../hooks/useHttp.hook';

import './Assessment.scss';

function Assessments(props) {
  const { request } = useHttp();
  const { id } = useParams();
  const {
    isMember,
  } = useAuthContext();

  const pageBaseUrl = `/assessments/${id}`;

  const [state, setState] = useState({
    customer: props.customer || null,
    startup: null,
    assessments: null,
    loading: true,
    assessmentForInfoPopup: '',
    showInfoPopup: false,
    showInvitePopup: false,
  });

  const setAssessments = (assessmentsData, startup) => {
    const assessments = assessmentsData.map(assessment => {
      const value = assessment.risk_value;
      const risk_name = assessment.name.split(' ')[0];
      let risk_class = '';
      let risk_type = '';
      if (value) {
        if (value <= 33) {
          risk_type = 'High Risk';
          risk_class = 'high';
        } else if (value > 33 && value <= 66) {
          risk_type = 'Medium Risk';
          risk_class = 'medium';
        } else if (value > 66) {
          risk_type = 'Low Risk';
          risk_class = 'low';
        }
      } else {
        risk_type = 'Incomplete';
      }

      return {
        ...assessment,
        risk_type,
        risk_class,
        risk_name,
      };
    });

    setState(oldState => ({
      ...oldState,
      assessments,
      startup,
      loading: false,
    }));
  };

  const getAssessmentsRequest = async () => {
    try {
      const startup = await request(`/api/startups/${id}`);
      const assessments = await request(`/api/assessments?startup_id=${id}`);

      setAssessments(assessments, startup);
    } catch (err) {
      if (err.status === 403 || err.status === 401) {
       // logOut();
      }
    }
  };

  const handleOpenInfoPopup = assessment => {
    setState(oldState => ({
      ...oldState,
      showInfoPopup: true,
      assessmentForInfoPopup: assessment,
    }));
  };

  useEffect(() => {
    getAssessmentsRequest();
  }, []);

  const handleOpenInviteMemberPopup = () => {
    setState(oldState => ({
      ...oldState,
      showInvitePopup: true,
    }));
  };

  const handleCloseInviteMemberPopup = () => {
    setState(oldState => ({
      ...oldState,
      showInvitePopup: false,
    }));
  };

  const handleAddUser = user => {
    const oldMembers = state.startup.members.filter(m => m.id !== user.id);
    setState(oldState => ({
      ...oldState,
      startup: {
        ...oldState.startup,
        members: [user, ...oldMembers],
      },
    }));
    toastr.success('User has been invited', 'Success');
  };

  if (state.loading) return <Loader />;

  const {
    name: companyName,
    members,
    team_leads: teamLeads,
  } = state.startup;
  return (
    <div className={`assessment ${!isMember ? 'admin' : 'customer'}`}>
      <div className="assessment-header">
        <div className="assessment-breadcrumbs">
          <Link to="/" className="active">Dashboard</Link>
          <img src={ArrowRightSmallImg} alt="" />
          <span>{companyName}</span>
        </div>
        {!isMember ? (
          <>
            <h3 className="assessment-title">
              <span>{companyName}</span>
              <CustomButton
                variant="outlined"
                label="Add New Member"
                handleClick={handleOpenInviteMemberPopup}
              />
            </h3>
            <p>The progress report for {companyName} is ready for your review.</p>
          </>
        ) : (
          <>
            <h3 className="assessment-title">{companyName}</h3>
            <p>Are you ready to find out your CRL, TRL, MRL risks?</p>
          </>
        )}
      </div>

      {!isMember ? (
        <Tabs baseUrl={pageBaseUrl}>
          <Tab tab="" label="Assignments">
            <div className="assessment-risks mt-8">
              {state.assessments.map(assessment => (
                <AssessmentsItem
                  key={assessment.id}
                  assessment={assessment}
                  startupId={id}
                  handleOpenInfoPopup={handleOpenInfoPopup}
                />
              ))}
            </div>
          </Tab>
          <Tab tab="tasks" label="Tasks">
            <TasksTracker
              userType={props.userType}
              assessments={state.assessments}
              startupId={id}
            />
          </Tab>
          <Tab tab="users" label="Users">
            <AssessmentUsers startupId={id} members={members} teamLeads={teamLeads} />
          </Tab>
        </Tabs>
      ) : (
        <>
          <div className="assessment-risks">
            {state.assessments.map(assessment => (
              <AssessmentsItem
                key={assessment.id}
                assessment={assessment}
                startupId={id}
                handleOpenInfoPopup={handleOpenInfoPopup}
              />
            ))}
          </div>
          <TasksTracker
            userType={props.userType}
            assessments={state.assessments}
            startupId={id}
          />
        </>
      )}

      {state.showInvitePopup && (
        <InviteTeamPopup
          handleClosePopup={handleCloseInviteMemberPopup}
          startupId={id}
          acceleratorId={state.startup.accelerator_id}
          addCustomers={handleAddUser}
        />
      )}

      {state.showInfoPopup
        ? (
          <AssessmentInfoPopup
            startupId={id}
            currentAssessment={state.assessmentForInfoPopup}
            handleCloseInfoPopup={() => setState(oldState => ({
              ...oldState,
              showInfoPopup: false,
            }))}
          />
        ) : null}
    </div>
  );
}

export default Assessments;
