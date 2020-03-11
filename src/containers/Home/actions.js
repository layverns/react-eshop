import {
  FETCH_CAROUSELS,
  SET_CAROUSELS,
  FETCH_NEW_PRODUCTS,
  SET_NEW_PRODUCTS,
  FETCH_RECOMMEND_PRODUCTS,
  SET_RECOMMEND_PRODUCTS,
  FETCH_BEST_SELL_PRODUCTS,
  SET_BEST_SELL_PRODUCTS,
  FETCH_TIME_PRODUCTS,
  SET_TIME_PRODUCTS,
  FETCH_WELFARE_PRODUCTS,
  SET_WELFARE_PRODUCTS,
  FETCH_PRESENT_PRODUCTS,
  SET_PRESENT_PRODUCTS,
  FETCH_CATEGORY_LIST,
  SET_CATEGORY_LIST,
} from './constants';

export function fetchCarousels() {
  return {
    type: FETCH_CAROUSELS,
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

export function fetchNewProducts() {
  return {
    type: FETCH_NEW_PRODUCTS,
  };
}

export function setNewProducts(newProducts) {
  return {
    type: SET_NEW_PRODUCTS,
    payload: {
      newProducts,
    },
  };
}

export function fetchRecommendProducts() {
  return {
    type: FETCH_RECOMMEND_PRODUCTS,
  };
}

export function setRecommendProducts(recommendProducts) {
  return {
    type: SET_RECOMMEND_PRODUCTS,
    payload: {
      recommendProducts,
    },
  };
}

export function fetchBestSellProducts() {
  return {
    type: FETCH_BEST_SELL_PRODUCTS,
  };
}

export function setBestSellProducts(bestSellProducts) {
  return {
    type: SET_BEST_SELL_PRODUCTS,
    payload: {
      bestSellProducts,
    },
  };
}

export function fetchTimeProducts() {
  return {
    type: FETCH_TIME_PRODUCTS,
  };
}

export function setTimeProducts(timeProducts) {
  return {
    type: SET_TIME_PRODUCTS,
    payload: {
      timeProducts,
    },
  };
}

export function fetchWelfareProducts() {
  return {
    type: FETCH_WELFARE_PRODUCTS,
  };
}

export function setWelfareProducts(welfareProducts) {
  return {
    type: SET_WELFARE_PRODUCTS,
    payload: {
      welfareProducts,
    },
  };
}

export function fetchPresentProducts() {
  return {
    type: FETCH_PRESENT_PRODUCTS,
  };
}

export function setPresentProducts(presentProducts) {
  return {
    type: SET_PRESENT_PRODUCTS,
    payload: {
      presentProducts,
    },
  };
}

export function fetchCategoryList() {
  return {
    type: FETCH_CATEGORY_LIST,
  };
}

export function setCategoryList(list) {
  return {
    type: SET_CATEGORY_LIST,
    payload: {
      list,
    },
  };
}
