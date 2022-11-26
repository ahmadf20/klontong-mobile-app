export type Pagination<T> = {
  items?: T[];
  count?: number;
};

export type PaginationParams = {
  page: number;
  limit: number;
};
