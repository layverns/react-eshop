import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { homeApi } from '@/api';
import { FETCH_CAROUSELS } from './constants';
import { setCarousels } from './actions';

function* getCarousels() {
  try {
    const res = yield call(homeApi.fetchCarousels);
    const carousels = _.get(res, 'data.carousels', []);

    yield put(setCarousels(carousels));
  } catch (err) {
    console.error('fetch carousels fail: ', err.response);
  }
}

export default function* saga() {
  yield takeLatest(FETCH_CAROUSELS, getCarousels);
}
