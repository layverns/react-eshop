import { FETCH_LIST, SET_LIST } from './constants';

export function fetchList(categoryId) {
  return {
    type: FETCH_LIST,
    payload: {
      categoryId,
    },
  };
}

export function setList(list) {
  return {
    type: SET_LIST,
    payload: {
      list,
    },
  };
}
