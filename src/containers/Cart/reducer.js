import produce from 'immer';

import { SET_CARTS, SET_IS_CHECK_ALL, SET_IS_CHECK_ONE } from './constants';

export const initialState = {
  carts: [],
  isCheckAll: false,
  isCheckOne: false,
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_CARTS:
        draft.carts = action.payload.carts;
        break;
      case SET_IS_CHECK_ALL:
        draft.isCheckAll = action.payload.isCheckAll;
        break;
      case SET_IS_CHECK_ONE:
        draft.isCheckOne = action.payload.isCheckOne;
        break;
      default:
        break;
    }
  });

export default reducer;
