import { baseURL } from "./config";
import HYRequest from "./request";

export const client = new HYRequest({
  baseURL: baseURL,
  interceptorHooks: {
    requestInterceptor: (config: any) => {
      return config;
    },
    requestInterceptorCatch: (err) => {
      return Promise.reject(err);
    },
    responseInterceptor: (res) => {
      return res;
    },
    responseInterceptorCatch: (err) => {
      return Promise.reject(err);
    },
  },
});
