import produce from 'immer';

import { SHOW_LOGIN, HIDE_LOGIN, LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, SET_USER } from './constants';

export const initialState = {
  error: null,
  isLogining: false,
  user: null,
  isShowLogin: false,
};

const AuthReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHOW_LOGIN:
        draft.isShowLogin = true;
        break;
      case HIDE_LOGIN:
        draft.isShowLogin = false;
        break;
      case LOGIN:
        draft.isLogining = true;
        draft.error = null;
        draft.user = null;
        break;
      case LOGIN_SUCCESS:
        draft.user = action.payload.user;
        draft.isLogining = false;
        draft.isShowLogin = false;
        break;
      case LOGIN_FAIL:
        draft.error = action.payload.error;
        draft.isLogining = false;
        break;
      case SET_USER:
        draft.user = action.payload.user;
        break;
      default:
        break;
    }
  });

export default AuthReducer;
