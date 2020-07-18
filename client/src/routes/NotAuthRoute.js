import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const NotAuthRoute = ({isAuthenticated, component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => !isAuthenticated ? <Component {...props} /> : <Redirect to='/' />} />
  );
};

export default NotAuthRoute;