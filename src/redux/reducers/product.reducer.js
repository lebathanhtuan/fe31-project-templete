import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  productDetail: {},
  productError: "",
  productLoading: false,
};

const productReducer = createReducer(initialState, {
  GET_PRODUCT_LIST_REQUEST: (state, action) => {
    return {
      ...state,
      productLoading: true,
    };
  },
  GET_PRODUCT_LIST_SUCCESS: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      productList: data,
      productLoading: false,
    };
  },
  GET_PRODUCT_LIST_FAIL: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      productError: error,
      productLoading: false,
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
