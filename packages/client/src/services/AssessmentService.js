import { redirect } from 'react-router-dom';
import Axios from '../utils/http.config';

export class AssessmentService {
  static submit(assessment) {
    try {
      // Choose the correct method, url, and data to send
      // in a request to the express packages/api/src/routes/assessment.js
      // NOTE: the http.config file automatically adds /api to the front of your url
      return Axios.post(`/assessment/submit`, { assessment })
        .then(response => response.data);

    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }

  static getList() {
    try {
      // Choose the correct method, url, and data to send
      // in a request to the express packages/api/src/routes/assessment.js
      // NOTE: the http.config file automatically adds /api to the front of your url
      return Axios.get(`/assessment/list`, {
        params: {
        },
      })
        .then(response => response.data.data);
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }

  static deleteAssessment(data) {
    try {
      const id = data;
      const token = localStorage.getItem(`token`); // retrieve the token from local storage
      return Axios.delete(`/assessment/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => response.data)
        .catch(error => {
          console.error(error);
        });
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }
}
