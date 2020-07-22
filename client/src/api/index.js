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
    delete: (userId) => axios.delete(`${endpoints.EMPLOYEES}/${userId}`),
    update: (userId, payload) => axios.put(`${endpoints.EMPLOYEES}/${userId}`, {...payload}),
  },
  departments: {
    get: () => axios.get(endpoints.DEPARTMENTS),
    create: (department) => axios.post(endpoints.DEPARTMENTS, {...department}),
    delete: (departmentId) => axios.delete(`${endpoints.DEPARTMENTS}/${departmentId}`),
    update: (departmentId, payload) => axios.put(`${endpoints.DEPARTMENTS}/${departmentId}`, {...payload}),
  },
  objectives: {
    get: () => axios.get(endpoints.OBJECTIVES),
    create: (objective) => axios.post(endpoints.OBJECTIVES, {...objective}),
  },
}