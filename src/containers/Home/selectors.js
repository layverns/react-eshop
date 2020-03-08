import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectCarousels = () => createSelector(selectHome, home => home.carousels);

const makeSelectNewProducts = () => createSelector(selectHome, home => home.newProducts);

const makeSelectRecommendProducts = () => createSelector(selectHome, home => home.recommendProducts);

const makeSelectBestSellProducts = () => createSelector(selectHome, home => home.bestSellProducts);

const makeSelectTimeProducts = () => createSelector(selectHome, home => home.timeProducts);

export { makeSelectCarousels, makeSelectNewProducts, makeSelectRecommendProducts, makeSelectBestSellProducts, makeSelectTimeProducts };
