import React, { useState, useEffect, memo } from 'react';

import useHttp from '../../hooks/useHttp.hook';

import HeaderNotification from './HeaderNotification';
import HeaderMenu from './HeaderMenu';
import { PageLogo } from '../logos/PageLogos';

import './Header.scss'

const Header = memo(props => {
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
        <div className="header-block-logo">
          {
            props.className === 'page' ? <PageLogo type='page' /> : null
          }
        </div>
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
})

export default Header
