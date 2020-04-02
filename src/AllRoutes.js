import React from 'react';

import { Switch, Route } from 'react-router-dom';

import SignUpPage from './pages/authenticated/SignUpPage';
import SignInPage from './pages/authenticated/SignInPage';
import DashBoardPage from './pages/dashboard/DashboardPage';

export const useRoutes = (isAuthenticated, authData) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" render={(props) => <DashBoardPage userData={authData} {...props} />} />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path="/sign_up" component={SignUpPage} />
      <Route path="/sign_in" component={SignInPage} />
    </Switch>
  )
}