import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectContact = state => state.contact || initialState;

const makeSelectContacts = () => createSelector(selectContact, contact => contact.contacts);
const makeSelectError = () => createSelector(selectContact, contact => contact.error);

export { makeSelectContacts, makeSelectError };
