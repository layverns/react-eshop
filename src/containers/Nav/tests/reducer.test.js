import produce from 'immer';

import reducer from '../reducer';
import { setNotices } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('Nav reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      notices: [],
    };
  });

  it('返回初始状态', () => {
    const expectedResult = state;
    expect(reducer(undefined, {})).toEqual(expectedResult);
  });

  it('正确处理setNotices action', () => {
    const notices = ['a', 'b'];
    const expectedResult = produce(state, draft => {
      draft.notices = notices;
    });

    expect(reducer(state, setNotices(notices))).toEqual(expectedResult);
  });
});
