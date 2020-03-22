import produce from 'immer';

import { SET_HOT_WORDS, SET_CATEGORIES } from './constants';

export const initialState = {
  hotWords: [],
  categories: [],
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
      default:
        break;
    }
  });

export default reducer;
