import {createSlice} from '@reduxjs/toolkit';
import {State} from '../../../types/stateTypes';
import {ProductResponse} from '../dto/productDTO';
import {postProduct} from '../services/productsServices';

const initialState: State<ProductResponse> = {
  data: undefined,
  status: 'idle',
  error: null,
};

const addProductSlice = createSlice({
  name: 'addProduct',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postProduct.pending, state => {
        state.status = 'loading';
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(postProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const addProductReducer = addProductSlice.reducer;
export const {} = addProductSlice.actions;
