import { call, put, takeLatest, select } from 'redux-saga/effects';
import _ from 'lodash';

import { LOAD_APP } from './constants';
import { loadCarts } from '@/containers/Cart/actions';
import { setUser } from '@/containers/Login/actions';
import { tokenStorage } from '@/utils/localStorage';
import { authApi, api } from '@/api';

export function* loadApp() {
  console.log('loadApp');
  try {
    let token = tokenStorage.load();
    if (!token) {
      return;
    }
    api.init();
    api.setToken(token);
    const res = yield call(authApi.user);

    const user = _.get(res, 'data.user', null);
    if (!user) throw new Error('登陆信息失效！');

    token = user.token;

    api.setToken(token);
    tokenStorage.save(token);

    yield put(setUser(user));
    yield put(loadCarts());
  } catch (err) {
    console.error('校验错误: ', err.response || err);
    api.setToken(null);
    tokenStorage.save(null);
    yield put(setUser(null));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_APP, loadApp);
}
