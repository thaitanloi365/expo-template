import {createRef} from 'react';
import {ToastRef} from '@Components/Toast';

export const toastRef = createRef<ToastRef>();

export const showToastInfo = (message: string, title = '') => {
  toastRef.current?.show({
    message,
    title,
    type: 'info',
  });
};

export const showToastError = (message: string, title = '') => {
  toastRef.current?.show({
    message,
    title,
    type: 'error',
    visibilityTime: 5000,
  });
};
