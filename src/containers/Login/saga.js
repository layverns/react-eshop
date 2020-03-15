import { call, put, select, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import { push } from 'connected-react-router';

import { authApi, api } from '@/api';
import { tokenStorage } from '@/utils/localStorage';
import { LOGIN, LOGOUT } from './constants';
import { loginSuccess, loginFail, setUser } from './actions';

import { transferToUserCart } from '@/containers/Cart/actions';

export function* login(action) {
  console.log('login');
  try {
    const res = yield call(authApi.login, action.payload.email, action.payload.password);

    const user = _.get(res, 'data.user', null);
    if (!user) throw new Error('登录失败.');

    const token = user.token;

    api.setToken(token);
    tokenStorage.save(token);

    yield put(transferToUserCart());
    yield put(loginSuccess(user));
    yield put(push('/'));
  } catch (err) {
    console.error('登陆错误: ', err.response || err);
    yield put(loginFail(_.get(err, 'response.data.message', null) || _.get(err, 'message', null)));
  }
}

export function* logout() {
  console.log('logout');
  try {
    api.setToken(null);
    tokenStorage.save(null);

    yield put(setUser(null));
    yield put(push('/'));
  } catch (err) {
    console.error('登出错误: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(LOGIN, login);
  yield takeLatest(LOGOUT, logout);
}
