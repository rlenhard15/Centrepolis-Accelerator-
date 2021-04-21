import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import SignUpPage from './pages/authenticated/SignUpPage';
import SignInPage from './pages/authenticated/SignInPage';
import ForgotPasswordPage from './pages/authenticated/ForgotPasswordPage';
import ConfirmAccountPage from './pages/authenticated/ConfirmAccountPage';
import DashBoardPage from './pages/dashboard/DashboardPage';
import AssessmentsPage from './pages/assessments/AssessmentsPage';
import ProfileSettings from './pages/profileSettings/ProfileSettings';

export const useRoutes = (isAuthenticated, authData) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/" render={props => <DashBoardPage userData={authData} {...props} />} />
        {
          authData.user_type === 'Admin' && [
            <Route exact path="/assessments/:id" key={3} render={props => <DashBoardPage userData={authData} {...props} />} />,
            <Route exact path="/assessments/:id/:type" key={3} render={props => <DashBoardPage userData={authData} {...props} />} />,
            <Route exact path="/assessments/:id/:type/:customer_id" key={4} render={props => <AssessmentsPage userData={authData} {...props} />} />,
          ]}
        {
          authData.user_type === 'Customer' &&
          <Route path="/assessments/:id/:type" render={props => <AssessmentsPage userData={authData} {...props} />} />
        }
        <Route path="/settings" render={() => <ProfileSettings />} />
      <Route path="/users/password" component={ConfirmAccountPage} />
        <Redirect to="/" />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path="/sign_up" component={SignUpPage} />
      <Route path="/sign_in" component={SignInPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/users/password" component={ConfirmAccountPage} />
    </Switch>
  );
}
