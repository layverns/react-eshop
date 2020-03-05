import produce from 'immer';

import { SET_PRODUCT } from './constants';

export const initialState = {
  product: null,
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_PRODUCT:
        draft.product = action.payload.product;
        break;
    }
  });

export default reducer;
