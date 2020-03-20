import { makeSelectNotices } from '../selectors';

describe('makeSelectNotices', () => {
  const usernameSelector = makeSelectNotices();
  it('应该获取 notices', () => {
    const notices = ['aaaa', 'bbbb'];
    const mockedState = {
      nav: {
        notices,
      },
    };
    expect(usernameSelector(mockedState)).toEqual(notices);
  });
});
