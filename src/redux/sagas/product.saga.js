import { put, takeEvery, debounce } from "redux-saga/effects";
import axios from "axios";

import { PRODUCT_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getProductListSaga(action) {
  try {
    const { page, limit, more, categoryId, searchKey, sort } = action.payload;
    // const sortParam = sort && {
    //   _sort: sort.split(".")[0],
    //   _order: sort.split(".")[1],
    // };
    const result = yield axios.get("http://localhost:4000/products", {
      params: {
        // relationships
        _expand: "category",
        _embed: "images",
        // paging
        _page: page,
        _limit: limit,
        // filter
        categoryId: categoryId,
        q: searchKey,
        // ...sortParam,
        ...(sort && {
          _sort: sort.split(".")[0],
          _order: sort.split(".")[1],
        }),
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        data: result.data,
        meta: {
          page: page,
          limit: limit,
          total: parseInt(result.headers["x-total-count"]),
        },
        more: more,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        error: "Lỗi rồi!",
      },
    });
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/products/${id}`, {
      params: {
        _expand: "category",
        _embed: ["images", "reviews"],
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        error: "Lỗi rồi!",
      },
    });
  }
}

function* createProductSaga(action) {
  try {
    const { data, images, callback } = action.payload;
    const result = yield axios.post("http://localhost:4000/products", data);
    for (let i = 0; i < images.length; i++) {
      yield axios.post("http://localhost:4000/images", {
        ...images[i],
        productId: result.data.id,
      });
    }
    yield callback();
    yield put({
      type: SUCCESS(PRODUCT_ACTION.CREATE_PRODUCT),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.CREATE_PRODUCT),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* updateProductSaga(action) {
  try {
    const { id, data, images, initialImageIds, callback } = action.payload;
    const result = yield axios.patch(`http://localhost:4000/products/${id}`, data);
    for (let i = 0; i < images.length; i++) {
      if (!images[i].id) {
        yield axios.post("http://localhost:4000/images", {
          ...images[i],
          productId: result.data.id,
        });
      }
    }
    for (let j = 0; j < initialImageIds.length; j++) {
      const keepImage = images.find(
        (item) => item.id && item.id === initialImageIds[j]
      );
      if (!keepImage) {
        yield axios.delete(
          `http://localhost:4000/images/${initialImageIds[j]}`
        );
      }
    }
    yield callback();
    yield put({
      type: SUCCESS(PRODUCT_ACTION.CREATE_PRODUCT),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.CREATE_PRODUCT),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

export default function* productSaga() {
  yield debounce(
    300,
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST),
    getProductListSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
    getProductDetailSaga
  );
  yield takeEvery(REQUEST(PRODUCT_ACTION.CREATE_PRODUCT), createProductSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.UPDATE_PRODUCT), updateProductSaga);
}
