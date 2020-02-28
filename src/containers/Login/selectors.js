import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAuth = state => state.auth || initialState;

const makeSelectError = () => createSelector(selectAuth, auth => auth.error);

const makeSelectIsLogining = () => createSelector(selectAuth, auth => auth.isLogining);

const makeSelectUser = () => createSelector(selectAuth, auth => auth.user);

const makeSelectIsShowLogin = () => createSelector(selectAuth, auth => auth.isShowLogin);

export { makeSelectError, makeSelectIsLogining, makeSelectUser, makeSelectIsShowLogin };
