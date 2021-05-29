import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import isEqual from 'react-fast-compare';
import {loginActions} from './Redux';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList, APP_SCREEN} from '@Navigation/ScreenTypes';
import {useTheme} from '@react-navigation/native';
import {AppTheme, ILoginPhoneForm, ILang} from '@Types';
import {useSelector, useDispatch} from '@Common/Hook';
import Image from '@Components/Image';
import Screen from '@Components/Screen';
import Text from '@Components/Text';
import {unwrapResult} from '@reduxjs/toolkit';
import {scale, verticalScale} from '@Common/Scale';
import Button from '@Components/Button';
import TextField from '@Components/TextField';
import Block from '@Components/Block';
import {isValidPhone} from '@Utils/Helper';
import Version from '@Components/Version';
import {ActionSheetRef} from '@Components/ActionSheet';
import {changeLanguage} from '@Utils/I18n';
import Touchable from '@Components/Touchable';
import * as Localization from 'expo-localization';
import styles from './Styles';

type LoginProps = StackScreenProps<RootStackParamList, APP_SCREEN.LOGIN>;

const LANGUAGES: ILang[] = ['en', 'vi'];

const LoginComponent = ({navigation, route}: LoginProps) => {
  const theme: AppTheme = useTheme();
  const dispatch = useDispatch();
  const {loading} = useSelector(x => x.login);

  const [phone, setPhone] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<ILang>('en');

  const isPhone = isValidPhone(phone);

  const ref = useRef<ActionSheetRef>(null);

  const onChangeLanguage = async (item: ILang) => {
    setSelectedLanguage(item);
    await changeLanguage(item);
  };

  useEffect(() => {
    Localization.getLocalizationAsync().then(({locale}) => {
      const language = locale.split('-')[0] as ILang;
      onChangeLanguage(language);
    });
  }, []);

  const onChangeText = useCallback((text: string) => {
    setPhone(text);
  }, []);

  const onSubmit = () => {
    const phoneNumber = `+84${phone}`;
    const data: ILoginPhoneForm = {
      phone: phoneNumber,
    };
    dispatch(loginActions.login(data))
      .then(unwrapResult)
      .then(response => {
        navigation.navigate(APP_SCREEN.VERIFY_OTP, {phone: phoneNumber, data: response.data});
      });
  };

  return (
    <Screen
      backgroundColor="white"
      fixedBottomView={
        <Block alignItems="center">
          <Text tx="login:term" />
          <Version marginVertical={verticalScale(10)} />
        </Block>
      }
      scrollContentPadding={scale(20)}>
      <Image containerStyle={styles(theme).logoWrap} resizeMode="contain" style={styles(theme).logo} source="logo" />
      <Text style={styles(theme).text} tx="login:title" />

      <Block height={verticalScale(50)}>
        <TextField
          backgroundColor={theme.colors.background}
          defaultValue={phone}
          onChangeText={onChangeText}
          autoFocus
        />
      </Block>

      <Button
        marginTop={verticalScale(40)}
        disabled={loading}
        loading={loading}
        tx={'login:continue'}
        onPress={onSubmit}
      />

      <Block block marginTop={verticalScale(20)} direction="row" justifyContent="center" alignItems="center">
        {LANGUAGES.map(item => (
          <Touchable key={item} onPress={() => onChangeLanguage(item)}>
            <Text
              tx={`common:${item}`}
              preset="footNote"
              color={selectedLanguage === item ? theme.colors.primary : theme.colors.text}
            />
          </Touchable>
        ))}
      </Block>
    </Screen>
  );
};

export default memo(LoginComponent, isEqual);
