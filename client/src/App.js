import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Authenticate from "./components/pages/auth";

export default function App() {
  return (
    <Router>
      <div>
        {/* Todo place the nav here */}

        <Switch>
          <Route path="/auth">
            <Authenticate />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
