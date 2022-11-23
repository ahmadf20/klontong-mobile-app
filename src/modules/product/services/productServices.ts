import {createAsyncThunk} from '@reduxjs/toolkit';
import {appAxios} from '../../../utils/appAxios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (name, thunkAPI) => {
    try {
      const res = await appAxios('/products', {
        params: {
          page: 1,
          limit: 10,
        },
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  },
);
