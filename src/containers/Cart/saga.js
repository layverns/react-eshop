import { call, put, takeLatest, select } from 'redux-saga/effects';
import _ from 'lodash';

import { cartApi } from '@/api';
import { cartStorage } from '@/utils/localStorage';
import { ADD_TO_CART, CHANGE_CART_QUANTITY, TRANSFER_TO_USER_CART, LOAD_CARTS, DEL_FROM_CART, CHECK_CART, CHECK_ALL, UN_CHECK_ALL } from './constants';
import { makeSelectUser } from '@/containers/Login/selectors';
import { makeSelectCarts } from './selectors';
import { setCarts, setIsCheckAll, setIsCheckOne } from './actions';

export function* addToCart(action) {
  try {
    let user = yield select(makeSelectUser());
    const { product } = action.payload;
    product.isChecked = true;
    let carts = [];
    if (_.isEmpty(user)) {
      carts = cartStorage.load() || [];
      let index = _.findIndex(carts, c => c && c.id === product.id && _.isEqual(c.specs, product.specs));
      if (index < 0) {
        let quantity = product.quantity;
        if (quantity > 99) quantity = 99;
        if (quantity < 1) quantity = 1;
        carts.push(product);
      } else {
        let quantity = carts[index].quantity + product.quantity;
        if (quantity > 99) quantity = 99;
        if (quantity < 1) quantity = 1;
        carts[index].quantity = quantity;
      }
      cartStorage.save(carts);
    } else {
      const { id, specs, quantity } = product;
      yield call(cartApi.addToCart, { productId: id, specs, quantity });
      const res = yield call(cartApi.getCarts);
      carts = _.get(res, 'data.carts', []);
    }

    yield put(setIsCheckOne(isCheckOne(carts)));
    yield put(setIsCheckAll(isCheckAll(carts)));
    yield put(setCarts(carts));
  } catch (err) {
    console.error('加入购物车错误: ', err.response || err);
  }
}

export function* changeCartQuantity(action) {
  try {
    let user = yield select(makeSelectUser());
    const { product } = action.payload;
    let carts = [];
    if (_.isEmpty(user)) {
      carts = cartStorage.load() || [];
      let index = _.findIndex(carts, c => c && c.id === product.id && _.isEqual(c.specs, product.specs));
      if (index >= 0) {
        let quantity = product.quantity;
        if (quantity > 99) quantity = 99;
        if (quantity < 1) quantity = 1;
        carts[index].quantity = quantity;
      }
      cartStorage.save(carts);
    } else {
      const { id, specs, quantity } = product;
      yield call(cartApi.changeCartQuantity, { productId: id, specs, quantity });
      const res = yield call(cartApi.getCarts);
      carts = _.get(res, 'data.carts', []);
    }

    yield put(setIsCheckOne(isCheckOne(carts)));
    yield put(setIsCheckAll(isCheckAll(carts)));
    yield put(setCarts(carts));
  } catch (err) {
    console.error('改变购物车数量错误: ', err.response || err);
  }
}

export function* checkCart(action) {
  try {
    let user = yield select(makeSelectUser());
    const { product } = action.payload;
    let carts = [];
    if (_.isEmpty(user)) {
      carts = cartStorage.load() || [];
      let index = _.findIndex(carts, c => c && c.id === product.id && _.isEqual(c.specs, product.specs));
      if (index >= 0) {
        carts[index].isChecked = !carts[index].isChecked;
      }
      cartStorage.save(carts);
    } else {
      const { id, specs } = product;
      yield call(cartApi.checkCart, { productId: id, specs });
      const res = yield call(cartApi.getCarts);
      carts = _.get(res, 'data.carts', []);
    }

    yield put(setIsCheckOne(isCheckOne(carts)));
    yield put(setIsCheckAll(isCheckAll(carts)));
    yield put(setCarts(carts));
  } catch (err) {
    console.error('改变购物车数量错误: ', err.response || err);
  }
}

export function* checkAll(action) {
  try {
    let user = yield select(makeSelectUser());
    let carts = [];
    if (_.isEmpty(user)) {
      carts = cartStorage.load() || [];
      carts = carts.map(c => ({ ...c, isChecked: true }));
      cartStorage.save(carts);
    } else {
      yield call(cartApi.checkAll);
      const res = yield call(cartApi.getCarts);
      carts = _.get(res, 'data.carts', []);
    }

    yield put(setIsCheckOne(isCheckOne(carts)));
    yield put(setIsCheckAll(isCheckAll(carts)));
    yield put(setCarts(carts));
  } catch (err) {
    console.error('批量选择购物车错误: ', err.response || err);
  }
}

export function* unCheckAll(action) {
  try {
    let user = yield select(makeSelectUser());
    let carts = [];
    if (_.isEmpty(user)) {
      carts = cartStorage.load() || [];
      carts = carts.map(c => ({ ...c, isChecked: false }));
      cartStorage.save(carts);
    } else {
      yield call(cartApi.unCheckAll);
      const res = yield call(cartApi.getCarts);
      carts = _.get(res, 'data.carts', []);
    }

    yield put(setIsCheckOne(isCheckOne(carts)));
    yield put(setIsCheckAll(isCheckAll(carts)));
    yield put(setCarts(carts));
  } catch (err) {
    console.error('批量反购物车错误: ', err.response || err);
  }
}
export function* delFromCart(action) {
  try {
    let user = yield select(makeSelectUser());
    const { product } = action.payload;
    let carts = [];
    if (_.isEmpty(user)) {
      carts = cartStorage.load() || [];
      let index = _.findIndex(carts, c => c && c.id === product.id && _.isEqual(c.specs, product.specs));
      if (index >= 0) {
        carts.splice(index, 1);
      }
      cartStorage.save(carts);
    } else {
      const { id, specs } = product;
      yield call(cartApi.delFromCart, { productId: id, specs });
      const res = yield call(cartApi.getCarts);
      carts = _.get(res, 'data.carts', []);
    }

    yield put(setIsCheckOne(isCheckOne(carts)));
    yield put(setIsCheckAll(isCheckAll(carts)));
    yield put(setCarts(carts));
  } catch (err) {
    console.error('加入购物车错误: ', err.response || err);
  }
}

export function* transferToUserCart() {
  try {
    let user = yield select(makeSelectUser());
    let carts = yield select(makeSelectCarts());
    if (_.isEmpty(user) || _.isEmpty(carts)) {
      return;
    } else {
      for (let i = 0; i < carts.length; i++) {
        const { id, specs, quantity } = carts[i];
        yield call(cartApi.addToCart, { productId: id, specs, quantity });
      }
      cartStorage.save([]);
      const res = yield call(cartApi.getCarts);
      carts = _.get(res, 'data.carts', []);

      yield put(setIsCheckOne(isCheckOne(carts)));
      yield put(setIsCheckAll(isCheckAll(carts)));
      yield put(setCarts(carts));
    }
  } catch (err) {
    console.error('转移用户购物车错误: ', err.response || err);
  }
}

export function* loadCarts() {
  try {
    let user = yield select(makeSelectUser());
    let carts = [];
    if (_.isEmpty(user)) {
      carts = cartStorage.load() || [];
    } else {
      const res = yield call(cartApi.getCarts);
      carts = _.get(res, 'data.carts', []);
    }

    yield put(setIsCheckOne(isCheckOne(carts)));
    yield put(setIsCheckAll(isCheckAll(carts)));
    yield put(setCarts(carts));
  } catch (err) {
    console.error('加载购物车错误: ', err.response || err);
  }
}

function isCheckAll(carts) {
  let isCheckAll = true;
  for (let i = 0; i < carts.length; i++) {
    if (!carts[i].isChecked) {
      isCheckAll = false;
      break;
    }
  }
  return isCheckAll;
}

function isCheckOne(carts) {
  let isCheckOne = false;
  for (let i = 0; i < carts.length; i++) {
    if (carts[i].isChecked) {
      isCheckOne = true;
      break;
    }
  }
  return isCheckOne;
}

export default function* saga() {
  yield takeLatest(LOAD_CARTS, loadCarts);
  yield takeLatest(ADD_TO_CART, addToCart);
  yield takeLatest(CHANGE_CART_QUANTITY, changeCartQuantity);
  yield takeLatest(CHECK_CART, checkCart);
  yield takeLatest(DEL_FROM_CART, delFromCart);
  yield takeLatest(TRANSFER_TO_USER_CART, transferToUserCart);
  yield takeLatest(CHECK_ALL, checkAll);
  yield takeLatest(UN_CHECK_ALL, unCheckAll);
}
