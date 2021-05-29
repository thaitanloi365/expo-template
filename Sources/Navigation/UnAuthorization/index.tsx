import React, {useCallback, useEffect, useState} from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import Login from '@Screens/UnAuthorization/Login';
import VerifyOTP from '@Screens/UnAuthorization/VerifyOTP';
import GetStarted from '@Screens/Authorization/User/GetStarted';
import GooglePlaces from '@Screens/Authorization/GooglePlaces';
import {APP_SCREEN} from '../ScreenTypes';
import {useDispatch, useSelector} from '@Common/Hook';
import {appActions} from '@Store/AppReducer';
import {unwrapResult} from '@reduxjs/toolkit';

const Stack = createNativeStackNavigator();

export const UnAuthorizationStack = () => {
  const {profile, isFirstTime} = useSelector(x => x.app);
  const [loading, setLoading] = useState<boolean>();

  const dispatch = useDispatch();

  const load = useCallback(async () => {
    setLoading(true);
    dispatch(appActions.loadApp())
      .then(unwrapResult)
      .then(response => {
        const [token, theme, isFirstTime] = response;
        return dispatch(appActions.onSetIsFirstTime(isFirstTime));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: true}}
      initialRouteName={
        isFirstTime ? APP_SCREEN.ONBOARDING : profile?.is_first_login ? APP_SCREEN.GET_STARTED : APP_SCREEN.LOGIN
      }>
      <Stack.Screen name={APP_SCREEN.LOGIN} component={Login} />
      <Stack.Screen name={APP_SCREEN.VERIFY_OTP} component={VerifyOTP} />

      <Stack.Screen name={APP_SCREEN.GET_STARTED} component={GetStarted} />

      <Stack.Screen name={APP_SCREEN.GOOGLE_PLACES} component={GooglePlaces} />
    </Stack.Navigator>
  );
};
