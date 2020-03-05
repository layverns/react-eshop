import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import { FETCH_PRODUCT } from './constants';
import { setProduct } from './actions';
import { productApi } from '@/api';

function* getProduct(action) {
  try {
    const res = yield call(productApi.getProduct, action.payload.id);
    const product = _.get(res, 'data.product', null);
    console.log('product: ', product);
    if (_.isEmpty(product)) throw new Error('获取产品详情失败.');

    yield put(setProduct(product));
  } catch (err) {
    console.error('get product fail: ', err.response);
  }
}

export default function* saga() {
  yield takeLatest(FETCH_PRODUCT, getProduct);
}
