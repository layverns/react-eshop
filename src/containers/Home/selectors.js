import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectCarousels = () => createSelector(selectHome, home => home.carousels);

export { makeSelectCarousels };
