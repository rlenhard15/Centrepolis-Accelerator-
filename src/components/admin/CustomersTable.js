import React from 'react';
import { Link } from 'react-router-dom';

import Pagination from '../common/Pagination';

import './CustomersTable.scss';

const CustomersTable = props => {
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => setPage(newPage);

  const currentCustomersPage = props.customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const setAssessmentRisk = (customer, riskName) => {
    if (customer.assessments_risk_list) {
      let risk = customer.assessments_risk_list.find(risk => risk.assessment.split(' ')[0] === riskName);

      if (risk && risk.risk_value) {
        if (risk.risk_value <= 33) {
          return <span className="have-assessment high">High risk</span>
        } else if (risk.risk_value > 33 && risk.risk_value <= 66) {
          return <span className="have-assessment medium">Medium risk</span>
        } else if (risk.risk_value > 66) {
          return <span className="have-assessment low">Low risk</span>
        }
      } else {
        return <span>Incomplete</span>
      }
    } else {
      return <span>Incomplete</span>
    }
  }

  return (
    <div className="customers-table">
      <div className="customers-table-head">
        <ul>
          <li>Company name</li>
          <li>CRL assessment</li>
          <li>TRL assessment</li>
          <li>MRL assessment</li>
        </ul>
      </div>
      <div className="customers-table-body">
        <ul>
          {
            currentCustomersPage.map(customer =>
              <li key={customer.id} className="customers-table-body-row">
                <ul>
                  <li>
                    <Link 
                      to={`/assessments/${customer.id}`}
                      className="customers-link"
                    >
                      {customer.company_name}
                    </Link>
                  </li>
                  <li>{setAssessmentRisk(customer, 'CRL')}</li>
                  <li>{setAssessmentRisk(customer, 'TRL')}</li>
                  <li>{setAssessmentRisk(customer, 'MRL')}</li>
                </ul>
              </li>
            )
          }
        </ul>
        <Pagination
          rows={props.customers}
          currentRows={currentCustomersPage}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          itemsName="Customer"
        />
      </div>
    </div>
  )
}

export default CustomersTable
