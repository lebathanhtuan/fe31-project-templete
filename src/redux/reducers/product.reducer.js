import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  productDetail: {},
};

const productReducer = createReducer(initialState, {
  GET_PRODUCT_LIST: (state, action) => {
    console.log("GET_PRODUCT_LIST");
    console.log("state", state);
    console.log("action", action);
    // get list
    return {
      ...state,
      productList: action.payload,
    };
  },
  GET_PRODUCT_DETAIL: (state, action) => {
    // get detail
    return {
      ...state,
      // productDetail
    };
  },
});

export default productReducer;
