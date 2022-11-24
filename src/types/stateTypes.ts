export type State<T> = {
  data: T | undefined;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};
