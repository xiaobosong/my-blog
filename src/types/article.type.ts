export interface ArticleItem {
  id: number;
  browse_count: number;
  created_time: string;
  title: string;
}
export interface SearchParams {
  page?: number;
  pageSize?: number;
  title?: string;
  start_time?: string;
  end_time?: string;
}
