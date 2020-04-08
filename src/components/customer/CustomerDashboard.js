import React from 'react';

import Assessments from '../assessments/Assessments';

const CustomerDashboard = props => {

  return (
    <>
      <div className="dashboard-content-header">
        <Assessments
          {...props} />
      </div>
    </>
  )
}

export default CustomerDashboard