export type ApiErrorResponse = {
  code: string;
  message: string;
  details?: unknown;
  requestId?: string;
};

export type ApiSuccessResponse<T> = {
  data: T;
};

