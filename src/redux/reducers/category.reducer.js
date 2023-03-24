import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  categoryList: [],
};

const categoryReducer = createReducer(initialState, {
  GET_CATEGORY_LIST: (state, action) => {
    // get list
    return {
      ...state,
      // categoryList
    };
  },
});

export default categoryReducer;
