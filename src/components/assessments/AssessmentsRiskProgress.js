import React, { useState } from 'react';

import RiscProgressImg from '../../images/risk-progress.svg';
import IncompleteRiskImg from '../../images/risk-incomplete.png';
import Loader from '../loader/Loader';

const RiskProgress = props => {
  const { riskType } = props;
  const [imgLoading, setImgLoading] = useState(true);

  const positionCounting = () => {
    const initial = {};
    const value = Math.floor(props.value);
    if (!value) {
      initial.transform = `rotate(${180 - value * 1.8}deg) translate(5px, 10px)`;
    } else if (value < 25) {
      initial.transform = `rotate(${180 - value * 1.8}deg) translateX(5px)`;
    } else {
      initial.transform = `rotate(${180 - value * 1.8}deg)`;
    }
    return initial
  }

  const handleImgLoaded = () => setImgLoading(false);

  return (
    <div className="progress-block">
      {
        riskType === 'Incomplete' ? (
          <img src={IncompleteRiskImg} alt="" />
        ) : (
            <div className="risk-block">
              <img src={RiscProgressImg} alt="" onLoad={handleImgLoaded} />
              {
                !imgLoading ?
                  <span className={`risk-circle ${props.riskClass}`} style={positionCounting()}></span> : <Loader />
              }
            </div>
          )
      }
    </div>
  )
}

export default RiskProgress