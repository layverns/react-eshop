import { call, put, takeLatest, select } from 'redux-saga/effects';
import _ from 'lodash';

import { cartApi } from '@/api';
import { cartStorage } from '@/utils/localStorage';
import { ADD_TO_CART, TRANSFER_TO_USER_CART, LOAD_CART } from './constants';
import { makeSelectUser } from '@/containers/Login/selectors';
import { makeSelectCart } from './selectors';
import { setCart } from './actions';

export function* addToCart(action) {
  try {
    console.log('addToCart');
    let user = yield select(makeSelectUser());
    const { product } = action.payload;
    let cart = [];
    if (_.isEmpty(user)) {
      cart = cartStorage.load() || [];
      let index = _.findIndex(cart, c => c && c.id == product.id && _.isEqual(c.specs, product.specs));
      if (index < 0) {
        cart.push(product);
      } else {
        cart[index].quantity += product.quantity;
      }
      cartStorage.save(cart);
    } else {
      const { id, specs, quantity } = product;
      yield call(cartApi.addToCart, { product: id, specs, quantity });
      const res = yield call(cartApi.getCarts);
      cart = _.get(res, 'data.carts', null);
      if (!cart) throw new Error('获取购物车列表失败！');
    }

    yield put(setCart(cart));
  } catch (err) {
    console.error('加入购物车错误: ', err.response || err);
  }
}

export function* transferToUserCart() {
  try {
    console.log('transferToUserCart');
    let user = yield select(makeSelectUser());
    let cart = yield select(makeSelectCart());
    if (_.isEmpty(user) || _.isEmpty(cart)) {
      return;
    } else {
      for (let i = 0; i < cart.length; i++) {
        const { id, specs, quantity } = cart[i];
        yield call(cartApi.addToCart, { product: id, specs, quantity });
      }
      cartStorage.save([]);
      const res = yield call(cartApi.getCarts);
      cart = _.get(res, 'data.carts', null);
      if (!cart) return;
      yield put(setCart(cart));
    }
  } catch (err) {
    console.error('转移用户购物车错误: ', err.response || err);
  }
}

export function* loadCart() {
  try {
    console.log('loadCart');
    let cart = cartStorage.load();
    if (!_.isEmpty(cart)) {
      yield put(setCart(cart));
    }
  } catch (err) {
    console.error('加载购物车错误: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(LOAD_CART, loadCart);
  yield takeLatest(ADD_TO_CART, addToCart);
  yield takeLatest(TRANSFER_TO_USER_CART, transferToUserCart);
}
