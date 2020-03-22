import produce from 'immer';

import { SET_PRODUCT, SET_COMMENTS, SET_COMMENT_COUNT, SET_COMMENT_AVG_STARS, SET_SPECS, SET_COMMENT_PAGE, CLEAR_STATE } from './constants';

export const initialState = {
  product: null,
  specs: [],
  comments: [],
  commentCount: 0,
  commentPage: 1,
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
      case SET_COMMENT_PAGE:
        draft.commentPage = action.payload.commentPage;
        break;
      case SET_COMMENT_AVG_STARS:
        draft.commentAvgStars = action.payload.commentAvgStars;
        break;
      case SET_SPECS:
        draft.specs = action.payload.specs;
        break;
      case CLEAR_STATE:
        draft.product = null;
        draft.specs = [];
        draft.comments = [];
        draft.commentCount = 0;
        draft.commentPage = 1;
        break;
      default:
        break;
    }
  });

export default reducer;
