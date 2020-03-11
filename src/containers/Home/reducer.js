import produce from 'immer';

import {
  SET_CAROUSELS,
  SET_NEW_PRODUCTS,
  SET_RECOMMEND_PRODUCTS,
  SET_BEST_SELL_PRODUCTS,
  SET_TIME_PRODUCTS,
  SET_WELFARE_PRODUCTS,
  SET_PRESENT_PRODUCTS,
  SET_CATEGORY_LIST,
} from './constants';

export const initialState = {
  carousels: [],
  newProducts: [],
  recommendProducts: [],
  bestSellProducts: [],
  timeProducts: [],
  welfareProducts: [],
  presentProducts: [],
  categoryList: {},
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_CAROUSELS:
        draft.carousels = action.payload.carousels;
        break;
      case SET_NEW_PRODUCTS:
        draft.newProducts = action.payload.newProducts;
        break;
      case SET_RECOMMEND_PRODUCTS:
        draft.recommendProducts = action.payload.recommendProducts;
        break;
      case SET_BEST_SELL_PRODUCTS:
        draft.bestSellProducts = action.payload.bestSellProducts;
        break;
      case SET_TIME_PRODUCTS:
        draft.timeProducts = action.payload.timeProducts;
        break;
      case SET_WELFARE_PRODUCTS:
        draft.welfareProducts = action.payload.welfareProducts;
        break;
      case SET_PRESENT_PRODUCTS:
        draft.presentProducts = action.payload.presentProducts;
        break;
      case SET_CATEGORY_LIST:
        draft.categoryList = action.payload.categoryList;
        break;
    }
  });

export default reducer;
