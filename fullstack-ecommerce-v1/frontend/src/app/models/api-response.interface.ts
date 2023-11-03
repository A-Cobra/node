export interface ApiResponse<T> {
  msg: string;
  success: boolean;
  data?: T;
}
