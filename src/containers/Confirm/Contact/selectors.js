import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectContact = state => state.contact || initialState;

const makeSelectContacts = () => createSelector(selectContact, contact => contact.contacts);
const makeSelectError = () => createSelector(selectContact, contact => contact.error);
const makeSelectContact = () => createSelector(selectContact, contact => contact.contact);
const makeSelectIsEdit = () => createSelector(selectContact, contact => contact.isEdit);

export { makeSelectContacts, makeSelectError, makeSelectContact, makeSelectIsEdit };
