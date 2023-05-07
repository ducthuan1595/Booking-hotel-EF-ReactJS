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
  };

  getAllHotel() {
    return axios.get(`${url}/get-all-hotel`);
  };
  searchHotel(time, numberOfPeople, where, numberOfRoom) {
    return axios.post(`${url}/search-hotel`, { time, numberOfPeople, where, numberOfRoom})
  };
  getDetailHotel(hotelId) {
    return axios.get(`${url}/detail-hotel/${hotelId}`)
  };
  bookHotel(startDate, endDate, fullName, email, phoneNumber, identify, price, roomNumber, roomId, payment) {
    return axios.post(`${url}/book-hotel`, { startDate, endDate, fullName, email, phoneNumber, identify, price, roomNumber, roomId, payment })
  }
}

export const apiRequest = new Api();