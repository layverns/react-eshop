import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectProduct = state => state.product || initialState;

const makeSelectProduct = () => createSelector(selectProduct, product => product.product);

const makeSelectComments = () => createSelector(selectProduct, product => product.comments);

const makeSelectCommentCount = () => createSelector(selectProduct, product => product.commentCount);

const makeSelectCommentPage = () => createSelector(selectProduct, product => product.commentPage);

const makeSelectCommentAvgStars = () => createSelector(selectProduct, product => product.commentAvgStars);

const makeSelectSpecs = () => createSelector(selectProduct, product => product.specs);

export { makeSelectProduct, makeSelectSpecs, makeSelectComments, makeSelectCommentCount, makeSelectCommentPage, makeSelectCommentAvgStars };
