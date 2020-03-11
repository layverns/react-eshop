import produce from 'immer';

import { SET_CAROUSELS, SET_CATEGORY, SET_THIRD_CATEGORIES, SET_DATA } from './constants';

export const initialState = {
  carousels: [],
  category: {},
  thirdCategories: [],
  data: {},
  /*
    data: {
      [thirdCategoryId]: {
        id,
        subcategory,
        title,
        image,
        products: [{...}]
      }
    }
   */
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
      case SET_DATA:
        draft.data = action.payload.data;
        break;
    }
  });

export default reducer;
