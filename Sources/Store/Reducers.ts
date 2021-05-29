import {AnyAction, combineReducers, Reducer} from '@reduxjs/toolkit';
import {appReducer} from './AppReducer';
import {loginReducer} from '@Screens/UnAuthorization/Login/Redux';
import {otpReducer} from '@Screens/UnAuthorization/VerifyOTP/Redux';
import {userHomeReducer} from '@Screens/Authorization/User/Home/Redux';
import {userChatReducer} from '@Screens/Authorization/User/Chat/Redux';
import {profileReducer} from '@Screens/Authorization/User/Profile/Redux';
import {getStartedReducer} from '@Screens/Authorization/User/GetStarted/Redux';
import {SLICE_NAME} from '@Utils/Constants';

export const rootReducer: Reducer = (state: any, action: AnyAction): any => {
  if (action.type === `${SLICE_NAME.USER_PROFILE}/logOutAppUser/fulfilled`) {
    return reducers(undefined, action);
  }
  if (action.type === `${SLICE_NAME.APP}/onLogout`) {
    return reducers(undefined, action);
  }
  return reducers(state, action);
};

export const reducers = combineReducers({
  //Auth
  app: appReducer,
  login: loginReducer,
  otp: otpReducer,

  //App
  userHome: userHomeReducer,
  userChat: userChatReducer,
  profile: profileReducer,
  userGetStarted: getStartedReducer,
});
