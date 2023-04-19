import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { AUTH_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* loginSaga(action) {
  try {
    const result = yield axios.post(
      "http://localhost:4000/login",
      action.payload
    );
    yield put({
      type: SUCCESS(AUTH_ACTION.LOGIN),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.LOGIN),
      payload: {
        error: "Email hoặc password không đúng!",
      },
    });
  }
}

function* registerSaga(action) {
  try {
    const result = yield axios.post(
      "http://localhost:4000/register",
      action.payload
    );
    yield put({
      type: SUCCESS(AUTH_ACTION.REGISTER),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.REGISTER),
      payload: {
        error: e.response.data,
      },
    });
  }
}

export default function* authSaga() {
  yield takeEvery(REQUEST(AUTH_ACTION.LOGIN), loginSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.REGISTER), registerSaga);
}
