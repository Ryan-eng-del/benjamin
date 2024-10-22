import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

interface InterceptorHooks {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (response: AxiosResponse) => AxiosResponse;
  responseInterceptorCatch?: (error: any) => any;
}

interface RequestConfig extends AxiosRequestConfig {
  interceptorHooks?: InterceptorHooks;
}

class Request {
  config: AxiosRequestConfig;
  interceptorHooks?: InterceptorHooks;
  instance: AxiosInstance;

  constructor(options: RequestConfig) {
    this.config = options;
    this.interceptorHooks = options.interceptorHooks;
    this.instance = axios.create(options);
    this.setupInterceptor();
  }

  setupInterceptor(): void {
    this.instance.interceptors.request.use(
      this.interceptorHooks?.requestInterceptor as any,
      this.interceptorHooks?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptorHooks?.responseInterceptor,
      this.interceptorHooks?.responseInterceptorCatch
    );
  }

  request<T = any>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res: any) => {
          if (res.status && ![204, 201, 200].includes(res.status)) {
            return reject(res);
          } else {
            return resolve(res.data);
          }
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  requestReturnHeader<T = any>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res: any) => {
          if (res.status && ![204, 201, 200].includes(res.status)) {
            return reject(res);
          } else {
            return resolve(res);
          }
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  get<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: "GET" });
  }

  getReturnHeader<T = any>(config: RequestConfig): Promise<T> {
    return this.requestReturnHeader({ ...config, method: "GET" });
  }
  post<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: "POST" });
  }

  delete<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: "DELETE" });
  }

  put<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: "PUT" });
  }

  patch<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: "PATCH" });
  }
}

export default Request;
