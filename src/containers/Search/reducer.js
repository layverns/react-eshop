import produce from 'immer';

import {} from './constants';

export const initialState = {
  thirdCategoryId: null,
  sort: null,
  order: 'asc',
  limit: 40,
  offset: 0,
  count: 0,
  thirdCategories: [],
  products: [],
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case '':
        draft.products = action.payload.products;
        break;
    }
  });

export default reducer;
