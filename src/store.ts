import {configureStore} from '@reduxjs/toolkit';
import {productReducer} from './modules/product/slices/productSlice';
import {productsReducer} from './modules/product/slices/productsSlice';

const createDebugger = require('redux-flipper').default;

const reducers = {
  products: productsReducer,
  product: productReducer,
};

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(createDebugger()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
