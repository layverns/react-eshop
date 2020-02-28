import produce from 'immer';

import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, SET_CURRENT_USER } from './constants';

export const initialState = {
  error: null,
  isLogining: false,
  currentUser: null
};

const AuthReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN:
        draft.isLogining = true;
        draft.error = null;
        draft.currentUser = null;
        break;
      case LOGIN_SUCCESS: 
        draft.currentUser = action.payload;
        draft.isLogining = false;
        break;
      case LOGIN_FAIL:
        draft.error = action.payload;
        draft.isLogining = false;
        break;
      case SET_CURRENT_USER:
        draft.currentUser = action.payload;
        break;
      default:
        break;
    }
  });

export default AuthReducer;
