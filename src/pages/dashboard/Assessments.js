import React from 'react';
import { Link } from 'react-router-dom';

import ArrowLeftIcon from '../../images/icons/arrow-left.svg';

import './Assessment.scss';

const Assessments = props => {
  return (
    <div className="assessment">
      <div className="assessment-header">
        <button
          className="back-btn"
          onClick={props.hideAssessments}
        >
          <img src={ArrowLeftIcon} alt="" />
        </button>
        <h3 className="assessment-title">{props.customer.company_name}</h3>
        <p>The progress report for {props.customer.company_name} is ready for your review - <Link>learn more</Link></p>
      </div>
    </div>
  )
}

export default Assessments
