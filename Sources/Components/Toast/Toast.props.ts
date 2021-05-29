import {IconTypes} from '@Assets/Icons';

export type ToastType = 'info' | 'success' | 'error';

export interface ToastConfig {
  message: string;
  title?: string;
  position?: 'bottom' | 'top';
  topOffset?: number;
  bottomOffset?: number;
  visibilityTime?: number;
  type: ToastType;
}

export const DefaultConfig: ToastConfig = {
  message: '',
  title: '',
  position: 'top',
  bottomOffset: 0,
  topOffset: 0,
  visibilityTime: 4000,
  type: 'info',
};

export const colors = {
  white: '#FFF',
  blazeOrange: '#FE6301',
  mantis: '#69C779',
  alto: '#D8D8D8',
  dustyGray: '#979797',
  lightSkyBlue: '#87CEFA',
};

export const toastTypeIcon: {[key in ToastType]: IconTypes} = {
  info: 'toast_info',
  error: 'toast_error',
  success: 'toast_success',
};
