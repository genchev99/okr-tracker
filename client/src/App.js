import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect,
} from 'react-router-dom';
import Authenticate from './components/pages/auth';
import AuthContext from './contexts/AuthContext';
import AuthRoute from './routes/AuthRoute';
import NotAuthRoute from './routes/NotAuthRoute';
import api from './api';
import AuthService from './authService';
import Navigation from './components/navigation';
import Employees from './components/pages/employees';
import Departments from './components/pages/departments';
import Objectives from './components/pages/objectives';
import Dashboard from './components/pages/dashboard';
import theme from './theme';
import { ThemeProvider } from '@material-ui/styles';
const authService = new AuthService();

export default class App extends React.Component {
  state = {
    token: localStorage.getItem('token') || null,
    isAuthenticated: authService.isLoggedIn(),
  };

  login = data => {
    api.auth.login(data)
      .then(({data}) => {
        if (!data.success) {
          throw data;
        }

        authService.setLocalStorage(data);

        this.setState({isAuthenticated: authService.isLoggedIn()});
      }).catch(err => {
      console.error(err);
    });
  };

  logout = () => {
    authService.logout();
    this.setState({isAuthenticated: authService.isLoggedIn()});
  };

  register = async (payload) => {
    api.auth.register(payload)
      .then(res => {
        console.log(res);
      });

    this.setState({isAuthenticated: authService.isLoggedIn()});

    // return Promise.resolve();
  };

  render() {
    const {isAuthenticated} = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Router>
          <AuthContext.Provider
            value={{...this.state, login: this.login, logout: this.logout, register: this.register, authService,}}>
            {/* Todo place the nav here */}

            <Switch>
              <Navigation isAuthenticated={isAuthenticated}>
                <NotAuthRoute isAuthenticated={isAuthenticated} path='/auth' component={Authenticate}/>
                <AuthRoute isAuthenticated={isAuthenticated} path='/dashboard' component={Dashboard}/>
                <AuthRoute isAuthenticated={isAuthenticated} path='/employees' component={Employees}/>
                <AuthRoute isAuthenticated={isAuthenticated} path='/departments' component={Departments}/>
                <AuthRoute isAuthenticated={isAuthenticated} path='/objectives' component={Objectives}/>

                <Route exact path='/' render={() => isAuthenticated ? <Redirect to='/dashboard' /> : <Redirect to='/auth/sign-in'/>} />
              </Navigation>
            </Switch>
          </AuthContext.Provider>
        </Router>
      </ThemeProvider>
    );
  }
}
