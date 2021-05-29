import axios, {AxiosError, AxiosRequestConfig, Canceler} from 'axios';
import {cloneDeep} from 'lodash';
import * as pathToRegexp from 'path-to-regexp';
import config from '@Config';
import {showToastError} from '@Utils/Toast';
import {store} from '@Store/Store';
import {appActions} from '@Store/AppReducer';
import {translate} from '@Utils/I18n';

export const CANCEL_REQUEST_MESSAGE = 'cancel request';

const errorCodes = [400, 401, 403, 404, 422, 500, 502, 503, 504];
const codeMessage: {[key: number]: string} = {};

errorCodes.forEach(code => {
  codeMessage[code] = translate(`error:${code}`);
});

const request = (url: string, options: AxiosRequestConfig & {isAuthorized?: boolean}) => {
  const {data, params, baseURL = config?.apiUrl, isAuthorized = true, method, headers} = options;

  const value = method === 'GET' ? params : data;
  const cloneData = cloneDeep(value);

  try {
    let domain = '';
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/);
    if (urlMatch) {
      [domain] = urlMatch;
      url = url.slice(domain.length);
    }

    const match = pathToRegexp.parse(url);
    url = pathToRegexp.compile(url)(value);

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name];
      }
    }

    url = domain + url;
  } catch (e) {
    showToastError(e.message);
  }

  options.headers = {
    isAuthorized,
    ...headers,
  };

  options.url = url;
  if (method === 'GET') {
    options.params = cloneData;
  } else {
    options.data = cloneData;
    options.params = params;
    // if (isFormData) {
    //   const {files, ...params} = data;
    //   options.data = files;
    //   options.params = params;
    // } else {
    //   options.data = cloneData;
    // }
  }
  options.baseURL = baseURL;

  return axios(options)
    .then(response => {
      const {statusText, status, data} = response;

      let result = {};
      if (typeof data === 'object') {
        result = data;
        if (Array.isArray(data)) {
          // @ts-ignore
          result.list = data;
        }
      } else {
        // @ts-ignore
        result.data = data;
      }

      const res = {
        success: true,
        message: statusText,
        statusCode: status,
        data: result,
      };

      return Promise.resolve(res);
    })
    .catch((error: AxiosError) => {
      const {response, message} = error;

      if (String(message) === CANCEL_REQUEST_MESSAGE) {
        return Promise.reject({
          success: false,
        });
      }

      let msg;
      let statusCode;

      if (response && response instanceof Object) {
        const {data, statusText} = response;
        statusCode = response.status;

        // @ts-ignore
        msg = data.message || codeMessage[statusCode] || statusText;
        if (data.code) {
          msg = `[${data.code}] ${msg}`;
        }
      } else {
        statusCode = 600;
        msg = error.message || 'Network Error';
      }
      if (statusCode === 401 || statusCode === 403) {
        showToastError(translate(`error:${statusCode}`));
        store.dispatch(appActions.onLogout());
      }

      /* eslint-disable */
      return Promise.reject({
        success: false,
        statusCode,
        message: msg,
      });
    });
};

axios.interceptors.request.use(
  config => {
    const token = store.getState().app.token;
    if (config.headers.isAuthorized && typeof token === 'string' && token !== '') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    delete config.headers['isAuthorized'];

    if (__DEV__) {
      const {url, method, data, params, baseURL, headers} = config;
      const message = `👉👉👉
Request Info: ${baseURL || ''}${url}
  - Method : ${method}
  - Body   : ${JSON.stringify(data)}
  - Params : ${JSON.stringify(params)}
  - Headers: ${JSON.stringify(headers)}
  `;
      console.log(message);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => {
    if (__DEV__) {
      const {data: responseData, config, status} = response;
      const {url, method, data, params} = config;
      const message = `👉👉👉
Response info: ${url}
  - Method : ${method}
  - Status : ${status}
  - Body   : ${JSON.stringify(responseData)}
  - Params : ${JSON.stringify(params)}
  - Response Data: ${data}
  `;
      console.log(message);
    }
    return response;
  },
  error => {
    if (__DEV__) {
      const message = `👉👉👉
Response error: ${error}
  `;
      console.log(message);
    }

    return Promise.reject(error);
  },
);
export default request;
