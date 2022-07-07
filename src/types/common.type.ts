export enum HTTPMethod {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

export enum Env {
  DEV = "DEV",
  PRD = "PRD",
}

export enum RspStatusCode {
  SUCCESS = 200,
}

export interface IRestService {
  [key: string]: {
    url: string;
    method: HTTPMethod;
  };
}

export interface CommonResponse<T> {
  code: boolean;
  message: string;
  data: T;
}

export interface ListData<T> {
  list?: T[];
  data?: T[];
  total: number;
  current_page: number;
  page_size: number;
  pageSize?: number;
  page?: number;
}
