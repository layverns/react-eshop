import { call, put, takeLatest, select } from 'redux-saga/effects';
import _ from 'lodash';
import moment from 'moment';

import { SEARCH } from './constants';
import { setProducts } from './actions';
import { productApi } from '@/api';
import { makeSelectLimit, makeSelectOffset, makeSelectSort, makeSelectOrder, makeSelectThirdCategoryId } from './selectors';

export function* search(action) {
  console.log('search');
  try {
    const limit = yield select(makeSelectLimit());
    const offset = yield select(makeSelectOffset());
    const sort = yield select(makeSelectSort());
    const order = yield select(makeSelectOrder());
    const thirdCategoryId = yield select(makeSelectThirdCategoryId());
    const res = yield call(productApi.search, { keyword: action.payload.keyword, limit, offset, sort, order, thirdCategoryId });
    const products = _.get(res, 'data.products', []);
    yield put(setProducts(products));
  } catch (err) {
    console.error('获取列表页轮播图错误: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(SEARCH, search);
}
