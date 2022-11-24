import {createSlice} from '@reduxjs/toolkit';
import {State} from '../../types/stateTypes';
import {ProductResponse} from './dto/productDTO';
import {fetchProduct} from './services/productsServices';

const initialState: State<ProductResponse> = {
  data: undefined,
  status: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProduct.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const productReducer = productSlice.reducer;
export const {} = productSlice.actions;
