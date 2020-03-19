import { FETCH_NOTICES, SET_NOTICES } from '../constants';

import { fetchNotices, setNotices } from '../actions';

describe('Nav Actions', () => {
  describe('fetchNotices', () => {
    it('返回正确的 type 和 payload', () => {
      const expectedResult = {
        type: FETCH_NOTICES,
      };
      expect(fetchNotices()).toEqual(expectedResult);
    });
  });
  describe('setNotices', () => {
    it('返回正确的 type 和 payload', () => {
      const notices = ['aaaa', 'bbbb'];
      const expectedResult = {
        type: SET_NOTICES,
        payload: {
          notices,
        },
      };
      expect(setNotices(notices)).toEqual(expectedResult);
    });
  });
});
