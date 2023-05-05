// import axiosClient from "../util/apiRequest";
import axios from "axios";
const url = 'http://localhost:5000';

class Api {
  logUp(email, password) {
    return axios.post(`${url}/sign-up`, { email, password });
  };
  login(email, password) {
    return axios.post(`${url}/sign-in`, { email, password })
  };
  getCurrentUser() {
    return axios.get(`${url}/get-current-user`);
  }
}

export const apiRequest = new Api();