import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEHeader = state => state.eHeader || initialState;

const makeSelectHotWords = () => createSelector(selectEHeader, eHeader => eHeader.hotWords);

const makeSelectCategories = () => createSelector(selectEHeader, eHeader => eHeader.categories);

export { makeSelectHotWords, makeSelectCategories };
