import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import history from '@/utils/history';
import configureStore from '@/store';

import { Home } from '../index';

describe('Header 测试', () => {
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
            <Home onLoad={loadSpy} />
          </ConnectedRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
