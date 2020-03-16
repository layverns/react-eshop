import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHeader = state => state.header || initialState;

const makeSelectHotWords = () => createSelector(selectHeader, header => header.hotWords);

const makeSelectCategories = () => createSelector(selectHeader, header => header.categories);

export { makeSelectHotWords, makeSelectCategories };
