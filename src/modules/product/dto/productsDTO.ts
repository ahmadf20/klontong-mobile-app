import {Pagination, PaginationParams} from '../../../types/paginationType';

export type Product = {
  name: string;
  image: string;
  sku: number;
  description: string;
  price: string;
  id: string;
};

export type ProductsResponse = Pagination<Product>;
export type ProductsRequest = PaginationParams;
