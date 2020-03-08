import produce from 'immer';

import { SET_PRODUCT, SET_INDEXS, SET_SPECS } from './constants';

export const initialState = {
  product: null,
  indexs: [],
  specs: [],
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_PRODUCT:
        draft.product = action.payload.product;
        break;
      case SET_INDEXS:
        draft.indexs = action.payload.indexs;
        break;
      case SET_SPECS:
        draft.specs = action.payload.specs;
        break;
    }
  });

export default reducer;
