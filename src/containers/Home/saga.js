import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { setCarousels, setNewProducts, setRecommendProducts, setBestSellProducts, setTimeProducts } from './actions';
import { FETCH_CAROUSELS, FETCH_NEW_PRODUCTS, FETCH_RECOMMEND_PRODUCTS, FETCH_BEST_SELL_PRODUCTS, FETCH_TIME_PRODUCTS } from './constants';
import { carouselApi, productApi } from '@/api';

function* fetchCarousels() {
  console.log('fetchCarousels');
  try {
    const res = yield call(carouselApi.getCarousels);
    const carousels = _.get(res, 'data.carousels', []);
    if (_.isEmpty(carousels)) {
      return;
    }

    yield put(setCarousels(carousels));
  } catch (err) {
    console.error('get carousels fail: ', err.response || err);
  }
}

function* fetchNewProducts() {
  try {
    console.log('fetchNewProducts');
    const res = yield call(productApi.getNewProducts);
    const newProducts = _.get(res, 'data.newProducts', []);
    if (_.isEmpty(newProducts)) {
      return;
    }

    yield put(setNewProducts(newProducts));
  } catch (err) {
    console.error('获取新产品错误: ', err.response || err);
  }
}

function* fetchRecommendProducts() {
  try {
    console.log('fetchRecommendProducts');
    const res = yield call(productApi.getRecommendProducts);
    const recommendProducts = _.get(res, 'data.recommendProducts', []);
    if (_.isEmpty(recommendProducts)) {
      return;
    }

    yield put(setRecommendProducts(recommendProducts));
  } catch (err) {
    console.error('获取新产品错误: ', err.response || err);
  }
}

function* fetchBestSellProducts() {
  try {
    console.log('fetchBestSellProducts');
    const res = yield call(productApi.getBestSellProducts);
    const bestSellProducts = _.get(res, 'data.bestSellProducts', []);
    if (_.isEmpty(bestSellProducts)) {
      return;
    }

    yield put(setBestSellProducts(bestSellProducts));
  } catch (err) {
    console.error('获取新产品错误: ', err.response || err);
  }
}

function* fetchTimeProducts() {
  try {
    console.log('fetchTimeProducts');
    const res = yield call(productApi.getTimeProducts);
    const timeProducts = _.get(res, 'data.timeProducts', []);
    if (_.isEmpty(timeProducts)) {
      return;
    }

    yield put(setTimeProducts(timeProducts));
  } catch (err) {
    console.error('获取限时购产品错误: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(FETCH_CAROUSELS, fetchCarousels);
  yield takeLatest(FETCH_NEW_PRODUCTS, fetchNewProducts);
  yield takeLatest(FETCH_RECOMMEND_PRODUCTS, fetchRecommendProducts);
  yield takeLatest(FETCH_BEST_SELL_PRODUCTS, fetchBestSellProducts);
  yield takeLatest(FETCH_TIME_PRODUCTS, fetchTimeProducts);
}
