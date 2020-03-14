import produce from 'immer';

import { SET_CONTACTS, SET_ERROR } from './constants';

export const initialState = {
  contacts: null,
  error: null,
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_CONTACTS:
        draft.contacts = action.payload.contacts;
        break;
      case SET_ERROR:
        draft.error = action.payload.error;
        break;
    }
  });

export default reducer;
