import React, { useState } from 'react';

import RiscProgressImg from '../../images/risk-progress.svg';
import IncompleteRiskImg from '../../images/risk-incomplete.png';
import Loader from '../loader/Loader';

function RiskProgress(props) {
  const { riskType } = props;
  const [imgLoading, setImgLoading] = useState(true);

  const positionCounting = () => {
    const initial = {};
    const value = Math.floor(props.value);
    const coeff = value >= 65 && value < 68 ? 1.9 : 1.8;
    if (!value) {
      initial.transform = `rotate(${180 - value * coeff}deg) translate(5px, 10px)`;
    } else if (value < 25) {
      initial.transform = `rotate(${180 - value * coeff}deg) translateX(5px)`;
    } else {
      initial.transform = `rotate(${180 - value * coeff}deg)`;
    }
    return initial;
  };

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
              !imgLoading
                ? <span className={`risk-circle ${props.riskClass}`} style={positionCounting()} />
                : <Loader />
            }
          </div>
        )
      }
    </div>
  );
}

export default RiskProgress;
