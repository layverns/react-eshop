import { makeSelectHotWords, makeSelectCategories } from '../selectors';

describe('Header seletors 测试', () => {
  it('makeSelectHotWords 正确获取 hotWords', () => {
    const hotWords = ['hot', 'words'];
    const mockedState = {
      header: {
        hotWords,
      },
    };
    expect(makeSelectHotWords()(mockedState)).toEqual(hotWords);
  });

  it('makeSelectCategories 正确获取 categories', () => {
    const categories = ['a', 'b'];
    const mockedState = {
      header: {
        categories,
      },
    };
    expect(makeSelectCategories()(mockedState)).toEqual(categories);
  });

  // it('makeSelectUser 正确获取 user', () => {
  //   const user = {
  //     id: 1,
  //     username: 'a',
  //   };
  //   const mockedState = {
  //     auth: {
  //       user,
  //     },
  //   };
  //   expect(makeSelectUser()(mockedState)).toEqual(user);
  // });

  // it('makeSelectIsShowLogin 正确获取 isShowLogin', () => {
  //   const isShowLogin = true;
  //   const mockedState = {
  //     auth: {
  //       isShowLogin,
  //     },
  //   };
  //   expect(makeSelectIsShowLogin()(mockedState)).toEqual(isShowLogin);
  // });
});
