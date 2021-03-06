import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRoutes } from './AllRoutes';
import { AuthContext } from './utils/context'

function CheckAuthorization() {
  const history = useHistory();

  const [authData, setAuthData] = useState(
    JSON.parse(localStorage.getItem('userData') || sessionStorage.getItem('userData')),
  );

  const isAuthenticated = Boolean(authData);
  const userType = authData?.user_type;

  const isSuperAdmin = userType === 'SuperAdmin';
  const isAdmin = userType === 'Admin';
  const isTeamLead = userType === 'TeamLead';
  const isMember = userType === 'Member';

  const allRoutes = useRoutes(isAuthenticated, authData);

  const handleUpdateUser = user => {
    const localAuthData = JSON.parse(localStorage.getItem('userData'));
    const sessionAuthData = JSON.parse(sessionStorage.getItem('userData'));

    if (localAuthData) {
      const newData = {
        ...localAuthData,
        user,
      };
      localStorage.setItem('userData', JSON.stringify(newData));
      setAuthData(newData);
    } else if (sessionAuthData) {
      const newData = {
        ...sessionAuthData,
        user,
      };
      sessionStorage.setItem('userData', JSON.stringify(newData));
      setAuthData(newData);
    }
  };

  const logOut = () => {
    localStorage.removeItem('userData');
    sessionStorage.removeItem('userData');
    setAuthData(null);
    history.push('/sign_in');
  };

  const logIn = (userData, keepMeSignedIn) => {
    if (keepMeSignedIn) {
      localStorage.setItem('userData', JSON.stringify(userData));
    } else {
      sessionStorage.setItem('userData', JSON.stringify(userData));
    }
    setAuthData(userData);
  };

  const providerData = {
    authData,
    isAuthenticated,
    isAdmin,
    isSuperAdmin,
    isTeamLead,
    isMember,
    handleUpdateUser,
    logIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={providerData}>
      {allRoutes}
    </AuthContext.Provider>
  );
}

export default CheckAuthorization;
