import { call, put, takeLatest, select } from 'redux-saga/effects';
import _ from 'lodash';
import moment from 'moment';

import { FETCH_CAROUSELS, FETCH_PRODUCTS } from './constants';
import { setCarousels, setCategory, setThirdCategories, setProducts } from './actions';
import { carouselApi, categoryApi, productApi } from '@/api';
import { makeSelectProducts, makeSelectThirdCategories } from './selectors';

export function* fetchCarousels(action) {
  try {
    const res = yield call(carouselApi.getCarousels, action.payload.categoryId);
    const carousels = _.get(res, 'data.carousels', []);

    yield put(setCarousels(carousels));
  } catch (err) {
    console.error('获取列表页轮播图错误: ', err.response || err);
  }
}

export function* fetchProducts(action) {
  try {
    const res = yield call(categoryApi.getCategory, action.payload.categoryId);
    const category = _.get(res, 'data.category', {});
    yield put(setCategory(category));

    let thirdCategories = _.get(res, 'data.thirdCategories', []);

    let allThirdCategories = yield select(makeSelectThirdCategories());
    let allProducts = yield select(makeSelectProducts());
    //对每个三级分类的产品列表缓存10分钟
    for (let i = 0; i < thirdCategories.length; i++) {
      let tc = _.find(allThirdCategories, atc => atc.id === thirdCategories[i].id);
      if (
        _.isEmpty(tc) ||
        moment()
          .subtract(10, 'minutes')
          .isAfter(moment(tc.updateTime))
      ) {
        tc = thirdCategories[i];

        const res = yield call(productApi.getProducts, { thirdCategoryId: tc.id });
        const products = _.get(res, 'data.products', []);

        products.forEach(p => {
          _.remove(allProducts, ap => ap.id === p.id);
          allProducts.push(p);
        });

        tc.updateTime = moment();
        _.remove(allThirdCategories, atc => atc.id === tc.id);
        allThirdCategories.push(tc);
      }
    }
    yield put(setProducts(allProducts.slice(0, allProducts.length)));
    yield put(setThirdCategories(allThirdCategories.slice(0, allThirdCategories.length)));
  } catch (err) {
    console.error('获取列表数据错误: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(FETCH_CAROUSELS, fetchCarousels);
  yield takeLatest(FETCH_PRODUCTS, fetchProducts);
}
