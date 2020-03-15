import produce from 'immer';

import { SET_CARTS, SET_IS_CHECK_ALL } from './constants';

export const initialState = {
  carts: [],
  isCheckAll: false,
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
    }
  });

export default reducer;
