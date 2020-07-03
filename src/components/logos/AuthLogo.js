import React from 'react';
import { getAcceleratorLogo } from './helper';

import './AuthLogo.scss';

export const AuthLogo = () => {
  return (
    <div className="auth-logo">
      <img src={getAcceleratorLogo()} alt="Accelerator" />
    </div>
  )
}
