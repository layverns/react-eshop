import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectCart = state => state.cart || initialState;

const makeSelectCarts = () => createSelector(selectCart, cart => cart.carts);

const makeSelectIsCheckAll = () => createSelector(selectCart, cart => cart.isCheckAll);

export { makeSelectCarts, makeSelectIsCheckAll };
