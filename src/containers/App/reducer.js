import produce from 'immer';

import { LOAD_APP } from './constants';

export const initialState = {}

const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch(action.type) {
      case LOAD_APP:

        break;
    }
  });

export default appReducer;