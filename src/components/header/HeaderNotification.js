import React, { useState } from 'react';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import IconButton from '@material-ui/core/IconButton';
import { ReactComponent as NotificationIcon } from '../../images/icons/notification-icon.svg';

import useHttp from '../../hooks/useHttp.hook';

const intervals = [
  { label: 'year', seconds: 31536000 },
  { label: 'month', seconds: 2592000 },
  { label: 'day', seconds: 86400 },
  { label: 'hour', seconds: 3600 },
  { label: 'minute', seconds: 60 },
  { label: 'second', seconds: 1 }
];

const HeaderNotification = props => {
  const { request } = useHttp();
  const [isOpen, setIsOpen] = useState(false);

  const formatTime = (createdAt) => {
    const date = new Date(createdAt);
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = intervals.find(i => i.seconds < seconds);
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
  }

  const findUnReadedNotification = () => props.notifications.some(n => !n.read);

  const handleOpenNotificationList = async () => {
    if (!isOpen) {
      setIsOpen(true);
      if (findUnReadedNotification()) {
        await request(`/api/notifications/mark_as_readed_all`, 'PUT');
        const updatedNotifications = props.notifications.map(notification => ({ ...notification, read: true }));
        props.updateNotificationsList(updatedNotifications);
      }
    } else {
      setIsOpen(false);
    }
  }


  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <div className="header-notification">
        <IconButton
          className={`header-notification-icon ${findUnReadedNotification() ? 'have-message' : ''}`}
          onClick={handleOpenNotificationList}
        >
          <NotificationIcon />
        </IconButton>
        {
          isOpen ?
            <ul className="header-notification-list">
              {
                props.notifications.length ?
                  props.notifications.map(notification =>
                    <li
                      key={notification.id}
                      className={`header-notification-list-item ${!notification.read ? 'not-readed' : ''}`}
                    >
                      <span>{notification.admin_name} </span>
                      has created new task for you "{notification.task_title}"
                      <p>{formatTime(notification.created_at)}</p>
                    </li>
                  ) :
                  <span className="notification-message">You don't have notifications</span>
              }
            </ul> : null
        }
      </div>
    </ClickAwayListener>
  )
}

export default HeaderNotification
