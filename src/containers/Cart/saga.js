import { call, put, takeLatest, select } from 'redux-saga/effects';
import _ from 'lodash';
import moment from 'moment';

import { cartApi } from '@/api';
import { cartStorage } from '@/utils/localStorage';
import { ADD_TO_CART, CHANGE_CART_QUANTITY, TRANSFER_TO_USER_CART, LOAD_CART, DEL_FROM_CART, CHECK_CART } from './constants';
import { makeSelectUser } from '@/containers/Login/selectors';
import { makeSelectCart } from './selectors';
import { setCart } from './actions';

export function* addToCart(action) {
  try {
    console.log('addToCart');
    let user = yield select(makeSelectUser());
    const { product } = action.payload;
    product.isChecked = true;
    let cart = [];
    if (_.isEmpty(user)) {
      cart = cartStorage.load() || [];
      let index = _.findIndex(cart, c => c && c.id == product.id && _.isEqual(c.specs, product.specs));
      if (index < 0) {
        let quantity = product.quantity;
        if (quantity > 99) quantity = 99;
        if (quantity < 1) quantity = 1;
        cart.push(product);
      } else {
        let quantity = cart[index].quantity + product.quantity;
        if (quantity > 99) quantity = 99;
        if (quantity < 1) quantity = 1;
        cart[index].quantity = quantity;
      }
      cartStorage.save(cart);
    } else {
      const { id, specs, quantity } = product;
      yield call(cartApi.addToCart, { id, specs, quantity });
      const res = yield call(cartApi.getCarts);
      cart = _.get(res, 'data.carts', []);
    }

    yield put(setCart(cart));
  } catch (err) {
    console.error('加入购物车错误: ', err.response || err);
  }
}

export function* changeCartQuantity(action) {
  try {
    console.log('changeCartQuantity');
    let user = yield select(makeSelectUser());
    const { product } = action.payload;
    let cart = [];
    if (_.isEmpty(user)) {
      cart = cartStorage.load() || [];
      let index = _.findIndex(cart, c => c && c.id == product.id && _.isEqual(c.specs, product.specs));
      console.log(' index: ', index);
      if (index >= 0) {
        let quantity = product.quantity;
        if (quantity > 99) quantity = 99;
        if (quantity < 1) quantity = 1;
        cart[index].quantity = quantity;
        console.log(' cart[index]: ', cart[index]);
      }
      cartStorage.save(cart);
    } else {
      const { id, specs, quantity } = product;
      yield call(cartApi.changeCartQuantity, { id, specs, quantity });
      const res = yield call(cartApi.getCarts);
      cart = _.get(res, 'data.carts', []);
    }

    yield put(setCart(cart));
  } catch (err) {
    console.error('改变购物车数量错误: ', err.response || err);
  }
}

export function* checkCart(action) {
  try {
    console.log('checkCart');
    let user = yield select(makeSelectUser());
    const { product } = action.payload;
    let cart = [];
    if (_.isEmpty(user)) {
      cart = cartStorage.load() || [];
      let index = _.findIndex(cart, c => c && c.id == product.id && _.isEqual(c.specs, product.specs));
      if (index >= 0) {
        cart[index].isChecked = !cart[index].isChecked;
      }
      cartStorage.save(cart);
    } else {
      const { id, specs } = product;
      yield call(cartApi.checkCart, { id, specs });
      const res = yield call(cartApi.getCarts);
      cart = _.get(res, 'data.carts', []);
    }

    yield put(setCart(cart));
  } catch (err) {
    console.error('改变购物车数量错误: ', err.response || err);
  }
}

export function* delFromCart(action) {
  try {
    console.log('delFromCart');
    let user = yield select(makeSelectUser());
    const { product } = action.payload;
    let cart = [];
    if (_.isEmpty(user)) {
      cart = cartStorage.load() || [];
      let index = _.findIndex(cart, c => c && c.id == product.id && _.isEqual(c.specs, product.specs));
      if (index >= 0) {
        cart.splice(index, 1);
      }
      cartStorage.save(cart);
    } else {
      const { id, specs } = product;
      yield call(cartApi.delFromCart, { id, specs });
      const res = yield call(cartApi.getCarts);
      cart = _.get(res, 'data.carts', []);
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
    let user = yield select(makeSelectUser());
    let cart = [];
    if (_.isEmpty(user)) {
      cart = cartStorage.load() || [];
    } else {
      const res = yield call(cartApi.getCarts);
      cart = _.get(res, 'data.carts', []);
    }

    yield put(setCart(cart));
  } catch (err) {
    console.error('加载购物车错误: ', err.response || err);
  }
}

export default function* saga() {
  yield takeLatest(LOAD_CART, loadCart);
  yield takeLatest(ADD_TO_CART, addToCart);
  yield takeLatest(CHANGE_CART_QUANTITY, changeCartQuantity);
  yield takeLatest(CHECK_CART, checkCart);
  yield takeLatest(DEL_FROM_CART, delFromCart);
  yield takeLatest(TRANSFER_TO_USER_CART, transferToUserCart);
}
