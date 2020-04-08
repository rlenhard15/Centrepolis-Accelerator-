import React from 'react';

import RiscProgressImg from '../../images/risk-progress.svg';
import IncompleteRiskImg from '../../images/risk-incomplete.png'

const RiskProgress = props => {
  const { type } = props;
  const checkRisk = () => {
    if (type === 'Low Risk') return <span className="risk-circle low"></span>
    if (type === 'Medium Risk') return <span className="risk-circle medium"></span>
    if (type === 'High Risk') return <span className="risk-circle high"></span>
  }

  return (
    <div className="progress-block">
      {
        type === 'Incomplete' ? (
          <img src={IncompleteRiskImg} alt="" />
        ) : (
            <>
              <img src={RiscProgressImg} alt="" />
              {
                checkRisk()
              }
            </>
          )
      }
    </div>
  )
}

export default RiskProgress