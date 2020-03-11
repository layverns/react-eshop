import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectList = state => state.list || initialState;

const makeSelectCarousels = () => createSelector(selectList, list => list.carousels);

const makeSelectCategory = () => createSelector(selectList, list => list.category);

const makeSelectThirdCategories = () => createSelector(selectList, list => list.thirdCategories);

const makeSelectData = () => createSelector(selectList, list => list.data);

export { makeSelectCarousels, makeSelectCategory, makeSelectThirdCategories, makeSelectData };
