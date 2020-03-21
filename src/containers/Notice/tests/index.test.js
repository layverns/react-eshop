import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import history from '@/utils/history';
import configureStore from '@/store';

import { Notice } from '../index';

describe('Notice 测试', () => {
  let store;

  beforeAll(() => {
    store = configureStore();
  });

  it('snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Notice />
          </ConnectedRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
