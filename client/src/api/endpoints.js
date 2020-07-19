const baseUrl = 'http://localhost:8080/api/v1';

export default {
  LOGIN: `${baseUrl}/auth/sign-in`,
  REGISTER: `${baseUrl}/auth/sign-up`,
  PREREGISTERED: `${baseUrl}/auth/pre-registered`,
  EMPLOYEES: `${baseUrl}/employees`
};