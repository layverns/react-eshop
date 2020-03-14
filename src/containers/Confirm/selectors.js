import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectList = state => state.list || initialState;

export {};
