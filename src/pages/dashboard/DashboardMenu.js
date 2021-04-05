import React from 'react';
import { NavLink } from 'react-router-dom';

import { PageLogo } from '../../components/logos/PageLogos';
import questionMark from '../../images/question-mark.svg';
import { useAuthContext } from '../../CheckAuthorization'

import './DashboardMenu.scss';

const DashboardMenu = () => {
  const {isAuthenticated} = useAuthContext()

  return (
    <div className="dashboard-menu">

      <div className="dashboard-menu-logo">
        <PageLogo type="dashboard" />
      </div>

      {isAuthenticated && (
        <ul className="dashboard-menu-list">
          <li>
            <NavLink to="/" activeClassName="active">
              <span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              Dashboard
              </span>
            </NavLink>
          </li>
        </ul>
      )}

      <div className="dashboard-menu-faq">
        <div className="dashboard-menu-question-mark">
          <img src={questionMark} alt="question-mark" />
        </div>
        <div className="dashboard-menu-faq-text">
          RAMP, a tool to access and set milestones planning for commercial technology and mfg readiness levels
        </div>
      </div>
    </div>
  )
}

export default DashboardMenu
