import React, { useState, useEffect } from 'react';

import HeaderNotification from './HeaderNotification';

import useHttp from '../../hooks/useHttp.hook';

import HeaderMenu from './HeaderMenu';

import LogoBlack from '../../images/logo-black.svg';

import './Header.scss'

const Header = props => {
  const { request } = useHttp();
  const user = props.userData;
  const [state, setState] = useState({
    notifications: []
  })

  const getNotificationRequest = async () => {
    const notifications = await request('/api/notifications');
    setState({ ...state, notifications: notifications.reverse() });
  }

  const updateNotificationsList = updatedList => setState({ ...state, notifications: updatedList });

  useEffect(() => {
    if (user.user_type === 'Customer') {
      getNotificationRequest();
    }
  }, [])

  return (
    <header className={`header ${props.className}`}>
      <div className="header-block">
        {
          props.className === 'page' ? <img src={LogoBlack} alt="Centrepolis Accelerator" /> : null
        }
        <div className="header-navigation">
          {
            user.user_type === 'Customer' ?
              <HeaderNotification
                notifications={state.notifications}
                updateNotificationsList={updateNotificationsList}
              /> : null
          }
          <HeaderMenu
            {...props}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
