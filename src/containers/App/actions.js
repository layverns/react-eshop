import { LOAD_APP, ADD_TO_CART, DEL_FROM_CART, CHECK_CART, CHANGE_CART_QUANTITY, TRANSFER_TO_USER_CART, LOAD_CART, SET_CART } from './constants';

export function addToCart(product) {
  return {
    type: ADD_TO_CART,
    payload: { product },
  };
}

export function changeCartQuantity(product) {
  return {
    type: CHANGE_CART_QUANTITY,
    payload: { product },
  };
}

export function checkCart(product) {
  return {
    type: CHECK_CART,
    payload: { product },
  };
}

export function delFromCart(product) {
  return {
    type: DEL_FROM_CART,
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
