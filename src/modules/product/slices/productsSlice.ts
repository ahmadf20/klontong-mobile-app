import {createSlice} from '@reduxjs/toolkit';
import {State} from '../../../types/stateTypes';
import {Product} from '../dto/productsDTO';
import {fetchProducts} from '../services/productsServices';

const initialState: State<Product[]> = {
  data: undefined,
  status: 'idle',
  error: null,
  currentPage: 1,
  totalPage: 0,
  filter: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.status = 'idle';
      state.data = undefined;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        const {page = 1} = action.meta.arg ?? {};

        if (page > 1) {
          state.status = 'loadingMore';
        } else if (state.status !== 'idle') {
          state.status = 'refreshing';
        } else {
          state.status = 'loading';
        }
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const {items, count = 0} = action.payload;
        const {limit = 1, page = 1} = action.meta.arg ?? {};

        if (state.status === 'refreshing') {
          state.data = undefined;
        }

        if (count > 0) {
          state.totalPage = Math.ceil(count / limit);
        }

        state.status = 'succeeded';
        state.totalItem = count;
        state.currentPage = page;
        state.data = [...(state.data ?? []), ...(items ?? [])];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const productsReducer = productsSlice.reducer;
export const {setFilter} = productsSlice.actions;
