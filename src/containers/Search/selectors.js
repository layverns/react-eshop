import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectSearch = state => state.search || initialState;

const makeSelectProducts = () => createSelector(selectSearch, search => search.products);

const makeSelectProductCount = () => createSelector(selectSearch, search => search.productCount);

const makeSelectCategories = () => createSelector(selectSearch, search => search.categories);

const makeSelectKeyword = () => createSelector(selectSearch, search => search.keyword);

export { makeSelectProducts, makeSelectProductCount, makeSelectCategories, makeSelectKeyword };
