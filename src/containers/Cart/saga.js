import { call, put, takeLatest, select } from 'redux-saga/effects';
import _ from 'lodash';
import moment from 'moment';

import { FETCH_CAROUSELS, FETCH_PRODUCTS } from './constants';
import { setCarousels, setCategory, setThirdCategories, setProducts } from './actions';
import { carouselApi, categoryApi, productApi } from '@/api';
import { makeSelectProducts, makeSelectThirdCategories } from './selectors';

export function* fetchCarousels(action) {
  console.log('fetchCarousels');
  try {
    const res = yield call(carouselApi.getCarousels, action.payload.categoryId);

    const carousels = _.get(res, 'data.carousels', []);

    console.log('setCarousels: ', carousels);
    yield put(setCarousels(carousels));
  } catch (err) {
    console.error('获取列表页轮播图错误: ', err.response || err);
  }
}

export function* fetchProducts(action) {
  console.log('fetchProducts');
  try {
    const res = yield call(categoryApi.getCategory, action.payload.categoryId);
    const category = _.get(res, 'data.category', {});
    yield put(setCategory(category));

    let thirdCategories = _.get(res, 'data.thirdCategories', []);

    //对每个三级分类的产品列表缓存10分钟
    for (let i = 0; i < thirdCategories.length; i++) {
      let allThirdCategories = yield select(makeSelectThirdCategories());
      let tc = _.find(allThirdCategories, atc => atc.id == thirdCategories[i].id);
      console.log('find tc: ', tc);
      _.isEmpty(tc) ||
        console.log(
          'moment : ',
          moment()
            .subtract(10, 'minutes')
            .isAfter(moment(tc.updateTime))
        );
      if (
        _.isEmpty(tc) ||
        moment()
          .subtract(10, 'minutes')
          .isAfter(moment(tc.updateTime))
      ) {
        tc = thirdCategories[i];

        const res = yield call(productApi.getProducts, { thirdCategoryId: tc.id });
        let allProducts = yield select(makeSelectProducts());
        const products = _.get(res, 'data.products', []);
        allProducts = [...allProducts, ...products];
        yield put(setProducts(allProducts));

        tc.updateTime = moment();
        allThirdCategories = [...allThirdCategories, tc];
        yield put(setThirdCategories(allThirdCategories));
      }
    }
  } catch (err) {
    console.error('获取列表数据错误: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(FETCH_CAROUSELS, fetchCarousels);
  yield takeLatest(FETCH_PRODUCTS, fetchProducts);
}
