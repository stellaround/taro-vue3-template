import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'taro-axios';
import axios from 'taro-axios';
import router from '../router';
import { clearUserInfo } from './methods';

export interface ResponseBody<T = any> {
  code: number;
  data?: T;
  msg: string;
}

const instance = axios.create({
  baseURL: '/api',
  timeout: 60000,
});

const durationTime = 3;

export const dealResponseCorrect = (response: any) => {
  showToast({
    title: response.data.msg,
    duration: durationTime,
  });
};

const requestHandler = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const token = '***';
  if (token && !config.headers.get('Authorization')) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
};

const responseHandler = (response: any): ResponseBody<any> | AxiosResponse<any> | Promise<any> | any => {
  const hasChildrenPropData = Object.prototype.hasOwnProperty.call(response.data, 'data');
  const returnData = hasChildrenPropData ? response.data.data : response.data;

  if (['blob', 'arraybuffer'].includes(response.request.responseType)) {
    return returnData;
  }
  if (response.data.code === 0) {
    return returnData;
  }
  // 有一些错误返回的code是正常的，所以需要在成功请求拦截器里面拦截，疑问？
  else {
    dealResponseCorrect(response);
    return Promise.reject(response);
  }
};

export const dealResponseError = async (status: number, _code: number, msg?: string) => {
  switch (status) {
    case 401:
      showToast({
        title: '登录状态已过期，请重新登录',
        duration: durationTime,
      });
      clearUserInfo();
      await router.push({
        path: '/login',
        query: {
          redirect: router.currentRoute.value.path,
        },
      });

      break;
    case 400:
      showToast({
        title: msg as string,
        duration: durationTime,
      });
      break;
    case 403:
      showToast({
        title: '当前操作没有权限',
        duration: durationTime,
      });
      break;
    case 500:
      showToast({
        title: '服务器内部错误，无法完成请求',
        duration: durationTime,
      });
      break;
    default:
      showToast({
        title: '系统未知错误，请反馈给管理员',
        duration: durationTime,
      });
      break;
  }
};

const errorHandler = async (error: AxiosError): Promise<any> => {
  if (error.response) {
    const { status } = error.response as AxiosResponse<ResponseBody>;
    const code = (error.response.data as { code: number }).code;
    const msg = (error.response.data as { msg: string }).msg;
    await dealResponseError(status, code, msg);
  }
  return Promise.reject(error);
};

instance.interceptors.request.use(requestHandler);

instance.interceptors.response.use(responseHandler, errorHandler);

export default instance;

export const useGet = <R = any, T = any>(url: string, params?: T, config?: AxiosRequestConfig): Promise<R> => {
  return instance.request<any, R>({
    url,
    params,
    method: 'GET',
    ...config,
  });
};

export const usePost = <R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> => {
  return instance.request<any, R>({
    url,
    data,
    method: 'POST',
    ...config,
  });
};

export const usePut = <R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>> => {
  return instance.request({
    url,
    data,
    method: 'PUT',
    ...config,
  });
};

export const useDelete = <R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>> => {
  return instance.request({
    url,
    data,
    method: 'DELETE',
    ...config,
  });
};
