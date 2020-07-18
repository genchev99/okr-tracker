import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({isAuthenticated, component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => isAuthenticated ? <Component {...props} /> : <Redirect to='/auth/sign-in' />} />
  );
};

export default AuthRoute;