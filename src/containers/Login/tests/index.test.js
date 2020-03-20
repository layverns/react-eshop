import React from 'react';

import configureStore from '@/store';
import { mapDispatchToProps } from '../index';
import { hideLogin, login } from '../actions';

describe('Login 测试', () => {
  let store;

  beforeAll(() => {
    store = configureStore();
  });

  describe('dispatch', () => {
    it('调用 onHideLogin 时 dispath hideLogin', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.onHideLogin();
      expect(dispatch).toHaveBeenCalledWith(hideLogin());
    });

    it('调用 onSubmit 时 dispath login', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      const username = 'username';
      const password = 'password';
      result.onSubmit(username, password);
      expect(dispatch).toHaveBeenCalledWith(login(username, password));
    });
  });
});
