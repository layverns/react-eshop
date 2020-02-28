import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { api, authApi } from '@/api';
import { tokenStorage } from '@/utils/localStorage';
import { LOAD_APP } from './constants';
import { setUser } from '@/containers/Login/actions';

export function* loadApp() {
  try {
  } catch (err) {
    console.error('app load fail: ', err.response);
  }
}

export default function* saga() {
  yield takeLatest(LOAD_APP, loadApp);
}
