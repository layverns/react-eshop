import {
  ADD_TO_CART,
  DEL_FROM_CART,
  CHECK_CART,
  CHANGE_CART_QUANTITY,
  TRANSFER_TO_USER_CART,
  LOAD_CARTS,
  SET_CARTS,
  SET_IS_CHECK_ALL,
  CHECK_ALL,
  UN_CHECK_ALL,
} from './constants';

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

export function loadCarts() {
  return {
    type: LOAD_CARTS,
  };
}

export function setCarts(carts) {
  return {
    type: SET_CARTS,
    payload: { carts },
  };
}

export function setIsCheckAll(isCheckAll) {
  return {
    type: SET_IS_CHECK_ALL,
    payload: { isCheckAll },
  };
}

export function checkAll() {
  return {
    type: CHECK_ALL,
  };
}

export function unCheckAll() {
  return {
    type: UN_CHECK_ALL,
  };
}
