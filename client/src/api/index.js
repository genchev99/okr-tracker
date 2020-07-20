import axios from 'axios';
import endpoints from './endpoints';

export default {
  auth: {
    login: (payload = {}) => axios.post(endpoints.LOGIN, payload),
    register: (payload = {}) => axios.post(endpoints.REGISTER, payload),
    preregistered: (id) => axios.post(endpoints.PREREGISTERED, {id}),
  },
  employees: {
    get: () => axios.get(endpoints.EMPLOYEES),
    enroll: payload => axios.post(endpoints.EMPLOYEES, payload),
  },
  departments: {
    get: () => axios.get(endpoints.DEPARTMENTS),
    create: (department) => axios.post(endpoints.DEPARTMENTS, {...department}),
  },
}