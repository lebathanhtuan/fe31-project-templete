import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./redux/reducers/product.reducer";
import categoryReducer from "./redux/reducers/category.reducer";
import commonReducer from "./redux/reducers/common.reducer";

export const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    common: commonReducer,
  },
});
