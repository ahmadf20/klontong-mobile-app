export type State<T> = {
  data: T | undefined;
  status:
    | 'idle'
    | 'loading'
    | 'succeeded'
    | 'failed'
    | 'refreshing'
    | 'loadingMore';
  error: string | null;
  currentPage?: number;
  totalPage?: number;
  totalItem?: number;
};
