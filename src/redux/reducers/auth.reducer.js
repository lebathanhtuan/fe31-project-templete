import { createReducer } from "@reduxjs/toolkit";

import { AUTH_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  userInfo: {
    data: {},
    load: false,
    error: "",
  },
  loginData: {
    load: false,
    error: "",
  },
  registerData: {
    load: false,
    error: "",
  },
};

const authReducer = createReducer(initialState, {
  // LOGIN
  [REQUEST(AUTH_ACTION.LOGIN)]: (state, action) => {
    return {
      ...state,
      loginData: {
        ...state.loginData,
        load: true,
        error: "",
      },
    };
  },
  [SUCCESS(AUTH_ACTION.LOGIN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data: data,
        load: false,
      },
    };
  },
  [FAIL(AUTH_ACTION.LOGIN)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      loginData: {
        ...state.loginData,
        load: false,
        error: error,
      },
    };
  },
  // REGISTER
  [REQUEST(AUTH_ACTION.REGISTER)]: (state, action) => {
    return {
      ...state,
      registerData: {
        ...state.registerData,
        load: true,
        error: "",
      },
    };
  },
  [SUCCESS(AUTH_ACTION.REGISTER)]: (state, action) => {
    return {
      ...state,
      registerData: {
        ...state.registerData,
        load: false,
      },
    };
  },
  [FAIL(AUTH_ACTION.REGISTER)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      registerData: {
        ...state.registerData,
        load: false,
        error: error,
      },
    };
  },
});

export default authReducer;
