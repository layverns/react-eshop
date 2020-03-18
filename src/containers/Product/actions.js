import { FETCH_PRODUCT, SET_PRODUCT, SET_SPECS, FETCH_COMMENTS, SET_COMMENTS, SET_COMMENT_COUNT, SET_COMMENT_AVG_STARS } from './constants';

export function fetchProduct(id) {
  return {
    type: FETCH_PRODUCT,
    payload: {
      id,
    },
  };
}

export function fetchComments(id) {
  return {
    type: FETCH_COMMENTS,
    payload: {
      id,
    },
  };
}

export function setComments(comments) {
  return {
    type: SET_COMMENTS,
    payload: {
      comments,
    },
  };
}

export function setCommentCount(commentCount) {
  return {
    type: SET_COMMENT_COUNT,
    payload: {
      commentCount,
    },
  };
}

export function setCommentAvgStars(commentAvgStars) {
  return {
    type: SET_COMMENT_AVG_STARS,
    payload: {
      commentAvgStars,
    },
  };
}

export function setProduct(product) {
  return {
    type: SET_PRODUCT,
    payload: {
      product,
    },
  };
}

export function setSpecs(specs) {
  return {
    type: SET_SPECS,
    payload: {
      specs,
    },
  };
}
