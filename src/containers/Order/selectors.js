import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectOrder = state => state.order || initialState;

const makeSelectOrders = () => createSelector(selectOrder, order => order.orders);

export { makeSelectOrders };
