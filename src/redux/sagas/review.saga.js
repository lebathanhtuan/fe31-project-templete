import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { REVIEW_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getReviewListSaga(action) {
  try {
    const { productId } = action.payload;
    const result = yield axios.get("http://localhost:4000/reviews", {
      params: {
        // relationships
        _expand: "user",
        _sort: "id",
        _order: "desc",
        // filter
        productId: productId,
      },
    });
    yield put({
      type: SUCCESS(REVIEW_ACTION.GET_REVIEW_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(REVIEW_ACTION.GET_REVIEW_LIST),
      payload: {
        error: "Lỗi rồi!",
      },
    });
  }
}

function* sendReviewSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post("http://localhost:4000/reviews", data);
    yield callback();
    yield put({
      type: SUCCESS(REVIEW_ACTION.SEND_REVIEW),
      payload: {
        data: result.data,
      },
    });
    yield put({
      type: REQUEST(REVIEW_ACTION.GET_REVIEW_LIST),
      payload: {
        productId: data.productId,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(REVIEW_ACTION.SEND_REVIEW),
      payload: {
        error: "Lỗi rồi!",
      },
    });
  }
}

export default function* productSaga() {
  yield takeEvery(REQUEST(REVIEW_ACTION.GET_REVIEW_LIST), getReviewListSaga);
  yield takeEvery(REQUEST(REVIEW_ACTION.SEND_REVIEW), sendReviewSaga);
}
