
import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { api, authApi } from '@/api';
import { tokenStorage } from '@/utils/localStorage';
import { LOAD_APP } from './constants';
import { setCurrentUser } from '@/containers/Login/actions';

export function* loadApp() {

  try {
    const token = tokenStorage.load();
    api.init();
    if (token) {
      api.setToken(token);

      const res = yield call(authApi.currentUser);
      const user = _.get(res, 'data.user', null);
      
      yield put(setCurrentUser(user));
    }
  } catch (err) {
    console.error('app load fail: ', err.response);
    if (_.get(err, 'response.status', 0) == 401) {
      tokenStorage.save(null);
      api.setToken(null);
      yield put(setCurrentUser(null));
    }
    
  }
}

export default function* saga() {

  yield takeLatest(LOAD_APP, loadApp);
}
