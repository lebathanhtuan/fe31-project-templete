import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import { ORDER_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* orderProductSaga(action) {
  try {
    const { data, products, callback } = action.payload;
    const result = yield axios.post("http://localhost:4000/orders", data);
    for (let i = 0; i < products.length; i++) {
      yield axios.post("http://localhost:4000/orderDetails", {
        orderId: result.data.id,
        productId: products[i].id,
        name: products[i].name,
        price: products[i].price,
        quantity: products[i].quantity,
      });
    }
    yield callback();
    yield put({
      type: SUCCESS(ORDER_ACTION.ORDER_PRODUCT),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(ORDER_ACTION.ORDER_PRODUCT),
      payload: {
        error: "Fail!",
      },
    });
  }
}

function* guestOrderProductSaga(action) {
  try {
    const { products, ...orderData } = action.payload;
    const result = yield axios.post(
      "http://localhost:4000/guestOrders",
      orderData
    );
    for (let i = 0; i < products.length; i++) {
      yield axios.post("http://localhost:4000/guestOrderProducts", {
        guestOrderId: result.data.id,
        ...products[i],
      });
    }
    yield put({
      type: SUCCESS(ORDER_ACTION.GUEST_ORDER_PRODUCT),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(ORDER_ACTION.GUEST_ORDER_PRODUCT),
      payload: {
        error: "Fail!",
      },
    });
  }
}

function* getOrderListSaga(action) {
  try {
    const { userId } = action.payload;
    const result = yield axios.get("http://localhost:4000/orders", {
      params: {
        userId: userId,
        _embed: "orderDetails",
      },
    });
    yield put({
      type: SUCCESS(ORDER_ACTION.GET_ORDER_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(ORDER_ACTION.GET_ORDER_LIST),
      payload: {
        error: "Fail!",
      },
    });
  }
}

export default function* orderSaga() {
  yield takeEvery(REQUEST(ORDER_ACTION.ORDER_PRODUCT), orderProductSaga);
  // yield takeEvery(
  //   REQUEST(ORDER_ACTION.GUEST_ORDER_PRODUCT),
  //   guestOrderProductSaga
  // );
  yield takeEvery(REQUEST(ORDER_ACTION.GET_ORDER_LIST), getOrderListSaga);
}
