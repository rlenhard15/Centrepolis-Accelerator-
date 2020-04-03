import React, { useState } from 'react';

import UserIcon from '../../images/icons/user-default.svg';
import LogoutIcon from '../../images/icons/log-out.svg';
import MoreIcon from '../../images/icons/more-vertical.svg';

import './Header.scss';

const Header = props => {
  const [open, setOpen] = useState(false);

  const logOut = () => {
    localStorage.removeItem('userData');
    props.history.push('/sign_in');
  }

  return (
    <header className="header">
      <div className="header-menu">
        <button
          className="header-menu-open"
          onClick={() => setOpen(!open)}
        >
          <img src={UserIcon} alt="" />
          <span>{`Hi, ${props.userData.user.first_name}`}</span>
          <img src={MoreIcon} alt="" className="more-btn" />
        </button>
        {
          open &&
          <ul className="header-menu-list">
            <li onClick={logOut}>
              <img src={LogoutIcon} alt="" />
              <span>Log Out</span>
            </li>
          </ul>
        }
      </div>
    </header>
  )
}

export default Header
