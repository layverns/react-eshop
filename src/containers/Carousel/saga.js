import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { setCarousels } from './actions';
import { FETCH_CAROUSELS } from './constants';
import { carouselApi } from '@/api';

export function* fetchCarousels() {
  try {
    const res = yield call(carouselApi.getCarousels);
    const carousels = _.get(res, 'data.carousels', []);
    if (_.isEmpty(carousels)) {
      return;
    }

    yield put(setCarousels(carousels));
  } catch (err) {
    console.error('get carousels fail: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(FETCH_CAROUSELS, fetchCarousels);
}
