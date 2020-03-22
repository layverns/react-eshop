import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { FETCH_ORDERS, PAY_ORDER } from './constants';
import { fetchOrders, setOrders } from './actions';
import { orderApi } from '@/api';
import Alert from '@/components/Alert';

export function* payOrder(action) {
  try {
    yield call(orderApi.payOrder, action.payload.orderId);
    yield put(fetchOrders());
  } catch (err) {
    let message = _.get(err, 'response.data.message', null) || _.get(err, 'message', null);
    Alert.info(message);
    console.error('支付订单错误: ', err.response || err);
  }
}
export function* getOrders() {
  try {
    const res = yield call(orderApi.getOrders);
    const orders = _.get(res, 'data.orders', null);

    yield put(setOrders(orders));
  } catch (err) {
    let message = _.get(err, 'response.data.message', null) || _.get(err, 'message', null);
    Alert.info(message);
    console.error('获取订单错误: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(FETCH_ORDERS, getOrders);
  yield takeLatest(PAY_ORDER, payOrder);
}
