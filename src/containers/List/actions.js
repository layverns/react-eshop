import { FETCH_CAROUSELS, SET_CAROUSELS, FETCH_DATA, SET_CATEGORY, SET_THIRD_CATEGORIES, SET_DATA } from './constants';

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

export function fetchData(categoryId) {
  return {
    type: FETCH_DATA,
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

export function setData(data) {
  return {
    type: SET_DATA,
    payload: {
      data,
    },
  };
}
