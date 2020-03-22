import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { SEARCH, PRODUCTS_PER_PAGE } from './constants';
import { setProducts, setProductCount, setCategories } from './actions';
import { productApi } from '@/api';

export function* search(action) {
  try {
    const { keyword, categoryId, sort, order, page } = action.payload;

    const res = yield call(productApi.search, { keyword, sort, order, categoryId, limit: PRODUCTS_PER_PAGE, offset: (page - 1) * PRODUCTS_PER_PAGE });
    const products = _.get(res, 'data.products', []);
    const productCount = _.get(res, 'data.productCount', 0);
    const categories = _.get(res, 'data.categories', 0);

    yield put(setCategories(categories));
    yield put(setProducts(products));
    yield put(setProductCount(productCount));
  } catch (err) {
    console.error('搜索错误: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(SEARCH, search);
}
