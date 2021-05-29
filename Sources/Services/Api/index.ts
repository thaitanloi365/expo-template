import request from '@Utils/Request';
import endpoints from './Endpoints';
import config from '@Config';
import Axios, {Method} from 'axios';
import {store} from '@Store/Store';

export interface ApiResponse<T = {}> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

type Option = {
  headers?: {[key: string]: any};
  params?: object;
};
const gen = (params: string, baseURL = config?.apiUrl) => {
  let url = params;
  let method: Method = 'GET';

  const paramsArray = params.split(' ');
  if (paramsArray.length === 2) {
    method = paramsArray[0] as Method;
    url = paramsArray[1];
  }

  return function (data: any, options: Option) {
    return request(url, {
      data: method === 'GET' ? null : data,
      method,
      params: options?.params ? options?.params : method === 'GET' ? data : null,
      baseURL,
      headers: options?.headers,
    });
  };
};

type APIMap = {
  [key in keyof typeof endpoints]: <T>(data?: any, option?: Option) => Promise<ApiResponse<T>>;
};

const Api = {};
for (const key in endpoints) {
  switch (key) {
    case 'LIST_CHAT_MESSAGE':
    case 'GET_MATCHING_DETAILS':
    case 'SEND_CHAT_MESSAGE':
      // @ts-ignore
      Api[key] = gen(endpoints[key] as string, config.chatApiUrl);
      break;
    default:
      // @ts-ignore
      Api[key] = gen(endpoints[key] as string);
  }
}

export default Api as APIMap;
