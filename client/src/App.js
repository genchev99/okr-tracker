import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect,
} from 'react-router-dom';
import Authenticate from './components/pages/auth';
import AuthContext from './contexts/AuthContext';
import SnackbarContext from './contexts/SnackbarContext';
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
import {ThemeProvider} from '@material-ui/styles';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

const authService = new AuthService();

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class App extends React.Component {
  state = {
    token: localStorage.getItem('token') || null,
    isAuthenticated: authService.isLoggedIn(),
    snackbar: {
      type: null,
      message: null,
      open: false
    }
  };

  login = async data => {
    await api.auth.login(data)
      .then(({data}) => {
        if (!data.success) {
          throw data;
        }

        authService.setLocalStorage(data);

        this.setState({isAuthenticated: authService.isLoggedIn()});
      })
  };

  logout = async () => {
    authService.logout();
    this.setState({isAuthenticated: authService.isLoggedIn()});
  };

  register = async (payload) => {
    await api.auth.register(payload);

    this.setState({isAuthenticated: authService.isLoggedIn()});

    // return Promise.resolve();
  };

  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({snackbar: {...this.state.snackbar, open: false}});
  };

  error = async (message) => {
    this.setState({snackbar: {type: 'error', open: true, message}});
  };

  success = async (message) => {
    this.setState({snackbar: {type: 'success', open: true, message}});
  };

  warn = async (message) => {
    this.setState({snackbar: {type: 'warn', open: true, message}});
  };

  render() {
    const {isAuthenticated} = this.state;

    return (
      <ThemeProvider theme={theme}>
        {this.state.snackbar.open &&
        <Snackbar open={this.state.snackbar.open} autoHideDuration={6000} onClose={() => this.handleClose()}>
          <Alert onClose={() => this.handleClose()} severity={this.state.snackbar.type || 'warning'}>
            {this.state.snackbar.message}
          </Alert>
        </Snackbar>
        }
        <Router>
          <SnackbarContext.Provider
            value={{error: this.error, success: this.success, warn: this.warn}}
          >
            <AuthContext.Provider
              value={{...this.state, login: this.login, logout: this.logout, register: this.register, authService,}}>
              <Switch>
                <Navigation isAuthenticated={isAuthenticated}>
                  <NotAuthRoute isAuthenticated={isAuthenticated} path='/auth' component={Authenticate}/>
                  <AuthRoute isAuthenticated={isAuthenticated} path='/dashboard' component={Dashboard}/>
                  <AuthRoute isAuthenticated={isAuthenticated} path='/employees' component={Employees}/>
                  <AuthRoute isAuthenticated={isAuthenticated} path='/departments' component={Departments}/>
                  <AuthRoute isAuthenticated={isAuthenticated} path='/objectives' component={Objectives}/>

                  <Route exact path='/'
                         render={() => isAuthenticated ? <Redirect to='/dashboard'/> : <Redirect to='/auth/sign-in'/>}/>
                </Navigation>
              </Switch>
            </AuthContext.Provider>
          </SnackbarContext.Provider>
        </Router>
      </ThemeProvider>
    );
  }
}
