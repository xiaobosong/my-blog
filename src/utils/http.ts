import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
import { message } from "antd";
import {
  CommonResponse,
  HTTPMethod,
  RspStatusCode,
} from "../types/common.type";
import { cleanEmptyObj } from "./object";

export class Request {
  static singletonHttpInstance: Request | null = null;

  private baseURL: string = "http://localhost:3000/api";

  private defaultTimeout = 300_000;

  private defaultHeader: AxiosRequestHeaders = {
    "Content-Type": "application/json;charset=UTF-8",
  };

  constructor(baseURL?: string) {
    if (baseURL && baseURL !== this.baseURL) {
      Request.singletonHttpInstance = null;
      this.baseURL = baseURL;
    }

    if (Request.singletonHttpInstance) {
      return Request.singletonHttpInstance;
    }

    axios.defaults.withCredentials = true;

    /** 请求拦截器  */
    axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    /** 响应拦截器  */
    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.data.code) {
          return response;
        }

        // 未登录
        if (response.data.code === "401") {
          window.location.replace("/sign");
        }

        return Promise.reject(response.data.message);
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    Request.singletonHttpInstance = this;
    return Request.singletonHttpInstance;
  }

  /**
   *
   * @param url 请求地址
   * @param method 请求方法
   * @param data 请求体
   * @param header 请求头
   * @param timeout 请求超时时间
   * @returns {Promise<AxiosResponse<T>>}
   */
  public sendReq<T>(
    url: string,
    method: HTTPMethod,
    data?: { [key: string]: any },
    type?: boolean,
    option?: AxiosRequestConfig
  ): Promise<null | CommonResponse<T>> {
    const sendUrl = `${this.baseURL}${url}`;
    const currentTimeout: number = this.defaultTimeout;
    const currentHeader: AxiosRequestHeaders = this.defaultHeader;
    let responsePromise: Promise<null | CommonResponse<T>> = new Promise(
      () => {}
    );

    const config = {
      headers: { ...currentHeader, ...(option && option?.headers) },
      timeout: (option && option?.timeout) || currentTimeout,
    };

    const requestData = data && !type ? cleanEmptyObj(data) : data;

    console.log(`请求：${sendUrl}`, requestData);

    if (requestData && (requestData.$userId || requestData.$userName)) {
      const userInfo = window.localStorage.getItem("user");
      const { userId, name, username } = JSON.parse(userInfo || "{}");
      if (userId && requestData.$userId) {
        requestData[requestData.$userId] = userId;
        delete requestData.$userId;
      }

      if (name && requestData.$userName) {
        requestData[requestData.$userName] = name;
        delete requestData.$userName;
      }

      if (username && requestData.$userCode) {
        requestData[requestData.$userCode] = username;
        delete requestData.$userCode;
      }
    }

    switch (method) {
      case HTTPMethod.GET:
        responsePromise = axios
          .get<CommonResponse<T>>(sendUrl, {
            ...config,
            params: requestData,
          })
          .then((response) => {
            return response.data;
          })
          .catch((error: any) => {
            console.log("POST =======", error);
            message.error(JSON.stringify(error.message || error));
            return null;
          });
        break;
      case HTTPMethod.PUT:
      case HTTPMethod.POST:
        responsePromise = axios
          .post<CommonResponse<T>>(sendUrl, requestData, {
            ...config,
          })
          .then((response) => {
            return response.data;
          })
          .catch((error: any) => {
            console.log("POST =======", error);
            let msg = "服务异常";
            if (error) {
              msg =
                typeof error === "string"
                  ? error
                  : error.message || JSON.stringify(error);
            }
            message.error(msg);
            return null;
          });
        break;
      default:
        break;
    }
    return responsePromise;
  }
}

export default new Request();
