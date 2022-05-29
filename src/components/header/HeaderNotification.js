import React, { useCallback, useRef, useState } from 'react';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import IconButton from '@material-ui/core/IconButton';
import { ReactComponent as NotificationIcon } from '../../images/icons/notification-icon.svg';

import useHttp from '../../hooks/useHttp.hook';
import { fullNameOrEmail } from '../../utils/helpers';

const intervals = [
  {
    label: 'second',
    seconds: 1,
  },
  {
    label: 'minute',
    seconds: 60,
  },
  {
    label: 'hour',
    seconds: 3600,
  },
  {
    label: 'day',
    seconds: 86400,
  },
  {
    label: 'month',
    seconds: 2592000,
  },
  {
    label: 'year',
    seconds: 31536000,
  },
];

function HeaderNotification(props) {
  const {
    request,
    loading,
  } = useHttp();
  const [isOpen, setIsOpen] = useState(false);
  const observer = useRef();

  const formatTime = createdAt => {
    const date = new Date(createdAt);
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = intervals.slice()
      .reverse()
      .find(i => i.seconds <= seconds) || intervals[0];
    const count = seconds < 0 ? 1 : Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
  };

  const findUnReadedNotification = () => props.notifications.some(n => !n.read);

  const handleOpenNotificationList = async () => {
    if (!isOpen) {
      setIsOpen(true);
      if (findUnReadedNotification()) {
        const updatedNotifications = props.notifications.map(notification => ({
          ...notification,
          read: true,
        }));
        props.updateNotificationsList(updatedNotifications);
      }
    } else {
      notificationsMarkAsReaded();
      setIsOpen(false);
    }
  };

  const notificationsMarkAsReaded = () => {
    Promise.all(
      props.notifications.map(async ({
        id,
        read,
      }) => !read && request(`/api/notifications/${id}/mark_as_readed`, 'PUT')),
    );
  };

  const ref = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && props.hasMore) {
        props.handleChangePage();
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, props.hasMore]);

  const assignedUsers = task => {
    const user = task?.created_by;
    return user ? fullNameOrEmail(user) : '--';
  };

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
          isOpen
            ? (
              <ul className="header-notification-list">
                {
                  props.notifications.length
                    ? props.notifications.map((notification, i) => (
                      <li
                        key={notification.id}
                        className={`header-notification-list-item ${!notification.read
                          ? 'not-readed'
                          : ''}`}
                        ref={i + 1 === props.notifications.length ? ref : null}
                      >
                        <span>{assignedUsers(notification.task)} </span>
                        has created new task for you &ldquo;{notification.task?.title}&ldquo;
                        <p>{formatTime(notification.created_at)}</p>
                      </li>
                    ))
                    : <span className="notification-message">You don&apos;t have notifications</span>
                }
              </ul>
            ) : null
        }
      </div>
    </ClickAwayListener>
  );
}

export default HeaderNotification;
