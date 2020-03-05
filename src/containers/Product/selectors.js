import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectProduct = state => state.product || initialState;

const makeSelectProduct = () => createSelector(selectProduct, product => product.product);

export { makeSelectProduct };
