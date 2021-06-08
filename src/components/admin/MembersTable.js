import React from 'react';
import { Link } from 'react-router-dom';

import Table from '../common/Table';
import RowMenu from './MembersTableRowMenu';

import './MembersTable.scss';

const headers = [
  {
    title: 'Admin Name',
    width: '18%',
  },
  {
    title: 'Company Name',
    width: '18%',
  },
  {
    title: 'Startup Admin',
    width: '15%',
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
    width: '4%'
  }
];


const MembersTable = ({ members }) => {
  const rows = mapMembersToRow(members)

  return (
    <div className="members-table">
      <Table headers={headers} rows={rows} itemsName="companies" />
    </div>
  );
};

const mapMembersToRow = members => members.map(member => ({
  id: member.id,
  row: [
    `${member.first_name} ${member.last_name}`,
    <Link to={`/assessments/${member.startup.id}`} className="members-link">
      {member.startup.name}
    </Link>,
    'TODO',
    formAssessmentRisk(member, 'CRL'),
    formAssessmentRisk(member, 'TRL'),
    formAssessmentRisk(member, 'MRL'),
    <RowMenu />,
  ]
}));

const formAssessmentRisk = (member, riskName) => {
  const riskValue = member.assessments_risk_list
    ?.find(risk => risk.assessment.split(' ')[0] === riskName)
    ?.risk_value;

  if (!riskValue) return <span className="no-assessment">Incomplete</span>

  if (riskValue <= 33) {
    return <span className="have-assessment high">High risk</span>
  } else if (riskValue > 33 && riskValue <= 66) {
    return <span className="have-assessment medium">Medium risk</span>
  } else {
    return <span className="have-assessment low">Low risk</span>
  }
};

export default MembersTable;
