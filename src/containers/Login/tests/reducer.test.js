import produce from 'immer';

import reducer from '../reducer';
import { showLogin, hideLogin, login, loginSuccess, loginFail, setUser } from '../actions';

describe('Login reducer 测试', () => {
  let state;

  beforeEach(() => {
    state = {
      error: null,
      isLogining: false,
      user: null,
      isShowLogin: false,
    };
  });

  it('返回初始状态', () => {
    const expectedResult = state;

    expect(reducer(undefined, {})).toEqual(expectedResult);
  });

  it('正确处理 showLogin action', () => {
    const expectedResult = produce(state, draft => {
      draft.isShowLogin = true;
    });

    expect(reducer(state, showLogin())).toEqual(expectedResult);
  });

  it('正确处理 hideLogin action', () => {
    const expectedResult = produce(state, draft => {
      draft.isShowLogin = false;
    });

    expect(reducer(state, hideLogin())).toEqual(expectedResult);
  });

  it('正确处理 login action', () => {
    const expectedResult = produce(state, draft => {
      draft.isLogining = true;
      draft.error = null;
      draft.user = null;
    });

    const email = 'email';
    const password = 'password';

    expect(reducer(state, login(email, password))).toEqual(expectedResult);
  });

  it('正确处理 loginSuccess action', () => {
    const user = {
      id: 1,
      username: 'a',
    };

    const expectedResult = produce(state, draft => {
      draft.user = user;
      draft.isLogining = false;
      draft.isShowLogin = false;
    });

    expect(reducer(state, loginSuccess(user))).toEqual(expectedResult);
  });

  it('正确处理 loginFail action', () => {
    const error = 'error';

    const expectedResult = produce(state, draft => {
      draft.error = error;
    });

    expect(reducer(state, loginFail(error))).toEqual(expectedResult);
  });

  it('正确处理 setUser action', () => {
    const user = {
      id: 1,
      username: 'a',
    };

    const expectedResult = produce(state, draft => {
      draft.user = user;
    });

    expect(reducer(state, setUser(user))).toEqual(expectedResult);
  });
});
