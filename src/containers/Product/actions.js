import { FETCH_PRODUCT, SET_PRODUCT } from './constants';

export function fetchProduct(id) {
  return {
    type: FETCH_PRODUCT,
    payload: {
      id,
    },
  };
}

export function setProduct(product) {
  return {
    type: SET_PRODUCT,
    payload: {
      product,
    },
  };
}
