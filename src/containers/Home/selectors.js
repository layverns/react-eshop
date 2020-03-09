import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectCarousels = () => createSelector(selectHome, home => home.carousels);

const makeSelectNewProducts = () => createSelector(selectHome, home => home.newProducts);

const makeSelectRecommendProducts = () => createSelector(selectHome, home => home.recommendProducts);

const makeSelectBestSellProducts = () => createSelector(selectHome, home => home.bestSellProducts);

const makeSelectTimeProducts = () => createSelector(selectHome, home => home.timeProducts);

const makeSelectWelfareProducts = () => createSelector(selectHome, home => home.welfareProducts);

const makeSelectPresentProducts = () => createSelector(selectHome, home => home.presentProducts);

const makeSelectCategoryCarousels = () => createSelector(selectHome, home => home.categoryCarousels);

export {
  makeSelectCarousels,
  makeSelectNewProducts,
  makeSelectRecommendProducts,
  makeSelectBestSellProducts,
  makeSelectTimeProducts,
  makeSelectWelfareProducts,
  makeSelectPresentProducts,
  makeSelectCategoryCarousels,
};
