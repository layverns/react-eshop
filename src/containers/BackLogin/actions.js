import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, SET_CURRENT_USER } from './constants';

export function login(email, password) {
  return {
    type: LOGIN,
    payload: {
      email,
      password
    }
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: user
  };
}

export function loginFail(err) {
  return {
    type: LOGIN_FAIL,
    payload: err
  };
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
}