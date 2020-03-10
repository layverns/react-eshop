import produce from 'immer';

import { SET_LIST } from './constants';

export const initialState = {
  list: {},
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_LIST:
        draft.list = action.payload.list;
        break;
    }
  });

export default reducer;
