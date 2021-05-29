import React from 'react';
import {Home, Profile} from '@Screens/Authorization/User';
import {APP_SCREEN} from '@Navigation/ScreenTypes';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {AppTheme} from '@Types';
import Icon from '@Components/Icon';
import {IconTypes} from '@Assets/Icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {verticalScale} from '@Common/Scale';

const Tab = createBottomTabNavigator();

interface TabProps {
  name: APP_SCREEN;
  component: any;
  icon: IconTypes;
}
const TABS: Array<TabProps> = [
  {
    name: APP_SCREEN.USER_HOME,
    component: Home,
    icon: 'home',
  },
  {
    name: APP_SCREEN.USER_HOME,
    component: Home,
    icon: 'home',
  },
  {
    name: APP_SCREEN.USER_HOME,
    component: Home,
    icon: 'home',
  },
  {
    name: APP_SCREEN.USER_PROFILE,
    component: Profile,
    icon: 'profile',
  },
  {
    name: APP_SCREEN.USER_PROFILE,
    component: Profile,
    icon: 'profile',
  },
];

const TabsScreen = () => {
  const theme: AppTheme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      lazy
      swipeEnabled={false}
      initialRouteName={APP_SCREEN.USER_HOME}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          const tab = TABS.find(item => item.name === route.name);
          let badgeCount = 0;

          return (
            <Icon
              containerStyle={{marginTop: verticalScale(10)}}
              badgeCount={badgeCount}
              icon={tab?.icon}
              style={{tintColor: color}}
              badgeProps={
                !focused && {
                  borderWidth: 1,
                  borderColor: theme.colors.primary,
                  textColor: theme.colors.primary,
                  backgroundColor: 'white',
                  value: badgeCount,
                }
              }
            />
          );
        },

        tabBarLabel: props => null,
        renderIndicator: () => null,
      })}
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.border,
        showIcon: true,
      }}>
      {TABS.map(item => (
        <Tab.Screen key={`tab_${item.name}`} name={item.name} component={item.component} />
      ))}
    </Tab.Navigator>
  );
};

export default TabsScreen;
