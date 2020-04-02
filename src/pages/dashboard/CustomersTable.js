import React from 'react';

import './CustomersTable.scss';

const CustomersTable = props => {
  return (
    <div className="customers-table">
      <div className="customers-table-head">
        <ul>
          <li>Company name</li>
          <li>CRL assesment</li>
          <li>TRL assesment</li>
          <li>MRL assesment</li>
        </ul>
      </div>
      <div className="customers-table-body">
        <ul>
          {
            props.customers.map(customer =>
              <li key={customer.id} className="customers-table-body-row">
                <ul>
                  <li>
                    <button
                      className="customers-link"
                      onClick={() => props.showAssessments(customer)}
                    >
                      {customer.company_name}
                    </button>
                  </li>
                  <li><span className="have-assessment">Low Risk</span></li>
                  <li><span>Incomplete</span></li>
                  <li><span>Incomplete</span></li>
                </ul>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default CustomersTable
