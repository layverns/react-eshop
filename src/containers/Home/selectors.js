import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

export {};
