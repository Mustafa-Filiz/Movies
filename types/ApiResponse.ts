export interface Dates {
  maximum: string;
  minimum: string;
}

export interface ApiResponse<T> {
  dates: Dates;
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
