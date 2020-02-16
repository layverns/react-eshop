import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAuth = state => state.auth || initialState;

const makeSelectError = () =>
  createSelector(
    selectAuth,
    auth => auth.error
  );

const makeSelectIsLogining = () =>
  createSelector(
    selectAuth,
    auth => auth.isLogining
  );

export { makeSelectError, makeSelectIsLogining };