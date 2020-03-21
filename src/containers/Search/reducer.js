import produce from 'immer';

import { SET_PRODUCTS, SET_CATEGORIES, SET_PRODUCT_COUNT, SET_KEYWORD } from './constants';

export const initialState = {
  categories: [],
  products: null,
  productCount: 0,
  keyword: '',
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_PRODUCTS:
        draft.products = action.payload.products;
        break;
      case SET_PRODUCT_COUNT:
        draft.productCount = action.payload.productCount;
        break;
      case SET_CATEGORIES:
        draft.categories = action.payload.categories;
        break;
      case SET_KEYWORD:
        draft.keyword = action.payload.keyword;
        break;
    }
  });

export default reducer;
