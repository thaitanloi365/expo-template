import {createRef} from 'react';
import {translate} from '@Utils/I18n/Translate';
import {LoadingRef} from '@Components/Loading';

export const loadingRef = createRef<LoadingRef>();

export const showLoading = (msg = translate('dialog:loading')) => {
  loadingRef.current?.show(msg);
};

export const hideLoading = () => {
  loadingRef.current?.hide();
};
