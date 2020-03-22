import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import { push } from 'connected-react-router';

import { MAKE_ORDER } from './constants';
import { orderApi } from '@/api';
import Alert from '@/components/Alert';

export function* makeOrder() {
  try {
    yield call(orderApi.makeOrder);
    yield put(push('/orders'));
  } catch (err) {
    let message = _.get(err, 'response.data.message', null) || _.get(err, 'message', null);
    Alert.info(message);
    console.error('订单错误: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(MAKE_ORDER, makeOrder);
}
