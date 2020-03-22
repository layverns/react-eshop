import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import history from '@/utils/history';
import configureStore from '@/store';

import { Cart } from '../index';

describe('Cart 测试', () => {
  let store;

  beforeAll(() => {
    store = configureStore();
  });

  it('snapshot', () => {
    let carts = [
      {
        id: 1,
        specs: [1],
        images: ['a', 'b'],
        isChecked: 1,
        productSpecs: [
          [
            {
              id: 1,
              order: 0,
              index: 0,
              spec: '规格',
              title: '规格1',
            },
          ],
        ],
        productInfo: {
          prices: [179],
        },
        quantity: 1,
      },
    ];

    const tree = renderer
      .create(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Cart carts={carts} />
          </ConnectedRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
