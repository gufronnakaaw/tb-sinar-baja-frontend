export type GlobalResponse<T> = {
  success: boolean;
  status_code: boolean;
  data: T;
};
