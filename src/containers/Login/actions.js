import { LOGIN, SHOW_LOGIN, HIDE_LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, SET_USER, LOGOUT } from './constants';

export function showLogin() {
  return {
    type: SHOW_LOGIN,
  };
}

export function hideLogin() {
  return {
    type: HIDE_LOGIN,
  };
}

export function login(email, password) {
  return {
    type: LOGIN,
    payload: {
      email,
      password,
    },
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user,
    },
  };
}

export function loginFail(error) {
  return {
    type: LOGIN_FAIL,
    payload: {
      error,
    },
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    payload: {
      user,
    },
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
