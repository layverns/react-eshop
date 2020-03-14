import { call, put, takeLatest, select } from 'redux-saga/effects';
import _ from 'lodash';
import moment from 'moment';

import { FETCH_CONTACTS } from './constants';
import { setContacts } from './actions';
import { contactApi } from '@/api';

export function* fetchContacts() {
  try {
    console.log('fetchContacts');
    const res = yield call(contactApi.getContacts);
    let contacts = _.get(res, 'data.contacts', []);

    yield put(setContacts(contacts));
  } catch (err) {
    console.error('加载购物车错误: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(FETCH_CONTACTS, fetchContacts);
}
