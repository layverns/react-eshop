import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectApp = state => state.app || initialState;

const makeSelectCart = () => createSelector(selectApp, app => app.cart);

export { makeSelectCart };
