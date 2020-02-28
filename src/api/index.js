import axios from 'axios';
import { tokenStorage } from '@/utils/localStorage';

const API_ROOT = 'http://127.0.0.1:7001/api';

const api = {
  init() {
    axios.defaults.baseURL = API_ROOT;
  },
  setToken(token) {
    axios.defaults.headers.common.Authorization = 'bearer ' + token;
  },
};

const homeApi = {
  fetchAllCategories: () => axios.get('/categories/all'),
  fetchCarousels: () => axios.get('/home/carousels'),
};

const authApi = {
  user: () => axios.get('/user'),
  login: (email, password) => axios.post('/users/login', { email, password }),
};

api.init();
api.setToken(tokenStorage.load());

export { api, authApi, homeApi };
