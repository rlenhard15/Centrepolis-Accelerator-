import React from 'react';
import { Link } from 'react-router-dom';

import ClipBoardIcon from '../../images/icons/clipboard.svg';

import './DashboardMenu.scss';

const DashboardMenu = () => {
  return (
    <div className="dashboard-menu">
      <p className="dashboard-menu-title">Lean Rocket Lab</p>
      <ul className="dashboard-menu-list">
        <li>
          <Link to="/">
            <img src={ClipBoardIcon} alt="" />
            Dashboard
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default DashboardMenu
