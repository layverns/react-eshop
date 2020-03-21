import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import history from '@/utils/history';
import configureStore from '@/store';

import { User } from '../index';

describe('User 测试', () => {
  let store;

  beforeAll(() => {
    store = configureStore();
  });

  it('snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <User user={{ image: 'a', username: 'apple' }} />
          </ConnectedRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
