import { FETCH_NOTICES, SET_NOTICES } from './constants';

export function fetchNotices() {
  return {
    type: FETCH_NOTICES,
  };
}

export function setNotices(notices) {
  return {
    type: SET_NOTICES,
    payload: {
      notices,
    },
  };
}
