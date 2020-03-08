import produce from 'immer';

import { LOAD_APP, SET_CART } from './constants';

export const initialState = {
  cart: [],
};

const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_CART:
        draft.cart = action.payload.cart;
        break;
    }
  });

export default appReducer;
