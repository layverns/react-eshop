import produce from 'immer';

import { SET_PRODUCT, SET_COMMENTS, SET_COMMENT_COUNT, SET_COMMENT_AVG_STARS, SET_SPECS } from './constants';

export const initialState = {
  product: null,
  specs: [],
  comments: [],
  commentCount: 0,
  commentAvgStars: 0,
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_PRODUCT:
        draft.product = action.payload.product;
        break;
      case SET_COMMENTS:
        draft.comments = action.payload.comments;
        break;
      case SET_COMMENT_COUNT:
        draft.commentCount = action.payload.commentCount;
        break;
      case SET_COMMENT_AVG_STARS:
        draft.commentAvgStars = action.payload.commentAvgStars;
        break;
      case SET_SPECS:
        draft.specs = action.payload.specs;
        break;
    }
  });

export default reducer;
