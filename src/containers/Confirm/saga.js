import { call, put, takeLatest, select } from 'redux-saga/effects';
import _ from 'lodash';
import { push } from 'connected-react-router';

import { MAKE_ORDER } from './constants';
import { orderApi } from '@/api';
import Alert from '@/components/Alert';

export function* makeOrder() {
  try {
    console.log('makeOrder');

    yield call(orderApi.makeOrder);
    yield put(push('/'));
  } catch (err) {
    Alert.info('error');
    console.error('订单错误: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(MAKE_ORDER, makeOrder);
}
