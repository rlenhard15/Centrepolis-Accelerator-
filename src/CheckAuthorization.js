import React, { useEffect, useContext, createContext } from 'react';
import { useHistory } from "react-router-dom";
import { useRoutes } from './AllRoutes';

export const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

const CheckAuthorization = () => {
  const history = useHistory();
  const path = history.location.pathname;
  const authData = JSON.parse(localStorage.getItem('userData'));
  const isAuthenticated = authData ? true : false;
  const allRoutes = useRoutes(isAuthenticated, authData);
  const isConfirmationPage = path === '/users/password';

  useEffect(() => {
    if (!isAuthenticated) isConfirmationPage ? history.push(history.location) : history.push('/sign_in');
  }, [])

  return (
    <AuthContext.Provider value={{authData, isAuthenticated}}>
      {allRoutes}
    </AuthContext.Provider>
  )
}

export default CheckAuthorization