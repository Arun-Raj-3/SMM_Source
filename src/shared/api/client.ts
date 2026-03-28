import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL ?? '/api/v1';

export const apiClient = axios.create({
  baseURL,
  timeout: 30_000,
});

export type ApiClientResponse<T> = {
  data: T;
};

