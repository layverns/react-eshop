import { FETCH_CONTACTS, SET_CONTACTS } from './constants';

export function fetchContacts() {
  return {
    type: FETCH_CONTACTS,
  };
}

export function setContacts(contacts) {
  return {
    type: SET_CONTACTS,
    payload: {
      contacts,
    },
  };
}
