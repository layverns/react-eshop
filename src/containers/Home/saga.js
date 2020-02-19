
import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { homeApi } from '@/api';
import { FETCH_CATEGORIES, FETCH_CAROUSELS } from './constants';
import { setCategories, setCarousels } from './actions';

function* getCategories() {

  try {
    const res = yield call(homeApi.fetchAllCategories);
    const categories = _.get(res, 'data.categories', []);

    yield put(setCategories(categories));

  } catch (err) {
    console.error('fetch categories fail: ', err.response);
  }
}

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

  yield takeLatest(FETCH_CATEGORIES, getCategories);
  yield takeLatest(FETCH_CAROUSELS, getCarousels);
}
