import produce from 'immer';

import reducer from '../reducer';
import { setHotWords, setCategories } from '../actions';

describe('Login reducer 测试', () => {
  let state;

  beforeEach(() => {
    state = {
      hotWords: [],
      categories: [],
    };
  });

  it('返回初始状态', () => {
    const expectedResult = state;

    expect(reducer(undefined, {})).toEqual(expectedResult);
  });

  it('正确处理 setHotWords action', () => {
    const hotwords = ['a', 'b'];
    const expectedResult = produce(state, draft => {
      draft.hotWords = hotwords;
    });

    expect(reducer(state, setHotWords(hotwords))).toEqual(expectedResult);
  });

  it('正确处理 setCategories action', () => {
    const categories = ['a', 'b'];
    const expectedResult = produce(state, draft => {
      draft.categories = categories;
    });

    expect(reducer(state, setCategories(categories))).toEqual(expectedResult);
  });
});
