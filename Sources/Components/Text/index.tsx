import {enhance} from '@Common/Helper';
import Block from '@Components/Block';
import {useTheme} from '@react-navigation/native';
import {FontSizeDefault, FontDefault, FontFamily} from '@Themes';
import {AppTheme} from '@Types';
import React, {memo, useMemo} from 'react';
import isEqual from 'react-fast-compare';
import {useTranslation} from 'react-i18next';
import {StyleProp, Text as ReactNativeText, TextStyle} from 'react-native';
import styles from './Text.presets';
import {TextProps} from './Text.props';

const Text = (props: TextProps) => {
  const {
    preset = 'mainText',
    tx,
    txOptions,
    text,
    children,
    flex,
    fontSize,
    fontWeight = 'normal',
    fontFamily,
    margin,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    padding,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingTop,
    paddingHorizontal,
    paddingVertical,
    width,
    height,
    alignItems,
    alignSelf,
    color,
    center,
    textAlignVertical,
    textTransform,
    textAlign,
    fontStyle,
    letterSpacing,
    lineHeight,
    marginHorizontal,
    marginVertical,
    flexShrink,
    required = false,
    style: styleOverride = {},
    ...rest
  } = props;
  const theme: AppTheme = useTheme();
  const [t] = useTranslation();
  const i18nText = tx && t(tx, txOptions);
  const content = i18nText || text;

  let ff: FontFamily = fontFamily || 'primary';
  const fw = (styleOverride as TextStyle)?.fontWeight || fontWeight;
  const fs = (styleOverride as TextStyle)?.fontStyle || fontStyle;

  if (fs === 'italic') {
    ff = 'italic';
  } else {
    switch (fw) {
      case '100':
      case '200':
      case '300':
        ff = 'light';
        break;

      case 'normal':
      case '400':
        ff = 'primary';
        break;

      case '500':
      case '600':
        ff = 'medium';
        break;

      case '700':
      case '800':
      case '900':
      case 'bold':
        ff = 'bold';

        break;
    }
  }

  const styleComponent = useMemo(
    () =>
      enhance([
        styles[preset],
        [
          flex && {flex},
          margin && {margin},
          fontSize && {fontSize: FontSizeDefault[fontSize]},
          fontWeight && {fontWeight},
          ff && {fontFamily: FontDefault[ff] || FontDefault.primary},
          marginLeft && {marginLeft},
          marginRight && {marginRight},
          marginTop && {marginTop},
          marginBottom && {marginBottom},
          padding && {padding},
          paddingHorizontal && {paddingHorizontal},
          paddingRight && {paddingRight},
          paddingBottom && {paddingBottom},
          paddingLeft && {paddingLeft},
          paddingTop && {paddingTop},
          paddingVertical && {paddingVertical},
          width && {width},
          height && {height},
          color && {color: color},
          center && {textAlign: 'center'},
          textAlign && {textAlign},
          alignItems && {alignItems},
          alignSelf && {alignSelf},
          textTransform && {textTransform},
          textAlignVertical && {textAlignVertical},
          fontStyle && {fontStyle},
          letterSpacing && {letterSpacing},
          lineHeight && {lineHeight},
          marginVertical && {marginVertical},
          marginHorizontal && {marginHorizontal},
          flexShrink && {flexShrink},
          enhance([styleOverride]),
        ] as StyleProp<TextStyle>,
      ]),
    [
      flex,
      fontSize,
      fontWeight,
      fontFamily,
      margin,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      padding,
      paddingHorizontal,
      paddingVertical,
      width,
      height,
      color,
      center,
      paddingRight,
      paddingBottom,
      paddingLeft,
      alignItems,
      alignSelf,
      paddingTop,
      textAlignVertical,
      textTransform,
      textAlign,
      styleOverride,
      marginHorizontal,
      marginVertical,
      flexShrink,
    ],
  );
  return (
    <ReactNativeText allowFontScaling={false} {...rest} style={styleComponent}>
      {content}
      {children}
      {required && <ReactNativeText style={{color: theme.colors.primary}}>{` * `}</ReactNativeText>}
    </ReactNativeText>
  );
};
export default memo(Text, isEqual);
