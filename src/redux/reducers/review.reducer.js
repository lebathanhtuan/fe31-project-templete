import { createReducer } from "@reduxjs/toolkit";

import { REVIEW_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  reviewList: {
    data: [],
    load: false,
    error: "",
  },
  sendReviewData: {
    load: false,
    error: "",
  },
};

const reviewReducer = createReducer(initialState, {
  // GET_REVIEW_LIST
  [REQUEST(REVIEW_ACTION.GET_REVIEW_LIST)]: (state, action) => {
    return {
      ...state,
      reviewList: {
        ...state.reviewList,
        load: true,
      },
    };
  },
  [SUCCESS(REVIEW_ACTION.GET_REVIEW_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      reviewList: {
        ...state.reviewList,
        data: data,
        load: false,
      },
    };
  },
  [FAIL(REVIEW_ACTION.GET_REVIEW_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      reviewList: {
        ...state.reviewList,
        load: false,
        error: error,
      },
    };
  },
  // SEND_REVIEW
  [REQUEST(REVIEW_ACTION.SEND_REVIEW)]: (state, action) => {
    return {
      ...state,
      sendReviewData: {
        load: true,
        error: "",
      },
    };
  },
  [SUCCESS(REVIEW_ACTION.SEND_REVIEW)]: (state, action) => {
    return {
      ...state,
      sendReviewData: {
        ...state.sendReviewData,
        load: false,
      },
    };
  },
  [FAIL(REVIEW_ACTION.SEND_REVIEW)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      sendReviewData: {
        load: false,
        error: error,
      },
    };
  },
});

export default reviewReducer;
