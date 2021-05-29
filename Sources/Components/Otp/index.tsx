import React, {useState, useEffect, useMemo, memo, useRef} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {OtpProps} from './Otp.props';
import {ColorDefault, FontSizeDefault} from '@Themes';
import isEqual from 'react-fast-compare';
import {scale} from '@Common/Scale';
import {enhance} from '@Common/Helper';
import Block from '@Components/Block';
import Text from '@Components/Text';

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpView: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ColorDefault.border,
  },
  otpViewActive: {
    borderColor: ColorDefault.primary,
  },
  otpText: {
    fontSize: FontSizeDefault.FONT_14,
    color: ColorDefault.primary,
    textAlignVertical: 'bottom',
  },
  sizeBoxW15: {
    width: 15,
  },
  row: {
    flexDirection: 'row',
  },
  input: {
    width: '100%',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'transparent',
    opacity: 0,
  },
});

const Otp = (props: OtpProps) => {
  const inputRef = useRef<any>();
  const {
    length,
    defaultOtp = '',
    onOtpValid,
    onOtpInValid,
    textEntry,
    wrapInputActiveStyle = {},
    wrapInputStyle = {},
    containerStyle = {},
    textStyle = {},
    autoFocus,
    onChangeText,
    width = scale(54),
    height = scale(54),
    onFocus,
    onBlur,
    value,
    ...rest
  } = props;
  const [otp, setOtp] = useState('');
  const [focused, setFocused] = useState(inputRef.current?.isFocused());

  const _onOtpChange = (text: string) => {
    const textTrim = text.trim().toString();
    if (textTrim.length <= length) {
      const value = text.trim().toString();
      setOtp(value);
      onChangeText && onChangeText(value);
    }
  };
  useEffect(() => {
    if (autoFocus) {
      const timeoutID = setTimeout(() => {
        inputRef.current.focus();
      }, 650);
      return () => clearInterval(timeoutID);
    }
  }, []);

  useEffect(() => {
    console.log('OTP value', value);
    if (value) {
      setOtp(value.length > length ? value.slice(0, length) : value);
    } else {
      setOtp('');
    }
  }, [value]);

  useEffect(() => {
    if (defaultOtp) {
      setOtp(defaultOtp.length > length ? defaultOtp.slice(0, length) : defaultOtp);
    }
  }, [defaultOtp]);

  useEffect(() => {
    if (otp.length === length) {
      onOtpValid && onOtpValid(otp);
    } else {
      onOtpInValid && onOtpInValid(otp);
    }
  }, [otp]);

  const _onFocus = (e: any) => {
    setFocused(true);
    onFocus && onFocus(e);
  };
  const _onBlur = (e: any) => {
    setFocused(false);
    onBlur && onBlur(e);
  };

  const container = useMemo(() => enhance([styles.wrap, styles.row, containerStyle]), [containerStyle]);
  const wrapInput = useMemo(() => enhance([styles.otpView, {width, height}, wrapInputStyle]), [
    wrapInputStyle,
    width,
    height,
  ]);
  const wrapInputActive = useMemo(() => enhance([styles.otpViewActive, wrapInputActiveStyle]), []);
  const text = useMemo(() => enhance([styles.otpText, textStyle]), []);
  const sizeBoxW15 = useMemo(() => enhance([styles.sizeBoxW15]), []);
  const input = useMemo(() => enhance([styles.input, {height}]), [height]);
  const row = useMemo(() => enhance([styles.row]), []);

  return (
    <Block style={container}>
      {length &&
        Array(length)
          .fill(0)
          .map((item, index) => {
            return (
              <Block key={index} style={row}>
                <Block style={[wrapInput, focused && index === otp.length && wrapInputActive]}>
                  <Text text={index <= otp.length - 1 ? textEntry?.charAt(0) ?? otp.charAt(index) : ''} style={text} />
                </Block>
                <Block style={sizeBoxW15} />
              </Block>
            );
          })}
      <TextInput
        ref={inputRef}
        value={otp}
        onFocus={_onFocus}
        onBlur={_onBlur}
        autoCapitalize={'none'}
        underlineColorAndroid={'transparent'}
        onChangeText={_onOtpChange}
        // selectionColor={'transparent'}
        style={input}
        {...rest}
      />
    </Block>
  );
};
export default memo(Otp, isEqual);
