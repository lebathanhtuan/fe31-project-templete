import { createReducer } from "@reduxjs/toolkit";

import { CART_ACTION, ORDER_ACTION, REQUEST, SUCCESS } from "../constants";

const initialState = {
  cartList: JSON.parse(localStorage.getItem("cartList")) || [],
};

const cartReducer = createReducer(initialState, {
  // ADD_TO_CART
  [REQUEST(CART_ACTION.ADD_TO_CART)]: (state, action) => {
    const { id, quantity } = action.payload;
    const newCartList = [...state.cartList];
    const existIndex = state.cartList.findIndex((item) => item.id === id);
    if (existIndex !== -1) {
      newCartList.splice(existIndex, 1, {
        ...state.cartList[existIndex],
        quantity: state.cartList[existIndex].quantity + quantity,
      });
    } else {
      newCartList.unshift(action.payload);
    }
    localStorage.setItem("cartList", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: newCartList,
    };
  },
  // UPDATE_CART_ITEM
  [REQUEST(CART_ACTION.UPDATE_CART_ITEM)]: (state, action) => {
    const { id, quantity } = action.payload;
    const newCartList = [...state.cartList];
    const productIndex = state.cartList.findIndex((item) => item.id === id);
    newCartList.splice(productIndex, 1, {
      ...state.cartList[productIndex],
      quantity: quantity,
    });
    localStorage.setItem("cartList", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: newCartList,
    };
  },
  // DELETE_CART_ITEM
  [REQUEST(CART_ACTION.DELETE_CART_ITEM)]: (state, action) => {
    const { id } = action.payload;
    const newCartList = [...state.cartList];
    const productIndex = state.cartList.findIndex((item) => item.id === id);
    newCartList.splice(productIndex, 1);
    // Cách 2
    // const newCartList = state.cartList.filter((item) => item.id !== id)
    localStorage.setItem("cartList", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: newCartList,
    };
  },
  [SUCCESS(ORDER_ACTION.ORDER_PRODUCT)]: (state, action) => {
    localStorage.removeItem("cartList");
    return {
      ...state,
      cartList: [],
    };
  },
});

export default cartReducer;
