import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectList = state => state.list || initialState;

const makeSelectList = () => createSelector(selectList, list => list.list);

export { makeSelectList };
