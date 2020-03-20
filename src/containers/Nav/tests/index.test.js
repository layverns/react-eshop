import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { ConnectedRouter } from 'connected-react-router';

import history from '@/utils/history';
import configureStore from '@/store';

import { mapDispatchToProps } from '../index';
import { Nav } from '../index';
import { showLogin, logout } from '@/containers/Login/actions';
import { fetchNotices } from '../actions';

describe('<Nav />', () => {
  let store;

  beforeAll(() => {
    store = configureStore();
  });

  it('snapshot', () => {
    const loadSpy = jest.fn();
    const tree = renderer
      .create(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Nav user={null} notices={null} onLoad={loadSpy} />
          </ConnectedRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('调用加载函数', () => {
    const loadSpy = jest.fn();
    render(
      <Provider store={store}>
        <Nav onLoad={loadSpy} />
      </Provider>
    );
    expect(loadSpy).toHaveBeenCalled();
  });

  it('点击登陆', () => {
    const loadSpy = jest.fn();
    const loginSpy = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <Nav onLoad={loadSpy} onShowLogin={loginSpy} />
      </Provider>
    );
    fireEvent.click(getByText('登录/注册'));

    expect(loginSpy).toHaveBeenCalled();
  });

  describe('dispatch', () => {
    it('调用onShowLogin时dispath showLogin', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.onShowLogin();
      expect(dispatch).toHaveBeenCalledWith(showLogin());
    });

    it('调用onLoad时dispath showLogin', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.onLoad();
      expect(dispatch).toHaveBeenCalledWith(fetchNotices());
    });

    it('调用onLogout时dispath logout', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.onLogout();
      expect(dispatch).toHaveBeenCalledWith(logout());
    });
  });
});
