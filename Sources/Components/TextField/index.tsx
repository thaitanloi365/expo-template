import React, {forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef} from 'react';
import {ActivityIndicator, Platform} from 'react-native';
import {enhance} from '@Common/Helper';
import Block from '@Components/Block';
import isEqual from 'react-fast-compare';
import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native';
import Text from '@Components/Text';
import {TextFieldProps} from './TextField.props';
import {useTheme} from '@react-navigation/native';
import styles from './TextField.presets';
import Row from '@Components/Row';

const TextField = forwardRef((props: TextFieldProps, _ref: any) => {
  const theme = useTheme();
  const {
    style: styleOverride = {},
    containerStyle,
    placeholder,
    placeholderTx = '',
    placeholderTxOptions,
    valueTx = '',
    valueTxOption,
    title,
    titleTx,
    titleStyle: titleStyleOverride = {},
    errorMessage,
    errorMessageTx,
    errorMessageTxOptions,
    textAlign,
    backgroundColor = theme.colors.background,
    marginLeft,
    marginRight,
    marginBottom,
    marginTop,
    marginHorizontal,
    marginVertical,
    paddingLeft,
    paddingRight,
    paddingBottom,
    paddingTop,
    paddingHorizontal,
    paddingVertical,
    errorStyle: errorStyleOverride = {},
    width,
    height,
    searching,
    onLayout,
    inputRef,
    ...rest
  } = props;

  const style = useMemo(
    () =>
      enhance([
        styles(theme).wrap,
        containerStyle,
        textAlign && {textAlign},

        marginLeft && {marginLeft},
        marginRight && {marginRight},
        marginBottom && {marginBottom},
        marginTop && {marginTop},
        marginHorizontal && {marginHorizontal},
        marginVertical && {marginVertical},
        paddingLeft && {paddingLeft},
        paddingRight && {paddingRight},
        paddingBottom && {paddingBottom},
        paddingTop && {paddingTop},
        paddingHorizontal && {paddingHorizontal},
        paddingVertical && {paddingVertical},
        width && {width},
        height && {height},
      ]),
    [
      containerStyle,
      textAlign,
      backgroundColor,
      marginLeft,
      marginRight,
      marginBottom,
      marginTop,
      marginHorizontal,
      marginVertical,
      paddingLeft,
      paddingRight,
      paddingBottom,
      paddingTop,
      paddingHorizontal,
      paddingVertical,
      width,
      height,
    ],
  );
  const [t] = useTranslation();
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (textInputRef.current !== null && inputRef) {
      inputRef(textInputRef.current);
    }
  }, [textInputRef, inputRef]);

  const onFocus = useCallback(() => {
    textInputRef.current && textInputRef.current?.focus();
  }, []);

  const hasError =
    (typeof errorMessage === 'string' && errorMessage.length > 0) ||
    (typeof errorMessageTx === 'string' && errorMessageTx.length > 0);

  const inputStyle = useMemo(
    () =>
      enhance([
        styles(theme).input,
        Platform.select({
          android: {
            paddingVertical: 0,
            textAlignVertical: props.multiline ? 'top' : 'auto',
          },
        }),
        styleOverride,
      ]),
    [styleOverride, hasError],
  );

  const inputWrapStyle = useMemo(
    () =>
      enhance([styles(theme).inputWrap, backgroundColor && {backgroundColor}, hasError && styles(theme).inputError]),
    [hasError, backgroundColor],
  );

  const titleStyle = useMemo(() => enhance([styles(theme).title, titleStyleOverride]), [titleStyleOverride]);

  const errorStyle = useMemo(() => enhance([styles(theme).error, errorStyleOverride]), [errorStyleOverride]);

  return (
    <Block onLayout={onLayout} style={style}>
      {(title || titleTx) && <Text style={titleStyle} text={title} tx={titleTx} />}
      <Row style={inputWrapStyle} alignHorizontal="space-between" alignVertical="center">
        <TextInput
          ref={textInputRef}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={placeholder || t(placeholderTx, placeholderTxOptions)}
          value={rest.value || t(valueTx, valueTxOption)}
          style={inputStyle}
          blurOnSubmit={false}
          onFocus={onFocus}
          underlineColorAndroid="transparent"
          {...rest}
        />
        {searching && <ActivityIndicator size="small" style={styles(theme).indicator} hidesWhenStopped />}
      </Row>
      {hasError && (
        <Text style={errorStyle} text={errorMessage} tx={errorMessageTx} txOptions={errorMessageTxOptions} />
      )}
    </Block>
  );
});

export default memo(TextField, isEqual);
