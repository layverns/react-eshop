import { put, takeLatest } from 'redux-saga/effects';

import { FETCH_HOT_WORDS, FETCH_CATEGORIES } from '../constants';
import { setHotWords, setCategories } from '../actions';
import saga, { fetchHotWords, fetchCategories } from '../saga';

describe('fetchHotWords Saga 测试', () => {
  let getReposGenerator;

  beforeEach(() => {
    getReposGenerator = fetchHotWords();
    getReposGenerator.next().value;
  });

  it('获取成功后调用 setHotWords action', () => {
    const hotWords = ['a', 'b'];
    const response = {
      data: {
        hotWords,
      },
    };
    const putDescriptor = getReposGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(setHotWords(hotWords)));
  });
});

describe('fetchCategories Saga 测试', () => {
  let getReposGenerator;

  beforeEach(() => {
    getReposGenerator = fetchCategories();
    getReposGenerator.next().value;
  });

  it('获取成功后调用 setCategories action', () => {
    const categories = ['a', 'b'];
    const response = {
      data: {
        categories,
      },
    };
    const putDescriptor = getReposGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(setCategories(categories)));
  });
});

describe('Header Saga 测试', () => {
  let headerSaga;

  beforeEach(() => {
    headerSaga = saga();
  });

  it('saga接受 FETCH_HOT_WORDS action', () => {
    const takeLatestDescriptor = headerSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(FETCH_HOT_WORDS, fetchHotWords));
  });

  it('saga接受 FETCH_CATEGORIES action', () => {
    headerSaga.next().value;
    const takeLatestDescriptor = headerSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(FETCH_CATEGORIES, fetchCategories));
  });
});
