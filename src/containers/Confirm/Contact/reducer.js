import produce from 'immer';

import {} from './constants';

export const initialState = {
  contacts: [],
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
    }
  });

export default reducer;
