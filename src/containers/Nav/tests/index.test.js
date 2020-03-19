import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

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
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <Nav user={null} notices={null} onLoad={loadSpy} />
      </Provider>
    );
    expect(firstChild).toMatchSnapshot();
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
