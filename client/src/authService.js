import * as moment from "moment";
import axios from "axios";

export default class AuthService {
  constructor() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
  }

  setLocalStorage(responseObj) {
    // Adds the expiration time defined on the JWT to the current moment
    const expiresAt = moment().add(responseObj.expiresIn);

    localStorage.setItem('token', responseObj.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );

    axios.defaults.headers.common['Authorization'] = responseObj.token;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");

    delete axios.defaults.headers.common['Authorization'];
  }

  isLoggedIn() {
    return localStorage.getItem('token') && moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment.unix(expiresAt);
  }
}
