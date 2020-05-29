import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { useRoutes } from './AllRoutes';

const CheckAuthorization = () => {
  const history = useHistory();
  const path = history.location.pathname;
  const authData = JSON.parse(localStorage.getItem('userData'));
  const isAuthenticated = authData ? true : false;
  const allRoutes = useRoutes(isAuthenticated, authData);
  const isConfirmationPage = path === '/users/password';

  useEffect(() => {
    if (!isAuthenticated) isConfirmationPage ? history.push(history.location) : history.push('/sign_in');

    if (history.action === 'POP' && path === '/') history.push('/');
  }, [])

  return (
    <>
      {allRoutes}
    </>
  )
}

export default CheckAuthorization