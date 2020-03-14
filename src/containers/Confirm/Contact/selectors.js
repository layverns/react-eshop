import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectContact = state => state.contact || initialState;

const makeSelectContacts = () => createSelector(selectContact, contact => contact.contacts);

export { makeSelectContacts };
