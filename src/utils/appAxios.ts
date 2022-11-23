import axios from 'axios';

export const appAxios = axios.create({
  baseURL: 'https://637e23df9c2635df8f9a3ec6.mockapi.io/api/v1',
});
