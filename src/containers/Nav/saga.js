import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { FETCH_NOTICES } from './constants';
import { setNotices } from './actions';
import { noticeApi } from '@/api';

export function* fetchNotices() {
  console.log('fetchNotices');
  try {
    const res = yield call(noticeApi.getNotices);
    const notices = _.get(res, 'data.notices', null);
    if (_.isEmpty(notices)) throw new Error('获取通知失败.');

    yield put(setNotices(notices));
  } catch (err) {
    console.error('fetch notices fail: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(FETCH_NOTICES, fetchNotices);
}
