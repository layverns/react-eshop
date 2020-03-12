import { FETCH_CAROUSELS, SET_CAROUSELS, FETCH_PRODUCTS, SET_CATEGORY, SET_THIRD_CATEGORIES, SET_PRODUCTS } from './constants';

export function fetchCarousels(categoryId) {
  return {
    type: FETCH_CAROUSELS,
    payload: {
      categoryId,
    },
  };
}

export function setCarousels(carousels) {
  return {
    type: SET_CAROUSELS,
    payload: {
      carousels,
    },
  };
}

export function fetchProducts(categoryId) {
  return {
    type: FETCH_PRODUCTS,
    payload: {
      categoryId,
    },
  };
}

export function setCategory(category) {
  return {
    type: SET_CATEGORY,
    payload: {
      category,
    },
  };
}

export function setThirdCategories(thirdCategories) {
  return {
    type: SET_THIRD_CATEGORIES,
    payload: {
      thirdCategories,
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
