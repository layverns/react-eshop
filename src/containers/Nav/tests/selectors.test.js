import { selectNav, makeSelectNotices } from '../selectors';

describe('selectNav', () => {
  it('应该获取 nav state', () => {
    const navState = {
      notices: [],
    };
    const mockedState = {
      nav: navState,
    };
    expect(selectNav(mockedState)).toEqual(navState);
  });
});

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
