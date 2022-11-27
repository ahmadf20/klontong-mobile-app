import {createSlice} from '@reduxjs/toolkit';
import {State} from '../../../types/stateTypes';
import {Category} from '../dto/categoryDTO';
import {fetchCategories} from '../services/productsServices';

const initialState: State<Category[]> = {
  data: undefined,
  status: 'idle',
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const {} = categoriesSlice.actions;
