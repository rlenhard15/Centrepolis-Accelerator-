import React from 'react';
import { Link } from 'react-router-dom';

import Table from '../common/Table';
import RowMenu from './StartupsTableRowMenu';

import './StartupsTable.scss';

const headers = [
  {
    title: 'Company Name',
    width: '26%',
  },
  {
    title: 'Team Leads',
    width: '17%',
  },
  {
    title: 'CRL Assesment',
    width: '15%',
  },
  {
    title: 'TRL Assesment',
    width: '15%',
  },
  {
    title: 'MRL Assesment',
    width: '15%',
  },
  {
    width: '4%',
  },
];

function StartupsTable({
  startupsData,
  openEditStartupPopup,
  handleDeleteStartUp,
}) {
  const mapStartupsToRow = () => startupsData.startups.map(startup => ({
    id: startup.id,
    row: [
      <Link key="link" to={`/assessments/${startup.id}`} className="startups-link">
        {startup.name}
      </Link>,
      <div key="admin" className="startups-st-admins">
        {getUsersNames(startup.team_leads)}
      </div>,
      formAssessmentRisk(startup.assessments_risk_list, 'CRL'),
      formAssessmentRisk(startup.assessments_risk_list, 'TRL'),
      formAssessmentRisk(startup.assessments_risk_list, 'MRL'),
      <RowMenu
        key="menu"
        openEditStartupPopup={() => openEditStartupPopup(startup.id, startup.name)}
        handleDeleteStartUp={() => handleDeleteStartUp(startup.id)}
      />,
    ],
  }));

  const rows = mapStartupsToRow();

  return (
    <div className="startups-table">
      <Table headers={headers} rows={rows} itemsName="companies" />
    </div>
  );
}

const getUsersNames = users => {
  if (!users.length) return '--';

  return users
    .filter(u => u.first_name)
    .map(u => <React.Fragment key={u.id}><span>{u.first_name} {u.last_name}</span><br /></React.Fragment>);
};

const formAssessmentRisk = (assessmentsRiskList, riskName) => {
  const riskValue = assessmentsRiskList
    ?.find(risk => risk.assessment.split(' ')[0] === riskName)
    ?.risk_value;

  if (!riskValue) return <span className="no-assessment">Incomplete</span>;

  if (riskValue <= 33) {
    return <span className="have-assessment high">High risk</span>;
  }
  if (riskValue > 33 && riskValue <= 66) {
    return <span className="have-assessment medium">Medium risk</span>;
  }
  return <span className="have-assessment low">Low risk</span>;
};

export default StartupsTable;
