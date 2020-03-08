import produce from 'immer';

import { SET_HOT_WORDS, SET_CATEGORIES, SET_CART } from './constants';

export const initialState = {
  hotWords: [],
  categories: [],
  cart: [],
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_HOT_WORDS:
        draft.hotWords = action.payload.hotWords;
        break;
      case SET_CATEGORIES:
        draft.categories = action.payload.categories;
        break;
      case SET_CART:
        draft.cart = action.payload.cart;
        break;
    }
  });

export default reducer;
