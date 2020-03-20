import { FETCH_CATEGORIES, FETCH_HOT_WORDS } from '../constants';

import { fetchCategories, fetchHotWords } from '../actions';

describe('Login Actions 测试', () => {
  it('fetchCategories 返回正确的 type 和 payload', () => {
    const expectedResult = {
      type: FETCH_CATEGORIES,
    };
    expect(fetchCategories()).toEqual(expectedResult);
  });

  it('fetchHotWords 返回正确的 type 和 payload', () => {
    const expectedResult = {
      type: FETCH_HOT_WORDS,
    };
    expect(fetchHotWords()).toEqual(expectedResult);
  });
});
