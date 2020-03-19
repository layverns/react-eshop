import React from 'react';
import { render } from '@testing-library/react';
import configureStore from '../../../store';

import { Nav } from '../index';

describe('<HomePage />', () => {
  let store;

  beforeAll(() => {
    store = configureStore();
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
});
