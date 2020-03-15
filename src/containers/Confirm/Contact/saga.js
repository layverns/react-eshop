import { call, put, takeLatest, select } from 'redux-saga/effects';
import _ from 'lodash';

import { FETCH_CONTACTS, SAVE_CONTACT } from './constants';
import { setContacts, setError, setContact, setIsEdit } from './actions';
import { contactApi } from '@/api';

export function* fetchContacts() {
  try {
    console.log('fetchContacts');
    const res = yield call(contactApi.getContacts);
    let contacts = _.get(res, 'data.contacts', []);

    yield put(setContacts(contacts));

    if (_.isEmpty(contacts)) {
      yield put(setContact({}));
      yield put(setIsEdit(true));
    } else {
      let index = _.findIndex(contacts, c => c.isDefault == 1);
      if (index < 0) index = 0;
      yield put(setContact(contacts[index]));
      yield put(setIsEdit(false));
    }
  } catch (err) {
    let message = _.get(err, 'response.data.message', null) || _.get(err, 'message', null);
    yield put(setError(message));
    console.error('获取地址信息错误: ', err.response || err);
  }
}

export function* saveContact(action) {
  try {
    console.log('saveContact');
    yield call(contactApi.saveContact, action.payload.contact);

    const res = yield call(contactApi.getContacts);
    let contacts = _.get(res, 'data.contacts', []);

    yield put(setContacts(contacts));
    yield put(setIsEdit(false));

    let index = _.findIndex(contacts, c => c.isDefault == 1);
    if (index < 0) index = 0;
    yield put(setContact(contacts[index]));
  } catch (err) {
    let message = _.get(err, 'response.data.message', null) || _.get(err, 'message', null);
    yield put(setError(message));
    console.error('保存地址信息错误: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(FETCH_CONTACTS, fetchContacts);
  yield takeLatest(SAVE_CONTACT, saveContact);
}
