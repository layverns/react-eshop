import { LOAD_APP, ADD_TO_CART, TRANSFER_TO_USER_CART, LOAD_CART, SET_CART } from './constants';

export function addToCart(product) {
  return {
    type: ADD_TO_CART,
    payload: { product },
  };
}

export function transferToUserCart() {
  return {
    type: TRANSFER_TO_USER_CART,
  };
}

export function loadCart() {
  return {
    type: LOAD_CART,
  };
}

export function setCart(cart) {
  return {
    type: SET_CART,
    payload: { cart },
  };
}
