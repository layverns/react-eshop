import { FETCH_CATEGORIES, SET_CATEGORIES, FETCH_CAROUSELS, SET_CAROUSELS } from './constants';

export function fetchCategories() {
  return {
    type: FETCH_CATEGORIES
  };
}

export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    payload: {
      categories
    }
  };
}

export function fetchCarousels() {
  return {
    type: FETCH_CAROUSELS
  };
}

export function setCarousels(carousels) {
  return {
    type: SET_CAROUSELS,
    payload: {
      carousels
    }
  };
}
