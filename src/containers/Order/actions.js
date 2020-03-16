import { FETCH_ORDERS, SET_ORDERS, PAY_ORDER } from './constants';

export function fetchOrders() {
  return {
    type: FETCH_ORDERS,
  };
}

export function setOrders(orders) {
  return {
    type: SET_ORDERS,
    payload: {
      orders,
    },
  };
}

export function payOrder(orderId) {
  return {
    type: PAY_ORDER,
    payload: {
      orderId,
    },
  };
}
