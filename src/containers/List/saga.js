import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { FETCH_LIST } from './constants';
import { setList } from './actions';
import { listApi } from '@/api';

export function* fetchList(action) {
  console.log('fetchList');
  try {
    const res = yield call(listApi.getList, action.payload.categoryId);
    const list = _.get(res, 'data.list', {});

    yield put(setList(list));
  } catch (err) {
    console.error('获取列表错误: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(FETCH_LIST, fetchList);
}
