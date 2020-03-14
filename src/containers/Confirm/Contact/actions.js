import { FETCH_CONTACTS, SET_CONTACTS, SAVE_CONTACT, SET_ERROR } from './constants';

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

export function setError(error) {
  return {
    type: SET_ERROR,
    payload: {
      error,
    },
  };
}

export function saveContact(contact) {
  return {
    type: SAVE_CONTACT,
    payload: {
      contact,
    },
  };
}
