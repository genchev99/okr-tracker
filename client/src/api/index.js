import axios from 'axios';
import endpoints from './endpoints';

export default {
  auth: {
    'sign-in': (body) =>
      axios.post(endpoints.SIGN_IN, body),
  }
}
