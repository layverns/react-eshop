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

const noticeApi = {
  getNotices: () => axios.get('/notices'),
  getNotice: id => axios.get(`/notices/${id}`),
};

const searchApi = {
  getHotWords: () => axios.get('/search/hot_words'),
};

const categoryApi = {
  getCategories: () => axios.get('/categories'),
};

const carouselApi = {
  getCarousels: () => axios.get('/carousels'),
};

const productApi = {
  getProduct: id => axios.get(`/products/${id}`),
  getNewProducts: () => axios.get(`/new_products`),
  getRecommendProducts: () => axios.get(`/recommend_products`),
  getBestSellProducts: () => axios.get(`/best_sell_products`),
  getTimeProducts: () => axios.get('/time_products')
};

const cartApi = {
  addToCart: product => axios.post(`/carts`, { product }),
  getCarts: () => axios.get(`/carts`),
};

api.init();
api.setToken(tokenStorage.load());

export { api, authApi, homeApi, noticeApi, searchApi, categoryApi, carouselApi, productApi, cartApi };
