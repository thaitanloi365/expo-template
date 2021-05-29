import * as React from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {AuthorizationStack} from './Authorization/index';
import {APP_SCREEN, RootStackParamList} from './ScreenTypes';
import {UnAuthorizationStack} from './UnAuthorization/index';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = ({token}: {token: string}) => {
  const isLogged = typeof token === 'string' && token !== '';

  return (
    <>
      <StatusBar barStyle="light-content" />
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isLogged ? (
          <RootStack.Screen
            options={{gestureEnabled: false}}
            name={APP_SCREEN.AUTHORIZE}
            component={AuthorizationStack}
          />
        ) : (
          <RootStack.Screen
            options={{replaceAnimation: 'pop', gestureEnabled: false}}
            name={APP_SCREEN.UN_AUTHORIZE}
            component={UnAuthorizationStack}
          />
        )}
      </RootStack.Navigator>
    </>
  );
};
