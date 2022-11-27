import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from '../modules/auth/slices/authSlice';
import {categoriesReducer} from '../modules/product/slices/categoriesSlice';
import {productReducer} from '../modules/product/slices/productSlice';
import {productsReducer} from '../modules/product/slices/productsSlice';

const createDebugger = require('redux-flipper').default;

const reducers = {
  categories: categoriesReducer,
  products: productsReducer,
  product: productReducer,
  auth: authReducer,
};

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(createDebugger()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
