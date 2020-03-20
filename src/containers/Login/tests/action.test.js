import { LOGOUT } from '../constants';

import { logout } from '../actions';

describe('Login Actions 测试', () => {
  describe('logout', () => {
    it('返回正确的 type 和 payload', () => {
      const expectedResult = {
        type: LOGOUT,
      };
      expect(logout()).toEqual(expectedResult);
    });
  });
});
