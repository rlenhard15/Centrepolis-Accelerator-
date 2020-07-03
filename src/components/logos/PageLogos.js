import React from 'react';

import { getAcceleratorLogo } from './helper';

export const PageLogo = type => <img src={getAcceleratorLogo(type.type)} alt="Accelerator" />