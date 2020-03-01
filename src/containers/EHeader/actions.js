import { FETCH_HOT_WORDS, SET_HOT_WORDS, FETCH_CATEGORIES, SET_CATEGORIES } from './constants';

export function fetchCategories() {
  return {
    type: FETCH_CATEGORIES,
  };
}

export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    payload: {
      categories,
    },
  };
}

export function setHotWords(hotWords) {
  return {
    type: SET_HOT_WORDS,
    payload: {
      hotWords,
    },
  };
}

export function fetchHotWords() {
  return {
    type: FETCH_HOT_WORDS,
  };
}
