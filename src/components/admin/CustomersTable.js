import React from 'react';
import { Link } from 'react-router-dom';

import Table from '../common/Table';
import RowMenu from './CustomersTableRowMenu';

import './CustomersTable.scss';

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


const CustomersTable = ({ customers }) => {
  const rows = mapCustomersToRow(customers)

  return (
    <div className="customers-table">
      <Table headers={headers} rows={rows} itemsName="companies" />
    </div>
  );
};

const mapCustomersToRow = customers => customers.map(customer => ({
  id: customer.id,
  row: [
    'TODO',
    <Link to={`/assessments/${customer.id}`} className="customers-link">
      {customer.company_name}
    </Link>,
    'TODO',
    formAssessmentRisk(customer, 'CRL'),
    formAssessmentRisk(customer, 'TRL'),
    formAssessmentRisk(customer, 'MRL'),
    <RowMenu />,
  ]
}));

const formAssessmentRisk = (customer, riskName) => {
  const riskValue = customer.assessments_risk_list
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

export default CustomersTable;
