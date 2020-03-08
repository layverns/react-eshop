import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { setHotWords, setCategories } from './actions';
import { FETCH_HOT_WORDS, FETCH_CATEGORIES } from './constants';
import { searchApi, categoryApi } from '@/api';

export function* fetchHotWords() {
  console.log('fetchHotWords');
  try {
    const res = yield call(searchApi.getHotWords);

    const hotWords = _.get(res, 'data.hotWords', []);
    if (_.isEmpty(hotWords)) {
      return;
    }

    yield put(setHotWords(hotWords));
  } catch (err) {
    console.error('get hotWords fail: ', err.response || err);
  }
}

export function* fetchCategories() {
  console.log('fetchCategories');
  try {
    const res = yield call(categoryApi.getCategories);
    const categories = _.get(res, 'data.categories', []);
    if (_.isEmpty(categories)) {
      return;
    }

    yield put(setCategories(categories));
  } catch (err) {
    console.error('get categories fail: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(FETCH_HOT_WORDS, fetchHotWords);
  yield takeLatest(FETCH_CATEGORIES, fetchCategories);
}
