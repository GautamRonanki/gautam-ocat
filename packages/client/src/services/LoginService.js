import Axios from '../utils/http.config';

export class LoginService {

  static validateUser() {
    try {

      return Axios.get(`/login`, {
        params: {
        },
      })
        .then(response => response.data.data);
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }

}
