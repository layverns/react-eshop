import produce from 'immer';

import { SET_ORDERS } from './constants';

export const initialState = {
  orders: [],
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_ORDERS:
        draft.orders = action.payload.orders;
        break;
    }
  });

export default reducer;
