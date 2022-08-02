import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import SignInPage from './pages/authenticated/SignInPage';
import ForgotPasswordPage from './pages/authenticated/ForgotPasswordPage';
import ResetPasswordPage from './pages/authenticated/ResetPasswordPage';
import ConfirmAccountPage from './pages/authenticated/ConfirmAccountPage';
import DashBoardPage from './pages/dashboard/DashboardPage';
import AssessmentsPage from './pages/assessments/AssessmentsPage';
import ProfileSettings from './pages/profileSettings/ProfileSettings';

export const useRoutes = (isAuthenticated, authData) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props =>  <DashBoardPage userData={authData} {...props} />}
        />
        {
          authData.user_type !== 'Member' ? [
            <Route
              exact
              path="/assessments/:id"
              key={3}
              render={props => <DashBoardPage userData={authData} {...props} />}
            />,
            <Route
              exact
              path="/assessments/:id/:type"
              key={3}
              render={props => <DashBoardPage userData={authData} {...props} />}
            />,
            <Route
              exact
              path="/assessments/:startupid/:type/:id"
              key={4}
              render={props => <AssessmentsPage userData={authData} {...props} />}
            />,
          ] : [
            <Route
              key={'assessments'}
              exact
              path="/assessments/:id"
              render={props => <DashBoardPage userData={authData} {...props} />}
            />,
            <Route
              key={'assessment type'}
              exact
              path="/assessments/:id/:type"
              render={props => <AssessmentsPage userData={authData} {...props} />}
            />,
          ]
        }
        <Route path="/settings" render={() => <ProfileSettings />} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/sign_in" component={SignInPage} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/users/password" component={ConfirmAccountPage} />
        <Route path="/users/password-reset" component={ResetPasswordPage} />
        <Redirect to="/sign_in" />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Switch>
      {/* <Route path="/sign_up" component={SignUpPage} /> */}
      <Route path="/sign_in" component={SignInPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/users/password" component={ConfirmAccountPage} />
      <Route path="/users/password-reset" component={ResetPasswordPage} />
      <Redirect to="/sign_in" />
    </Switch>
  );
};
