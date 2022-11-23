import {createSlice} from '@reduxjs/toolkit';
import {Product} from './dto/productDTO';
import {fetchProducts} from './services/productServices';

// TODO: should be moved to types
type State<T> = {
  data: T;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: State<{products: Array<Product>}> = {
  data: {
    products: [],
  },
  status: 'idle',
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: state => {
      return {
        ...state,
        cartItems: [],
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.products = [...state.data.products, ...action.payload];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const productReducer = cartSlice.reducer;
export const {clearCart} = cartSlice.actions;
