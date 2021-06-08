import React from 'react';

import { ReactComponent as ShowMoreIcon } from '../../images/icons/more-vertical.svg';

import './MembersTableRowMenu.scss';

const MembersTableRowMenu = () => {
  const [showMenu, setShowMenu] = React.useState();

  const toggleShowMenu = () => setShowMenu(!showMenu);

  return (
    <div className="menu-actions">
      {showMenu &&
        <div className="menu-actions-popup">
          <span className="menu-action">
            Edit
          </span>
          <span className="menu-action">
            Delete
          </span>
        </div>
      }
      <ShowMoreIcon className="menu-actions-icon" onClick={toggleShowMenu} />
    </div>
  );
};

export default MembersTableRowMenu;
