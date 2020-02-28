
import { call, put, select, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import { push } from 'connected-react-router';

import { authApi, api } from '@/api';
import { tokenStorage } from '@/utils/localStorage';
import { LOGIN } from './constants';
import { loginSuccess, loginFail } from './actions';

export function* login(action) {
  try {
    const res = yield call(authApi.login, action.payload.email, action.payload.password);
  
    const user = _.get(res, 'data.user', null);
    if (!user) throw new Error('登录失败.');
  
    const token = user.token;

    api.setToken(token);
    tokenStorage.save(token);

    yield put(loginSuccess(user));
    yield put(push('/'));
  } catch (err) {
    console.error('login fail: ', err.response || err);
    yield put(loginFail(_.get(err, 'response.data.message', null) || _.get(err, '.message', null)));
  }
}

export default function* saga() {

  yield takeLatest(LOGIN, login);
}
