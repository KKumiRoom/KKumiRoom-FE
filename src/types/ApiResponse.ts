export type ApiResponse<T = unknown> = {
  code: number;
  status: string;
  message: string;
  data?: T;
};
