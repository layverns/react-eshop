import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import { FETCH_PRODUCT, FETCH_COMMENTS } from './constants';
import { setProduct, setSpecs, setComments, setCommentCount, setCommentAvgStars } from './actions';
import { productApi } from '@/api';

function* getProduct(action) {
  console.log('getProduct');
  try {
    const res = yield call(productApi.getProduct, action.payload.id);
    const product = _.get(res, 'data.product', null);
    if (!_.isEmpty(product)) {
      let specs = [];
      for (let i = 0; i < product.productSpecs.length; i++) {
        specs.push(product.productSpecs[i][0].id);
      }
      yield put(setProduct(product));
      yield put(setSpecs(specs));
    }
  } catch (err) {
    console.error('获取产品详情错误: ', err.response || err);
  }
}

function* getComments(action) {
  console.log('getComments');
  try {
    const res = yield call(productApi.getComments, action.payload.id);
    const comments = _.get(res, 'data.comments', null);
    const commentCount = _.get(res, 'data.commentCount', 0);
    const commentAvgStars = _.get(res, 'data.commentAvgStars', 0);

    yield put(setComments(comments));
    yield put(setCommentCount(commentCount));
    yield put(setCommentAvgStars(commentAvgStars));
  } catch (err) {
    console.error('获取评论错误: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(FETCH_PRODUCT, getProduct);
  yield takeLatest(FETCH_COMMENTS, getComments);
}
