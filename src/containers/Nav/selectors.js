import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectNav = state => state.nav || initialState;

const makeSelectNotices = () => createSelector(selectNav, nav => nav.notices);

export { makeSelectNotices };
