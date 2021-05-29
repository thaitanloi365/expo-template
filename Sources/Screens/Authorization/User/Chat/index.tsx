import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from '@Common/Hook';
import isEqual from 'react-fast-compare';
import {
  GiftedChat,
  IMessage,
  Bubble,
  BubbleProps,
  IChatMessage,
  Actions,
  MessageImage,
  InputToolbar,
} from 'react-native-gifted-chat';
import {userChatActions} from './Redux';
import {APP_SCREEN, RootStackParamList} from '@Navigation/ScreenTypes';
import {StackScreenProps} from '@react-navigation/stack';
import Websocket, {WebsocketRef} from '@Components/Websocket';
import config from '@Config';
import {AppTheme, IChatMessagePagination, IChatMessageWS, IUploadChatImageForm} from '@Types';
import moment from 'moment';
import {unwrapResult} from '@reduxjs/toolkit';
import {appActions} from '@Store/AppReducer';
import {Entypo} from '@expo/vector-icons';
import {useTheme} from '@react-navigation/native';
import {translate} from '@Utils/I18n/Translate';
import * as ImagePicker from 'expo-image-picker';
import * as mime from 'react-native-mime-types';
import {showToastError} from '@Utils/Toast';
import {generateMessageID, valueAt} from '@Utils/Helper';
import Block from '@Components/Block';
import Text from '@Components/Text';
import {verticalScale} from '@Common/Scale';
import Header from '@Components/Header';
import ImageRemote from '@Components/ImageRemote';
import images from '@Assets/Images';
import styles from './Styles';

type ChatProps = StackScreenProps<RootStackParamList, APP_SCREEN.USER_CHAT>;

const Chat = ({navigation, route}: ChatProps) => {
  const theme: AppTheme = useTheme();

  const {profile, token} = useSelector(state => state.app);
  const {loading, matching} = useSelector(state => state.userChat);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const dispatch = useDispatch();
  const wsRef = useRef<WebsocketRef>(null);
  const wsURL = `${config.wsUrl}?token=${token}`;

  const chatDisabled = matching?.swop?.chat_disabled;

  useEffect(() => {
    const roomID = route?.params?.roomID;
    if (roomID) {
      dispatch(appActions.onClearChatBadgeCount(roomID));
      dispatch(userChatActions.getMatchingDetails(roomID))
        .then(unwrapResult)
        .then(resp => {
          const params: IChatMessagePagination = {
            id: resp.data.id,
            last_timestamp: moment().unix(),
            limit: 40,
          };
          return dispatch(userChatActions.getChatMessages(params));
        })
        .then(unwrapResult)
        .then(resp => {
          setMessages(
            resp.data.records
              ?.map(item => {
                const msg: IMessage = {
                  _id: item.id,
                  createdAt: moment.unix(item.created_at).toDate(),
                  text: item.message,
                  user: {
                    _id: item.owner.id,
                    name: item.owner.name,
                    avatar: item.owner.avatar,
                  },
                  image: item?.attachment?.value,
                };
                if (item.attachment) {
                  switch (item.attachment.type) {
                    case 'image':
                      msg.image = item.attachment.value;
                  }
                }
                return msg;
              })
              .reverse(),
          );
        });
    }
    return () => {
      wsRef?.current?.close();
    };
  }, [route?.params?.roomID]);

  const sendMessage = (mes: IChatMessageWS) => {
    if (wsRef?.current?.isSendable()) {
      wsRef?.current?.send(mes);
    } else {
      dispatch(userChatActions.sendChatMessage(mes));
    }
  };
  const onSend = (newMessages: IMessage[] = []) => {
    setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
    newMessages?.forEach(item => {
      const otherUser = matching?.user_id === profile?.id ? matching?.counter : matching?.user;
      const swop = matching?.user_id === profile?.id ? matching?.swop : matching?.counter_swop;
      const otherSwop = matching?.user_id === profile?.id ? matching?.counter_swop : matching?.swop;
      const mes: IChatMessageWS = {
        message_id: item._id as string,
        created_at: typeof item.createdAt === 'number' ? item.createdAt : moment(item.createdAt).unix(),
        from_user: {
          id: profile?.id!,
          avatar: profile?.avatar,
          name: profile?.name,
        },
        to_user: {
          id: otherUser?.id!,
          avatar: otherUser?.avatar,
          name: otherUser?.name,
        },
        matching_id: matching?.id,
        content: item.text,
        type: 'chat_send_message',
        swop_id: swop?.id,
        other_swop_id: otherSwop?.id,
      };

      if (`${mes.created_at}`.length > 10) {
        mes.created_at = Math.floor(mes.created_at / 1000);
      }
      if (typeof item.image === 'string' && item.image !== '') {
        // @ts-ignore
        const form: IUploadChatImageForm = {
          chatRoomID: swop?.matching_id || '',
          uri: item.image,
          type: mime.lookup(item.image),
        };
        dispatch(userChatActions.updatePhotoMessage(form))
          .then(unwrapResult)
          .then(url => {
            if (!url) {
              throw Error('Invalid image url');
            }
            mes.attachment = {
              type: 'image',
              value: url,
            };
            sendMessage(mes);
          });
      } else {
        sendMessage(mes);
      }
    });
  };

  const onOpen = useCallback(() => {
    console.log('**** onOpen');
  }, []);

  const onMessage = useCallback((data: IChatMessageWS) => {
    const roomID = route?.params?.roomID;
    if (data?.matching_id === roomID) {
      setMessages(prevMessages =>
        GiftedChat.append(prevMessages, [
          {
            _id: data.message_id || '',
            text: data.content,
            createdAt: data.created_at,
            user: {
              _id: data.from_user.id,
              name: data.from_user.name,
              avatar: data.from_user.avatar,
            },
          },
        ]),
      );
    }
  }, []);

  const onError = useCallback(error => {
    console.log('**** onError', error);
  }, []);

  const onClose = useCallback(() => {
    console.log('**** onClose');
  }, []);

  const onUseCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: false,
      });
      if (!result.cancelled) {
        const msg: IMessage = {
          _id: generateMessageID(),
          createdAt: Date.now(),
          text: '',
          user: {
            _id: profile?.id || '',
            name: profile?.name,
            avatar: profile?.avatar || '',
          },
          image: result.uri,
        };

        onSend([msg]);
      }
    } catch (error) {
      error?.message && showToastError(error?.message);
    }
  };
  const onUsePhotoLibrary = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        const msg: IMessage = {
          _id: generateMessageID(),
          createdAt: Date.now(),
          text: '',
          user: {
            _id: profile?.id || '',
            name: profile?.name,
            avatar: profile?.avatar || '',
          },
          image: result.uri,
        };

        onSend([msg]);
      }
    } catch (error) {
      error?.message && showToastError(error?.message);
    }
  };

  const renderBubble = (props: BubbleProps<IChatMessage>) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: theme.colors.border,
          },
          right: {
            backgroundColor: theme.colors.primary,
          },
        }}
      />
    );
  };

  const renderActions = (props: Actions['props']) => (
    <Actions
      {...props}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 0,
        display: chatDisabled ? 'none' : 'flex',
      }}
      icon={() => <Entypo name="attachment" size={18} color="black" />}
      options={{
        [translate('common:photoLibrary')]: onUsePhotoLibrary,
        [translate('common:camera')]: onUseCamera,
        Cancel: () => {
          console.log('Cancel');
        },
      }}
      optionTintColor="#222B45"
    />
  );

  const renderMessageImage = (props: MessageImage<IMessage>['props']) => {
    return <MessageImage {...props} />;
  };

  const renderChatEmpty = () => {
    return (
      <Block>
        <ImageRemote
          height={200}
          resizeMode="contain"
          preview={valueAt([images.emptyChat] || [], 0, images.default)}
          imageURL={valueAt(images.emptyChat || [], 0, '')}
        />
      </Block>
    );
  };

  const renderInputToolbar = (props: InputToolbar['props']) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          display: chatDisabled ? 'none' : 'flex',
        }}
      />
    );
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <Block block color="white">
      <GiftedChat
        isLoadingEarlier={loading}
        loadEarlier
        messages={messages}
        text={text}
        onSend={onSend}
        onInputTextChanged={setText}
        scrollToBottom
        isCustomViewBottom
        renderLoadEarlier={renderChatEmpty}
        renderMessageImage={renderMessageImage}
        user={{
          _id: profile?.id || '',
          name: profile?.name,
        }}
        keyboardShouldPersistTaps="handled"
        renderBubble={renderBubble}
        renderActions={renderActions}
        renderInputToolbar={renderInputToolbar}
      />
      <Websocket ref={wsRef} url={wsURL} onOpen={onOpen} onMessage={onMessage} onError={onError} onClose={onClose} />
    </Block>
  );
};

export default memo(Chat, isEqual);
