import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectCart = state => state.cart || initialState;

const makeSelectCarts = () => createSelector(selectCart, cart => cart.carts);

const makeSelectCheckedCarts = () => createSelector(selectCart, cart => cart.carts.filter(c => c.isChecked));

const makeSelectIsCheckAll = () => createSelector(selectCart, cart => cart.isCheckAll);

const makeSelectIsCheckOne = () => createSelector(selectCart, cart => cart.isCheckOne);

export { makeSelectCarts, makeSelectIsCheckAll, makeSelectIsCheckOne, makeSelectCheckedCarts };
