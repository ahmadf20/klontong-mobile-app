import {configureStore} from '@reduxjs/toolkit';
import {productReducer} from './modules/product/cartSlice';

// const middlewares = [];

// if (__DEV__) {
//   const createDebugger = require('redux-flipper').default;
//   middlewares.push(createDebugger());
// }

const reducers = {
  products: productReducer,
};

export const store = configureStore({
  reducer: reducers,
  // middleware: middlewares,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
