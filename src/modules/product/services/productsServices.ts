import {createAsyncThunk} from '@reduxjs/toolkit';
import {PaginationParams} from '../../../types/paginationType';
import {appAxios} from '../../../utils/appAxios';
import {ProductRequest, ProductResponse} from '../dto/productDTO';
import {ProductsResponse} from '../dto/productsDTO';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (param: PaginationParams | undefined, {rejectWithValue}) => {
    try {
      const res = await appAxios.get<ProductsResponse>('/products', {
        params: {
          page: 1,
          limit: 10,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue('Something went wrong');
    }
  },
);

export const fetchProduct = createAsyncThunk(
  'products/fetchProductById',
  async (request: ProductRequest, {rejectWithValue}) => {
    try {
      const res = await appAxios.get<ProductResponse>(
        `/products/${request.id}`,
      );
      return res.data;
    } catch (error) {
      return rejectWithValue('Something went wrong');
    }
  },
);
