import React, { useState } from 'react';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import UserIcon from '../../images/icons/user-default.svg';
import LogoutIcon from '../../images/icons/log-out.svg';
import MoreIcon from '../../images/icons/more-vertical.svg';

const HeaderMenu = props => {
  const [isOpen, setIsOpen] = useState(false);

  const logOut = () => {
    localStorage.removeItem('userData');
    props.history.push('/sign_in');
  }

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <div className="header-menu">
        <button
          className="header-menu-open"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src={UserIcon} alt="" />
          <span>{`Hi, ${props.userData.user.first_name}`}</span>
          <img src={MoreIcon} alt="" className="more-btn" />
        </button>
        {
          isOpen &&
          <ul className="header-menu-list">
            <li onClick={logOut}>
              <span>Log Out</span>
              <img src={LogoutIcon} alt="" />
            </li>
          </ul>
        }
      </div>
    </ClickAwayListener>
  )
}

export default HeaderMenu