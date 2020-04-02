import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { useRoutes } from './AllRoutes';

const CheckAuthorization = () => {
  const history = useHistory();
  const authData = JSON.parse(localStorage.getItem('userData'));
  const isAuthenticated = authData ? true : false;
  const allRoutes = useRoutes(isAuthenticated, authData);

  useEffect(() => {
    !isAuthenticated ? history.push('/sign_in') : history.push('/');
  }, [])

  return (
    <>
      {allRoutes}
    </>
  )
}

export default CheckAuthorization