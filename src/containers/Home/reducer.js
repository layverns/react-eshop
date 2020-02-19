import produce from 'immer';

import { SET_CATEGORIES, SET_CAROUSELS } from './constants';

export const initialState = {
  categories: [],
  carousels: []
};

const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch(action.type) {
      case SET_CATEGORIES:
        draft.categories = action.payload.categories;
        break;
      case SET_CAROUSELS:
        draft.carousels = action.payload.carousels;
        break;
      default:
        break;
    }
  });

export default appReducer;