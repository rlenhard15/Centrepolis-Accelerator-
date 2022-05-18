import React from 'react';

import { getAcceleratorLogo } from './helper';

export function PageLogo(type) {
  return <img src={getAcceleratorLogo(type.type)} alt="Accelerator" />;
}
