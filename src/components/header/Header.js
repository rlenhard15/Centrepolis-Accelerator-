import React, { memo, useEffect, useState } from 'react';
import useHttp from '../../hooks/useHttp.hook';
import HeaderNotification from './HeaderNotification';
import './Header.scss';
import { nameOrEmail } from '../../utils/helpers';
import { ReactComponent as UserIcon } from '../../images/icons/user-default.svg';
import { ReactComponent as LogoutIcon } from '../../images/icons/log-out.svg';
import { useAuthContext } from '../../utils/context';

const Header = props => {
  const { request } = useHttp();

  const [page, setPage] = useState(1);
  const [state, setState] = useState({ notifications: [] });

  const getNotificationRequest = async () => {
    const {
      notifications,
      total_pages: totalPages,
    } = await request(`/api/notifications?page=${page}`);

    setState({
      notifications: [...state.notifications, ...notifications],
      totalPages,
    });
  };

  const updateNotificationsList = updatedList => setState({
    ...state,
    notifications: updatedList,
  });

  const handleChangePage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    getNotificationRequest();
  }, [page]);
  const { logOut } = useAuthContext();
  return (
    <header className={`header ${props.className}`}>
      <div className="flex flex-row items-center w-full px-8">
        <UserIcon className="header-menu-user-icon" />
        <span>{`Hi, ${nameOrEmail(props.userData.user)}`}</span>
        <div className="flex-1" />
        <HeaderNotification
          notifications={state.notifications}
          updateNotificationsList={updateNotificationsList}
          handleChangePage={handleChangePage}
          hasMore={state.totalPages > page}
        />
        <button onClick={logOut}>
          <LogoutIcon className="header-menu-list-icon" />
        </button>
      </div>
    </header>
  );
};

export default memo(Header);
