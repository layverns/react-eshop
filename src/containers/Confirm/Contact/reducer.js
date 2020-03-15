import produce from 'immer';

import { SET_CONTACTS, SET_ERROR, SET_CONTACT, SET_IS_EDIT } from './constants';

export const initialState = {
  contacts: null,
  error: null,
  contact: null,
  isEdit: false,
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
      case SET_CONTACT:
        draft.contact = action.payload.contact;
        break;
      case SET_IS_EDIT:
        draft.isEdit = action.payload.isEdit;
        break;
    }
  });

export default reducer;
