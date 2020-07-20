import React, {useContext} from 'react';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

const Authenticate = () => {
  const match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/sign-in`}>
          <SignIn />
        </Route>
        <Route path={`${match.path}/sign-up/:preregistered?`} component={SignUp}/>
        <Route path={`${match.path}/forgot-password`}>
          <ForgotPassword />
        </Route>
        <Route path={`${match.path}`}>
          {/* Default case */}
          <SignIn />
        </Route>
      </Switch>
    </div>
  );
};

export default Authenticate;
