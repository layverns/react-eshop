import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import {
  setCarousels,
  setNewProducts,
  setRecommendProducts,
  setBestSellProducts,
  setTimeProducts,
  setWelfareProducts,
  setPresentProducts,
  setCategoryList,
} from './actions';
import {
  FETCH_CAROUSELS,
  FETCH_NEW_PRODUCTS,
  FETCH_RECOMMEND_PRODUCTS,
  FETCH_BEST_SELL_PRODUCTS,
  FETCH_TIME_PRODUCTS,
  FETCH_WELFARE_PRODUCTS,
  FETCH_PRESENT_PRODUCTS,
  FETCH_CATEGORY_LIST,
} from './constants';
import { carouselApi, productApi, categoryApi } from '@/api';

function* fetchCarousels() {
  console.log('fetchCarousels');
  try {
    const res = yield call(carouselApi.getHomeCarousels);
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

function* fetchWelfareProducts() {
  try {
    console.log('fetchWelfareProducts');
    const res = yield call(productApi.getWelfareProducts);
    const welfareProducts = _.get(res, 'data.welfareProducts', []);
    if (_.isEmpty(welfareProducts)) {
      return;
    }

    yield put(setWelfareProducts(welfareProducts));
  } catch (err) {
    console.error('获取特价产品错误: ', err.response || err);
  }
}

function* fetchPresentProducts() {
  try {
    console.log('fetchPresentProducts');
    const res = yield call(productApi.getPresentProducts);
    const presentProducts = _.get(res, 'data.presentProducts', []);
    if (_.isEmpty(presentProducts)) {
      return;
    }

    yield put(setPresentProducts(presentProducts));
  } catch (err) {
    console.error('获取赠送产品错误: ', err.response || err);
  }
}

function* fetchCategoryList() {
  try {
    console.log('fetchCategoryList');
    const res = yield call(categoryApi.getAllCarousels);
    const categoryList = _.get(res, 'data.categoryList', []);
    if (_.isEmpty(categoryList)) {
      return;
    }

    yield put(setCategoryList(categoryList));
  } catch (err) {
    console.error('获取分类轮播图错误: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(FETCH_CAROUSELS, fetchCarousels);
  yield takeLatest(FETCH_NEW_PRODUCTS, fetchNewProducts);
  yield takeLatest(FETCH_RECOMMEND_PRODUCTS, fetchRecommendProducts);
  yield takeLatest(FETCH_BEST_SELL_PRODUCTS, fetchBestSellProducts);
  yield takeLatest(FETCH_TIME_PRODUCTS, fetchTimeProducts);
  yield takeLatest(FETCH_WELFARE_PRODUCTS, fetchWelfareProducts);
  yield takeLatest(FETCH_PRESENT_PRODUCTS, fetchPresentProducts);
  yield takeLatest(FETCH_CATEGORY_LIST, fetchCategoryList);
}
