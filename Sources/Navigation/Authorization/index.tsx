import React from 'react';
import {useSelector} from '@Common/Hook';
import {useDispatch} from 'react-redux';
import {appActions} from '@Store/AppReducer';
import {Platform} from 'react-native';
import {UserAuthorizationStack} from './User';
import {usePushNotification} from '@Common/PushNotification';
import {IAddDeviceForm} from '@Types';

export const AuthorizationStack = () => {
  const dispatch = useDispatch();
  const {profile} = useSelector(x => x.app);

  const onTokenReceived = (token: string) => {
    const body: IAddDeviceForm = {
      token: token,
      platform: Platform.OS,
    };
    dispatch(appActions.addDevice(body));
  };

  usePushNotification({
    onToken: onTokenReceived,
  });

  return <UserAuthorizationStack />;
};
