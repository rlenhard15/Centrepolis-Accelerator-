import MainLogo from '../../images/logos/centrepolis_main_logo.svg';
import LogoBlack from '../../images/logos/centrepolis_black_logo.svg';
import LogoWhite from '../../images/logos/centrepolis_white_logo.svg';
import FuseHubLogo from '../../images/logos/fuse_hub_logo.png';
import LeanRocketLabLogo from '../../images/logos/lean_rocket_lab_logo.png';

const acceleratorId = Number(process.env.REACT_APP_ACCELERATOR_ID);

const getAcceleratorLogo = (type = undefined) => {
  // Centrepolis
  if (acceleratorId === 1) {
    if (type === 'page') {
      return LogoBlack;
    }
    if (type === 'dashboard') {
      return LogoWhite;
    }
    return MainLogo;
  }

  // LeanRocketLab
  if (acceleratorId === 2) return LeanRocketLabLogo;

  // FuzeHub
  if (acceleratorId === 3) return FuseHubLogo;
};

export { getAcceleratorLogo };
