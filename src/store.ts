import {configureStore} from '@reduxjs/toolkit';
import {productReducer} from './modules/product/slices/productSlice';
import {productsReducer} from './modules/product/slices/productsSlice';

// const middlewares = [];

// if (__DEV__) {
//   const createDebugger = require('redux-flipper').default;
//   middlewares.push(createDebugger());
// }

const reducers = {
  products: productsReducer,
  product: productReducer,
};

export const store = configureStore({
  reducer: reducers,
  // middleware: middlewares,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
