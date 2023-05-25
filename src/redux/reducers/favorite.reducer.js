import { createReducer } from "@reduxjs/toolkit";
import { FAVORITE_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  favoriteList: {
    data: [],
    load: false,
    error: "",
  },
};

const favoriteReducer = createReducer(initialState, {
  [REQUEST(FAVORITE_ACTION.GET_FAVORITE_LIST)]: (state, action) => {
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,
        load: true,
      },
    };
  },
  [SUCCESS(FAVORITE_ACTION.GET_FAVORITE_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,
        data: data,
        load: false,
      },
    };
  },
  [FAIL(FAVORITE_ACTION.GET_FAVORITE_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,
        load: false,
        error: error,
      },
    };
  },
});

export default favoriteReducer;
