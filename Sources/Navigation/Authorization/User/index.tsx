import React, {useEffect} from 'react';
import {APP_SCREEN} from '@Navigation/ScreenTypes';
import TabsScreen from './TabsScreen';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import GooglePlaces from '@Screens/Authorization/GooglePlaces';
import {useSelector} from '@Common/Hook';
import ChatUSer from '@Screens/Authorization/User/Chat';
import {changeLanguage} from '@Utils/I18n';

const Stack = createNativeStackNavigator();

export const UserAuthorizationStack = () => {
  const {profile, isFirstTime} = useSelector(x => x.app);

  useEffect(() => {
    changeLanguage(profile?.language);
  }, [profile?.language]);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: true}}
      initialRouteName={
        isFirstTime ? APP_SCREEN.GET_STARTED : profile?.is_first_login ? APP_SCREEN.ONBOARDING : APP_SCREEN.USER_TABS
      }>
      <Stack.Screen name={APP_SCREEN.USER_TABS} component={TabsScreen} />

      <Stack.Screen name={APP_SCREEN.USER_CHAT} component={ChatUSer} />

      <Stack.Screen name={APP_SCREEN.GOOGLE_PLACES} component={GooglePlaces} />
    </Stack.Navigator>
  );
};
