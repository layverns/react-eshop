import { FETCH_CONTACTS, SET_CONTACTS, SAVE_CONTACT, SET_ERROR, SET_CONTACT, SET_IS_EDIT } from './constants';

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

export function setContact(contact) {
  return {
    type: SET_CONTACT,
    payload: {
      contact,
    },
  };
}

export function setIsEdit(isEdit) {
  return {
    type: SET_IS_EDIT,
    payload: {
      isEdit,
    },
  };
}
