import axios from 'axios';

const API_ROOT = 'http://127.0.0.1:7001/api';

const api = {
  init() {
    axios.defaults.baseURL = API_ROOT
  },
  setToken(token) {
    axios.defaults.headers.common.Authorization = 'bearer ' + token;
  }
}

const authApi = {
  currentUser: () => axios.get('/user'),
  login: (email, password) => axios.post('/users/login', { email, password })
}

export {
  api,
  authApi
}