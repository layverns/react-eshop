import produce from 'immer';

import { SET_CAROUSELS } from './constants';

export const initialState = {
  carousels: [],
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_CAROUSELS:
        draft.carousels = action.payload.carousels;
        break;
    }
  });

export default reducer;
