import {createAsyncThunk} from '@reduxjs/toolkit';
import {PaginationParams} from '../../../types/paginationType';
import {appAxios} from '../../../utils/appAxios';
import {AddProductRequest, AddProductResponse} from '../dto/addProductDTO';
import {ProductRequest, ProductResponse} from '../dto/productDTO';
import {ProductsResponse} from '../dto/productsDTO';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: PaginationParams | undefined, {rejectWithValue}) => {
    try {
      const res = await appAxios.get<ProductsResponse>('/products', {
        params,
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

export const postProduct = createAsyncThunk(
  'products/postProduct',
  async (data: AddProductRequest, {rejectWithValue}) => {
    try {
      const res = await appAxios.post<AddProductResponse>('/products', data);
      return res.data;
    } catch (error) {
      return rejectWithValue('Something went wrong');
    }
  },
);
