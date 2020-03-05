import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCarousels = state => state.carousel || initialState;

const makeSelectCarousels = () => createSelector(selectCarousels, carousel => carousel.carousels);

export { makeSelectCarousels };
