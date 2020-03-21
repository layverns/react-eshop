import { call, put, takeLatest, select } from 'redux-saga/effects';
import moment from 'moment';
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
import { makeSelectCategoryList } from './selectors';
import { carouselApi, productApi, categoryApi } from '@/api';

function* fetchCarousels() {
  try {
    const res = yield call(carouselApi.getHomeCarousels);
    const carousels = _.get(res, 'data.carousels', []);

    yield put(setCarousels(carousels));
  } catch (err) {
    console.error('获取轮播图错误: ', err.response || err);
  }
}

function* fetchNewProducts() {
  try {
    const res = yield call(productApi.getNewProducts);
    const newProducts = _.get(res, 'data.newProducts', []);

    yield put(setNewProducts(newProducts));
  } catch (err) {
    console.error('获取新产品错误: ', err.response || err);
  }
}

function* fetchRecommendProducts() {
  try {
    const res = yield call(productApi.getRecommendProducts);
    const recommendProducts = _.get(res, 'data.recommendProducts', []);

    yield put(setRecommendProducts(recommendProducts));
  } catch (err) {
    console.error('获取推荐产品错误: ', err.response || err);
  }
}

function* fetchBestSellProducts() {
  try {
    const res = yield call(productApi.getBestSellProducts);
    const bestSellProducts = _.get(res, 'data.bestSellProducts', []);

    yield put(setBestSellProducts(bestSellProducts));
  } catch (err) {
    console.error('获取热销产品错误: ', err.response || err);
  }
}

function* fetchTimeProducts() {
  try {
    const res = yield call(productApi.getTimeProducts);
    const timeProducts = _.get(res, 'data.timeProducts', []);

    yield put(setTimeProducts(timeProducts));
  } catch (err) {
    console.error('获取限时购产品错误: ', err.response || err);
  }
}

function* fetchWelfareProducts() {
  try {
    const res = yield call(productApi.getWelfareProducts);
    const welfareProducts = _.get(res, 'data.welfareProducts', []);

    yield put(setWelfareProducts(welfareProducts));
  } catch (err) {
    console.error('获取特价产品错误: ', err.response || err);
  }
}

function* fetchPresentProducts() {
  try {
    const res = yield call(productApi.getPresentProducts);
    const presentProducts = _.get(res, 'data.presentProducts', []);

    yield put(setPresentProducts(presentProducts));
  } catch (err) {
    console.error('获取赠送产品错误: ', err.response || err);
  }
}

function* fetchCategoryList() {
  try {
    let categoryList = yield select(makeSelectCategoryList());

    if (
      _.isEmpty(categoryList) ||
      moment()
        .subtract(10, 'minutes')
        .isAfter(moment(categoryList.updateTime))
    ) {
      const res = yield call(categoryApi.getCategoryList);
      categoryList = _.get(res, 'data.categoryList', []);
      categoryList.updateTime = moment();
      yield put(setCategoryList(categoryList));
    }
  } catch (err) {
    console.error('获取分类列表错误: ', err.response || err);
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
