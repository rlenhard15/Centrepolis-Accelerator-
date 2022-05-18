import React from 'react';

import { ReactComponent as ShowMoreIcon } from '../../images/icons/more-vertical.svg';

import './StartupsTableRowMenu.scss';

function StartupsTableRowMenu({
  openEditStartupPopup,
  handleDeleteStartUp,
}) {
  const [showMenu, setShowMenu] = React.useState();

  const toggleShowMenu = () => setShowMenu(!showMenu);

  return (
    <div className="menu-actions">
      {showMenu
      && (
        <div className="menu-actions-popup">
          <span onClick={openEditStartupPopup} className="menu-action">
            Edit
          </span>
          <span onClick={handleDeleteStartUp} className="menu-action">
            Delete
          </span>
        </div>
      )}
      <ShowMoreIcon className="menu-actions-icon" onClick={toggleShowMenu} />
    </div>
  );
}

export default StartupsTableRowMenu;
