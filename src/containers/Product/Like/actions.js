import { FETCH_PRODUCT, SET_PRODUCT, SET_INDEXS, SET_SPECS } from './constants';

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

export function setIndexs(indexs) {
  return {
    type: SET_INDEXS,
    payload: {
      indexs,
    },
  };
}

export function setSpecs(specs) {
  return {
    type: SET_SPECS,
    payload: {
      specs,
    },
  };
}
