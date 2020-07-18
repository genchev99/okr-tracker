import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Authenticate from './components/pages/auth';
import AuthContext from './contexts/AuthContext';
import api from './api';

export default class App extends React.Component {
  state = {
    email: null,
    company: null,
  };

  login = data => {
    api.auth.login(data)
      // .then(res => {
      //   console.log(res);
      // });
  };

  logout = () => {
    this.setState({
      email: null,
      company: null,
    });
  };

  register = (payload) => {
    api.auth.register(payload)
      .then(res => {
        console.log(res);
      });
  };

  render() {
    return (
      <Router>
        <AuthContext.Provider value={{...this.state, login: this.login, logout: this.logout, register: this.register}}>
          {/* Todo place the nav here */}

          <Switch>
            <Route path="/auth">
              <Authenticate/>
            </Route>
          </Switch>
        </AuthContext.Provider>
      </Router>
    );
  }
}
