import {useCallback, useEffect} from 'react';
import {Platform} from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import {EXPO_EXPERIENCE_ID, NOTIFICATION_TYPE_CHAT} from '@Utils/Constants';
import {useDispatch} from '@Common/Hook';
import {appActions} from '@Store/AppReducer';
import {IChatNotificationData} from '@Types';

export type onTapCallback = (data: object) => void;

export type onTokenCallback = (token: string) => void;

export type onMessageCallback = (data: object) => void;

export interface Props {
  onToken: onTokenCallback;
  onTap?: onTapCallback;
  onMessage?: onMessageCallback;
}

async function registerForPushNotificationsAsync() {
  if (Constants.isDevice) {
    const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync({experienceId: EXPO_EXPERIENCE_ID})).data;

    return {token};
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return null;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const usePushNotification = (props: Props) => {
  const {onToken, onTap, onMessage} = props;
  const dispatch = useDispatch();

  const _onTap = useCallback(
    (response: Notifications.NotificationResponse) => {
      console.log('*** _onTap', response.notification.request.content);
      const data = response?.notification?.request?.content?.data;
      if (!data) {
        return;
      }

      switch (data.type) {
        case NOTIFICATION_TYPE_CHAT:
          const {matching_id, swop_id} = data as unknown as IChatNotificationData;
          if (typeof matching_id === 'string' && matching_id !== '' && typeof swop_id === 'string' && swop_id !== '') {
            dispatch(appActions.onClearChatBadgeCount(matching_id));
          }
          break;
      }
    },
    [onTap],
  );

  const _onMessage = useCallback(
    (response: Notifications.Notification) => {
      console.log('*** _onMessage', response);

      const {data} = response.request.content;
      if (!data) {
        return;
      }
    },
    [onMessage],
  );
  useEffect(() => {
    registerForPushNotificationsAsync().then(data => {
      if (data?.token) {
        onToken(data?.token);
      }
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    const notificationListener = Notifications.addNotificationReceivedListener(_onMessage);

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    const responseListener = Notifications.addNotificationResponseReceivedListener(_onTap);

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
};
