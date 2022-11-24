import {createSlice} from '@reduxjs/toolkit';
import {State} from '../../../types/stateTypes';
import {ProductsResponse} from '../dto/productsDTO';
import {fetchProducts} from '../services/productsServices';

const initialState: State<ProductsResponse> = {
  data: undefined,
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        if (state.status !== 'idle') {
          state.status = 'refreshing';
        } else {
          state.status = 'loading';
        }
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (state.status === 'refreshing') {
          state.data = undefined;
        }

        state.status = 'succeeded';
        state.data = {
          ...state.data,
          items: [
            ...(state.data?.items ?? []),
            ...(action.payload.items ?? []),
          ],
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const productsReducer = productsSlice.reducer;
export const {} = productsSlice.actions;
