import {ICoordinate, IResendOTPResponse} from '@Types';

export enum APP_SCREEN {
  // Auth
  UN_AUTHORIZE = 'UN_AUTHORIZE',
  SPLASH = 'SPLASH',
  LOGIN = 'LOGIN',
  VERIFY_OTP = 'VERIFY_OTP',

  AUTHORIZE = 'AUTHORIZE',

  GET_STARTED = 'GET_STARTED',

  ONBOARDING = 'ONBOARDING',

  // User
  USER_TABS = 'USER_TABS',
  USER_HOME = 'USER_HOME',
  USER_PROFILE = 'USER_PROFILE',

  // Chat
  USER_CHAT = 'USER_CHAT',

  // Common
  GOOGLE_PLACES = 'GOOGLE_PLACES',
}

export type RootStackParamList = {
  [APP_SCREEN.UN_AUTHORIZE]: undefined;
  [APP_SCREEN.SPLASH]: undefined;
  [APP_SCREEN.LOGIN]: undefined;
  [APP_SCREEN.VERIFY_OTP]: {phone?: string; email?: string; data: IResendOTPResponse};
  [APP_SCREEN.GET_STARTED]: undefined;
  [APP_SCREEN.ONBOARDING]: undefined;

  [APP_SCREEN.AUTHORIZE]: undefined;

  [APP_SCREEN.USER_HOME]: {coordinate?: ICoordinate};
  [APP_SCREEN.USER_PROFILE]: {coordinate?: ICoordinate};

  [APP_SCREEN.GOOGLE_PLACES]: {fromScreen: APP_SCREEN};

  [APP_SCREEN.USER_CHAT]: {roomID?: string};
};
