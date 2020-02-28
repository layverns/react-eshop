import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { LOAD } from './constants';

export function* load() {
  try {
  } catch (err) {
    console.error('load fail: ', err.response);
    if (_.get(err, 'response.status', 0) == 401) {
    }
  }
}

export default function* saga() {
  yield takeLatest(LOAD, load);
}
