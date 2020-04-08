import React from 'react';

import RiscProgressImg from '../../images/risk-progress.png';
import LowRiskImg from '../../images/risk-low.png';
import MediumRiskImg from '../../images/risk-medium.png';
import HightRiskImg from '../../images/risk-hight.png';
import IncompleteRiskImg from '../../images/risk-incomplete.png'

const RiskProgress = props => {
  const { type } = props;
  const checkRisk = () => {
    if (type === 'Low Risk') return <img src={LowRiskImg} alt="" className="risk-circle low" />
    if (type === 'Medium Risk') return <img src={MediumRiskImg} alt="" className="risk-circle medium" />
    if (type === 'Hight Risk') return <img src={HightRiskImg} alt="" className="risk-circle hight" />
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