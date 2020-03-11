import { call, put, takeLatest, select } from 'redux-saga/effects';
import _ from 'lodash';
import moment from 'moment';

import { FETCH_CAROUSELS, FETCH_DATA } from './constants';
import { setCarousels, setCategory, setThirdCategories, setData } from './actions';
import { carouselApi, categoryApi, productApi } from '@/api';
import { makeSelectData } from './selectors';

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

export function* fetchData(action) {
  console.log('fetchData');
  try {
    const res = yield call(categoryApi.getCategory, action.payload.categoryId);
    const category = _.get(res, 'data.category', {});
    const thirdCategories = _.get(res, 'data.thirdCategories', {});
    yield put(setCategory(category));
    yield put(setThirdCategories(thirdCategories));

    //对每个三级分类的产品列表缓存10分钟
    for (let i = 0; i < thirdCategories.length; i++) {
      let data = yield select(makeSelectData());
      let tc = thirdCategories[i];
      if (
        _.isEmpty(data[tc.id]) ||
        moment()
          .subtract(10, 'minutes')
          .isAfter(moment(data[tc.id].updateTime))
      ) {
        const res = yield call(productApi.getProducts, { thirdCategoryId: tc.id });
        const products = _.get(res, 'data.products', {});
        data = {
          ...data,
          [tc.id]: {
            ...tc,
            products,
            updateTime: moment(),
          },
        };
        yield put(setData(data));
      }
    }
  } catch (err) {
    console.error('获取列表数据错误: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(FETCH_CAROUSELS, fetchCarousels);
  yield takeLatest(FETCH_DATA, fetchData);
}
