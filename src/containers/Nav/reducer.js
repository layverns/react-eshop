import produce from 'immer';

import { SET_NOTICES } from './constants';

export const initialState = {
  notices: [],
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_NOTICES:
        console.log('reducer notices: ', action.payload.notices);
        draft.notices = action.payload.notices;
        break;
      default:
        break;
    }
  });

export default reducer;
