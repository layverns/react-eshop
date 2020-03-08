import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import { FETCH_PRODUCT } from './constants';
import { setProduct, setIndexs, setSpecs } from './actions';
import { productApi } from '@/api';

function* getProduct(action) {
  console.log('getProduct');
  try {
    const res = yield call(productApi.getProduct, action.payload.id);
    const product = _.get(res, 'data.product', null);
    if (_.isEmpty(product)) throw new Error('获取产品详情失败.');

    let indexs = [];
    let specs = [];
    for (let i = 0; i < product.productSpecs.length; i++) {
      indexs.push(0);
      specs.push(product.productSpecs[i][0].id);
    }

    yield put(setProduct(product));
    yield put(setIndexs(indexs));
    yield put(setSpecs(specs));
  } catch (err) {
    console.error('get product fail: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(FETCH_PRODUCT, getProduct);
}
