import produce from 'immer';

import { LOAD } from './constants';

export const initialState = {};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD:
        break;
    }
  });

export default reducer;
