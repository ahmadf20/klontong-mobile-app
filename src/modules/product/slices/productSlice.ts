import {createSlice} from '@reduxjs/toolkit';
import {State} from '../../../types/stateTypes';
import {ProductResponse} from '../dto/productDTO';
import {fetchProduct} from '../services/productsServices';

const initialState: State<ProductResponse[]> = {
  data: undefined,
  status: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProduct.pending, state => {
        if (state.status !== 'idle') {
          state.status = 'refreshing';
        } else {
          state.status = 'loading';
        }
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        if (state.status === 'refreshing') {
          state.data = undefined;
        }

        state.status = 'succeeded';
        state.data = [...(state?.data ?? []), action.payload];
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const productReducer = productSlice.reducer;
export const {} = productSlice.actions;
