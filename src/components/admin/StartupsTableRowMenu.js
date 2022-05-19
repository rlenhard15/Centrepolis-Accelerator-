import React from 'react';

import './StartupsTableRowMenu.scss';
import ThreeDotMenu from '../common/ThreeDotMenu';
import { ReactComponent as EditIcon } from '../../images/icons/edit-icon.svg';
import DeleteIcon from '../../images/icons/delete-icon.svg';

function StartupsTableRowMenu({
  openEditStartupPopup,
  handleDeleteStartUp,
}) {
  return (
    <ThreeDotMenu
      menuItems={[
        {
          text: 'Edit',
          icon: <EditIcon />,
          onClick: openEditStartupPopup,
        },
        {
          text: 'Delete',
          icon: <img src={DeleteIcon} alt="Delete" />,
          onClick: handleDeleteStartUp,
        },
      ]}
    />
  );
}

export default StartupsTableRowMenu;
