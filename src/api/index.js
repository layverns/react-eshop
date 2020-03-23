import axios from 'axios';
import { tokenStorage } from '@/utils/localStorage';

const API_ROOT_LOCAL = 'http://127.0.0.1:7001/api';
const API_ROOT = 'http://39.100.112.172/api';

const api = {
  init() {
    if (process.env.NODE_ENV === 'development') {
      axios.defaults.baseURL = API_ROOT_LOCAL;
    } else {
      axios.defaults.baseURL = API_ROOT;
    }
  },
  setToken(token) {
    axios.defaults.headers.common.Authorization = 'bearer ' + token;
  },
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
  getCategoryList: id => axios.get(`/category/list`),
  getCategory: id => axios.get(`/categories/${id}`),
};

const carouselApi = {
  getHomeCarousels: () => axios.get('/home/carousels'),
  getCarousels: categoryId => axios.get('/carousels', { params: { categoryId } }),
};

const productApi = {
  getProduct: id => axios.get(`/products/${id}`),
  getProducts: ({ thirdCategoryId }) => axios.get(`/products`, { params: { limit: 100, thirdCategoryId } }),
  getNewProducts: () => axios.get(`/new_products`, { params: { limit: 16 } }),
  getRecommendProducts: () => axios.get(`/recommend_products`, { params: { limit: 7 } }),
  getBestSellProducts: () => axios.get(`/best_sell_products`, { params: { limit: 7 } }),
  getTimeProducts: () => axios.get('/time_products', { params: { limit: 4 } }),
  getWelfareProducts: () => axios.get('/welfare_products', { params: { limit: 4 } }),
  getPresentProducts: () => axios.get('/present_products', { params: { limit: 4 } }),
  getComments: (id, offset, limit) => axios.get(`/products/${id}/comments`, { params: { offset, limit } }),
  search: ({ keyword, limit, offset, sort, order, categoryId }) => axios.get('product/search', { params: { keyword, limit, offset, sort, order, categoryId } }),
};

const cartApi = {
  addToCart: ({ productId, specs, quantity }) => axios.post(`/carts`, { productId, specs, quantity }),
  delFromCart: ({ productId, specs }) => axios.put(`/cart/del`, { productId, specs }),
  changeCartQuantity: ({ productId, specs, quantity }) => axios.put(`/carts`, { productId, specs, quantity }),
  checkCart: ({ productId, specs }) => axios.put(`/cart/check`, { productId, specs }),
  getCarts: () => axios.get(`/carts`),
  checkAll: () => axios.put(`/cart/check_all`),
  unCheckAll: () => axios.put(`/cart/uncheck_all`),
};

const listApi = {
  getList: categoryId => axios.get(`/lists/${categoryId}`),
};

const contactApi = {
  getContacts: () => axios.get(`/contacts`),
  saveContact: contact => axios.post(`/contacts`, { ...contact }),
};

const orderApi = {
  makeOrder: () => axios.post('/orders'),
  getOrders: () => axios.get('/orders'),
  payOrder: orderId => axios.put('/order/pay', { orderId }),
};

api.init();
api.setToken(tokenStorage.load());

export { api, authApi, noticeApi, searchApi, categoryApi, carouselApi, productApi, cartApi, listApi, contactApi, orderApi };
