import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectCart = state => state.cart || initialState;

const makeSelectCart = () => createSelector(selectCart, cart => cart.cart);

export { makeSelectCart };
