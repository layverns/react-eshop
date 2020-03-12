import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectList = state => state.list || initialState;

const makeSelectProducts = () => createSelector(selectList, list => list.products);
const makeSelectThirdCategoryId = () => createSelector(selectList, list => list.thirdCategoryId);
const makeSelectSort = () => createSelector(selectList, list => list.sort);
const makeSelectOrder = () => createSelector(selectList, list => list.order);
const makeSelectLimit = () => createSelector(selectList, list => list.limit);
const makeSelectOffset = () => createSelector(selectList, list => list.offset);
const makeSelectCount = () => createSelector(selectList, list => list.count);

export { makeSelectProducts, makeSelectThirdCategoryId, makeSelectSort, makeSelectOrder, makeSelectLimit, makeSelectOffset, makeSelectCount };
