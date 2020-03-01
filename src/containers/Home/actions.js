import { FETCH_CAROUSELS, SET_CAROUSELS } from './constants';

export function fetchCarousels() {
  return {
    type: FETCH_CAROUSELS,
  };
}

export function setCarousels(carousels) {
  return {
    type: SET_CAROUSELS,
    payload: {
      carousels,
    },
  };
}
