import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import SignUpPage from './pages/authenticated/SignUpPage';
import SignInPage from './pages/authenticated/SignInPage';
import ConfirmAccountPage from './pages/authenticated/ConfirmAccountPage';
import DashBoardPage from './pages/dashboard/DashboardPage';
import AssessmentsPage from './pages/assessments/AssessmentsPage';

export const useRoutes = (isAuthenticated, authData) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/" render={props => <DashBoardPage userData={authData} {...props} />} />
        {
          authData.user_type === 'Admin' ?
            <Route path="/assessments/:id/:type/:customer_id" render={props => <AssessmentsPage userData={authData} {...props} />} /> :
            <Route path="/assessments/:id/:type" render={props => <AssessmentsPage userData={authData} {...props} />} />
        }
        <Redirect to="/" />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path="/sign_up" component={SignUpPage} />
      <Route path="/sign_in" component={SignInPage} />
      <Route path="/users/password" component={ConfirmAccountPage} />
    </Switch>
  )
}