import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectProduct = state => state.product || initialState;

const makeSelectProduct = () => createSelector(selectProduct, product => product.product);

const makeSelectIndexs = () => createSelector(selectProduct, product => product.indexs);

const makeSelectSpecs = () => createSelector(selectProduct, product => product.specs);

export { makeSelectProduct, makeSelectIndexs, makeSelectSpecs };
