import { makeSelectError, makeSelectIsLogining, makeSelectUser, makeSelectIsShowLogin } from '../selectors';

describe('Login seletors 测试', () => {
  it('makeSelectError 正确获取 error', () => {
    const error = 'hello error';
    const mockedState = {
      auth: {
        error,
      },
    };
    expect(makeSelectError()(mockedState)).toEqual(error);
  });

  it('makeSelectIsLogining 正确获取 isLogining', () => {
    const isLogining = true;
    const mockedState = {
      auth: {
        isLogining,
      },
    };
    expect(makeSelectIsLogining()(mockedState)).toEqual(isLogining);
  });

  it('makeSelectUser 正确获取 user', () => {
    const user = {
      id: 1,
      username: 'a',
    };
    const mockedState = {
      auth: {
        user,
      },
    };
    expect(makeSelectUser()(mockedState)).toEqual(user);
  });

  it('makeSelectIsShowLogin 正确获取 isShowLogin', () => {
    const isShowLogin = true;
    const mockedState = {
      auth: {
        isShowLogin,
      },
    };
    expect(makeSelectIsShowLogin()(mockedState)).toEqual(isShowLogin);
  });
});
