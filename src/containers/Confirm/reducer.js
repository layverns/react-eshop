import produce from 'immer';

export const initialState = {};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
    }
  });

export default reducer;
