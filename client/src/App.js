import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Authenticate from './components/pages/auth';
import AuthContext from './contexts/AuthContext';
import AuthRoute from './routes/AuthRoute';
import NotAuthRoute from './routes/NotAuthRoute';
import api from './api';
import AuthService from './authService';

const authService = new AuthService();

export default class App extends React.Component {
  state = {
    token: localStorage.getItem('token') || null,
  };

  login = data => {
    api.auth.login(data)
      .then(({data}) => {
        if (!data.success) {
          throw data;
        }

        authService.setLocalStorage(data);
      }).catch(err => {
        console.error(err);
      });
  };

  logout = () => {
    authService.logout();
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
        <AuthContext.Provider value={{...this.state, login: this.login, logout: this.logout, register: this.register, authService,}}>
          {/* Todo place the nav here */}

          <Switch>
            <NotAuthRoute isAuthenticated={authService.isLoggedIn()} path="/auth" component={Authenticate}/>
          </Switch>
        </AuthContext.Provider>
      </Router>
    );
  }
}
