import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { FETCH_NOTICES } from './constants';
import { setNotices } from './actions';
import { noticeApi } from '@/api';

export function* getNotices() {
  try {
    const res = yield call(noticeApi.getNotices);
    const notices = _.get(res, 'data.notices', []);

    yield put(setNotices(notices));
  } catch (err) {
    console.error('获取通知错误: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(FETCH_NOTICES, getNotices);
}
