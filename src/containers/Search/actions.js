import { SEARCH, SET_PRODUCTS, SET_PRODUCT_COUNT, SET_CATEGORIES, SET_KEYWORD } from './constants';

export function search(params) {
  return {
    type: SEARCH,
    payload: {
      ...params,
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

export function setProductCount(productCount) {
  return {
    type: SET_PRODUCT_COUNT,
    payload: {
      productCount,
    },
  };
}

export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    payload: {
      categories,
    },
  };
}

export function setKeyword(keyword) {
  return {
    type: SET_KEYWORD,
    payload: {
      keyword,
    },
  };
}
