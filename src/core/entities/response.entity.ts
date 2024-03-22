export interface PaginatedResponse<T> {
  pagination: {
    limit: number;
    page: number;
    count: number;
  };
  data: T[];
}
