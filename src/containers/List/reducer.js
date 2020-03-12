import produce from 'immer';

import { SET_CAROUSELS, SET_CATEGORY, SET_THIRD_CATEGORIES, SET_PRODUCTS } from './constants';

export const initialState = {
  carousels: [],
  category: {},
  /**
   * 缓存网站所有的三级分类
   * {
   *  id,
   *  title,
   *  category,
   *  updateTime
   * }
   */
  thirdCategories: [],
  products: [],
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_CAROUSELS:
        draft.carousels = action.payload.carousels;
        break;
      case SET_CATEGORY:
        draft.category = action.payload.category;
        break;
      case SET_THIRD_CATEGORIES:
        draft.thirdCategories = action.payload.thirdCategories;
        break;
      case SET_PRODUCTS:
        draft.products = action.payload.products;
        break;
    }
  });

export default reducer;
