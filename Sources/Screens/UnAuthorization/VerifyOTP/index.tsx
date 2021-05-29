import React, {memo, useEffect, useState} from 'react';
import isEqual from 'react-fast-compare';
import {otpActions} from './Redux';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList, APP_SCREEN} from '@Navigation/ScreenTypes';
import {useTheme} from '@react-navigation/native';
import {AppTheme, ILoginPhoneForm, IVerifyOTPForm} from '@Types';
import Button from '@Components/Button';
import Text from '@Components/Text';
import {translate} from '@Utils/I18n';
import config from '@Config';
import {useCountdown, useDispatch, useSelector} from '@Common/Hook';
import Screen from '@Components/Screen';
import Image from '@Components/Image';
import Otp from '@Components/Otp';
import styles from './Styles';
import {appActions} from '@Store/AppReducer';
import {unwrapResult} from '@reduxjs/toolkit';
import {OTP_LENGTH, OTP_RESEND_INTERVAL_IN_SECONDS} from '@Utils/Constants';
import {scale, verticalScale} from '@Common/Scale';
import Row from '@Components/Row';

type VerifyOTPProps = StackScreenProps<RootStackParamList, APP_SCREEN.VERIFY_OTP>;

interface CountdownButtonProps {
  onResend: () => void;
  value?: number;
  loading?: boolean;
}

const CountdownButton = (props: CountdownButtonProps) => {
  const {onResend, value = OTP_RESEND_INTERVAL_IN_SECONDS, loading} = props;

  const [countdown, countdownCompleted, resetCountdown] = useCountdown(value || OTP_RESEND_INTERVAL_IN_SECONDS);
  const minute = Math.floor(countdown / 60);
  const second = countdown % 60;
  const secondText = second < 10 ? `0${second}` : `${second}`;
  const countdownText = ` ${minute}:${secondText}`;

  useEffect(() => {
    resetCountdown(value);
  }, [value]);

  return (
    <Button preset="link" onPress={onResend} disabled={!countdownCompleted} loading={loading}>
      <Text preset="highlight" tx="verifyOTP:resend">
        {!countdownCompleted && <Text preset="highlight" text={countdownText} />}
      </Text>
    </Button>
  );
};

const VerifyOTPComponent = ({navigation, route}: VerifyOTPProps) => {
  const theme: AppTheme = useTheme();
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.otp);
  const [otp, setOTP] = useState('');
  const [countdownValue, setCountdownValue] = useState(
    route?.params?.data?.next_in_seconds || OTP_RESEND_INTERVAL_IN_SECONDS,
  );

  const onBack = () => navigation.goBack();

  const onSubmit = (otp: any) => {
    if (route.params.phone) {
      const data: IVerifyOTPForm = {
        phone: route.params.phone,
        otp_code: otp,
        app_version: config.manifest.version!,
      };

      dispatch(appActions.getConstants())
        .then(unwrapResult)
        .then(() => {
          return dispatch(otpActions.verifyOTP(data));
        })
        .then(unwrapResult)
        .then(response => {
          return dispatch(appActions.onSetTokenAndProfile(response.data));
        })
        .then(unwrapResult)
        .then(resp => {
          navigation.navigate(APP_SCREEN.GET_STARTED);
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  };

  const onResend = () => {
    if (route.params.phone) {
      const phone = route.params.phone;
      const data: ILoginPhoneForm = {
        phone: phone,
      };
      dispatch(otpActions.resendOTP(data))
        .then(unwrapResult)
        .then(response => {
          setCountdownValue(response.data.next_in_seconds || OTP_RESEND_INTERVAL_IN_SECONDS);
        });
    }
  };

  const onOtpValid = (otp: string) => {
    setOTP(otp);
    onSubmit(otp);
  };

  const onNext = () => onSubmit(otp);
  return (
    <Screen headerLeftOnPress={onBack} scrollContentPaddingHorizontal={scale(20)}>
      <Image containerStyle={styles(theme).logoWrap} resizeMode="contain" style={styles(theme).logo} source="logo" />
      <Text style={styles(theme).text}>
        {translate('verifyOTP:title')}
        <Text preset="highlight" text={route.params.phone} />
      </Text>
      <Otp autoFocus keyboardType="number-pad" onOtpValid={onOtpValid} length={4} />
      <Row marginTop={verticalScale(16)} height={verticalScale(40)} alignHorizontal="flex-end">
        <CountdownButton onResend={onResend} value={countdownValue} loading={loading} />
      </Row>
      <Button
        marginTop={verticalScale(40)}
        disabled={otp.length !== OTP_LENGTH || loading}
        onPress={onNext}
        loading={loading}
        tx="verifyOTP:next"
      />
    </Screen>
  );
};

export default memo(VerifyOTPComponent, isEqual);
