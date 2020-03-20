import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import history from '@/utils/history';
import configureStore from '@/store';
import { mapDispatchToProps } from '../index';
import { fetchHotWords, fetchCategories } from '../actions';
import { delFromCart } from '@/containers/Cart/actions';
import { Header } from '../index';

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
            <Header hotWords={[]} categories={[]} carts={[]} onLoad={loadSpy} />
          </ConnectedRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('dispatch', () => {
    it('调用 onLoad 时 dispath fetchHotWords、fetchCategories', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.onLoad();
      expect(dispatch).toHaveBeenCalledWith(fetchHotWords());
      expect(dispatch).toHaveBeenCalledWith(fetchCategories());
    });

    it('调用 onDelFromCart 时 dispath delFromCart', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      const product = {
        id: 1,
        title: 'product',
      };
      result.onDelFromCart(product);
      expect(dispatch).toHaveBeenCalledWith(delFromCart(product));
    });
  });
});
