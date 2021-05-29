import React, {useCallback, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './NavigationService';
import {RootNavigation} from './RootNavigator';
import {toastRef} from '@Utils/Toast';
import {loadingRef} from '@Utils/Loading';
import {MyAppTheme, ThemeType} from '@Themes';
import {ActivityIndicator, View} from 'react-native';
import {useDispatch, useSelector} from '@Common/Hook';
import Loading from '@Components/Loading';
import Toast from '@Components/Toast';
import {appActions} from '@Store/AppReducer';
import {unwrapResult} from '@reduxjs/toolkit';
import {ILang, ITrackUserForm} from '@Types';
import {getAppVersion, getExpoVersion} from '@Utils/DeviceInfo';
import * as SplashScreen from 'expo-splash-screen';
import {changeLanguage} from '@Utils/I18n';
import Block from '@Components/Block';
import {StatusBar} from 'react-native';
import * as Localization from 'expo-localization';

export const AppContainer = () => {
  const dispatch = useDispatch();
  const {loading, theme, token, profile} = useSelector(x => x.app);

  const performAPICalls = useCallback(async (t: string) => {
    try {
      const trackForm: ITrackUserForm = {
        app_version: getAppVersion(),
        expo_version: getExpoVersion(),
      };

      let promises: Array<Promise<any>> = [dispatch(appActions.getConstants())];

      if (typeof t === 'string' && t !== '') {
        promises = new Array(2);
        promises[0] = dispatch(appActions.trackUser(trackForm));
        promises[1] = dispatch(appActions.getConstants());
      }

      const [profile, ...rest] = await Promise.all(promises);
      let language: ILang = profile?.payload?.data?.language;

      if (
        typeof language !== 'string' ||
        (typeof t === 'string' && t !== '' && profile.payload?.data?.is_first_login)
      ) {
        Localization.getLocalizationAsync().then(({locale}) => {
          language = locale.split('-')[0] as ILang;
          changeLanguage(language);
        });
      } else {
        changeLanguage(language);
      }

      dispatch(appActions.onSetAppProfile(profile?.payload?.data));
    } catch (e) {
      console.warn(e);
    } finally {
    }
  }, []);

  const load = useCallback(async () => {
    dispatch(appActions.loadApp())
      .then(unwrapResult)
      .then(response => {
        const [token, theme, isFirstTime] = response;
        if (token) {
          return Promise.all([
            new Promise<string>((resolve, reject) => resolve(token || '')),
            dispatch(appActions.onSetIsFirstTime(isFirstTime)),
            dispatch(appActions.onSetToken(token)),
            dispatch(appActions.onSetAppTheme(theme as ThemeType)),
            dispatch(appActions.loadChatCounts()),
          ]);
        } else {
          return Promise.all([
            new Promise<string>((resolve, reject) => resolve(token || '')),
            new Promise<string>((resolve, reject) => resolve(isFirstTime)),
            dispatch(appActions.onSetToken(token)),
            dispatch(appActions.onSetAppTheme(theme as ThemeType)),
            dispatch(appActions.onSetIsFirstTime(isFirstTime)),
          ]);
        }
      })
      .then(resp => {
        return performAPICalls(resp[0]);
      })
      .finally(() => {
        SplashScreen.hideAsync();
        dispatch(appActions.onLoadAppEnd());
      });
  }, []);

  useEffect(() => {
    load();
  }, []);

  const renderLoading = () => {
    return (
      <Block block alignItems="center" justifyContent="center">
        <StatusBar barStyle="dark-content" />
        <ActivityIndicator color="black" />
      </Block>
    );
  };

  return (
    <NavigationContainer ref={navigationRef} theme={MyAppTheme[theme]}>
      {loading ? (
        renderLoading()
      ) : (
        <>
          <RootNavigation token={token} />
          <Loading ref={loadingRef} />
          <Toast ref={toastRef} />
        </>
      )}
    </NavigationContainer>
  );
};
