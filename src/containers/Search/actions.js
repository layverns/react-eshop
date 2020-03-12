import { SEARCH, SET_PRODUCTS } from './constants';

export function search(keyword) {
  return {
    type: SEARCH,
    payload: {
      keyword,
    },
  };
}

export function setProducts(products) {
  return {
    type: SET_PRODUCTS,
    payload: {
      products,
    },
  };
}
