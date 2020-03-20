import { put, takeLatest } from 'redux-saga/effects';

import { LOGIN, LOGOUT } from '../constants';
import { loginSuccess, loginFail, setUser } from '../actions';
import saga, { login, logout } from '../saga';

describe('login Saga 测试', () => {
  let getReposGenerator;
  let email = 'email';
  let password = 'password';

  beforeEach(() => {
    getReposGenerator = login({
      payload: {
        email,
        password,
      },
    });
    getReposGenerator.next().value;
  });

  it('登陆成功后调用 loginSuccess action', () => {
    const user = {
      id: 1,
      username: 'a',
    };
    const response = {
      data: {
        user,
      },
    };
    const putDescriptor = getReposGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(loginSuccess(user)));
  });

  it('登陆失败后调用 loginFail action', () => {
    const message = 'some error';
    const putDescriptor = getReposGenerator.throw(new Error(message)).value;
    expect(putDescriptor).toEqual(put(loginFail(message)));
  });
});

describe('logout Saga 测试', () => {
  let getReposGenerator;

  beforeEach(() => {
    getReposGenerator = logout();
  });

  it('登出成功后调用 setUser action', () => {
    const putDescriptor = getReposGenerator.next().value;
    expect(putDescriptor).toEqual(put(setUser(null)));
  });
});

describe('Login Saga 测试', () => {
  let loginSaga;

  beforeEach(() => {
    loginSaga = saga();
  });

  it('saga接受 LOGIN action', () => {
    const takeLatestDescriptor = loginSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOGIN, login));
  });

  it('saga接受 LOGOUT action', () => {
    loginSaga.next().value;

    const takeLatestDescriptor = loginSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOGOUT, logout));
  });
});
