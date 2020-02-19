import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectCategories = () =>
  createSelector(
    selectHome,
    home => home.categories
  );

const makeSelectCarousels = () =>
  createSelector(
    selectHome,
    home => home.carousels
  );

export { makeSelectCategories, makeSelectCarousels };