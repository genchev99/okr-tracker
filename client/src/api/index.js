import axios from 'axios';
import endpoints from './endpoints';

export default {
  auth: {
    login: (payload = {}) => axios.post(endpoints.LOGIN, payload),
    register: (payload = {}) => axios.post(endpoints.REGISTER, payload),
  }
}