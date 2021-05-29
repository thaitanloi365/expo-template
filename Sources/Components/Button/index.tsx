import React, {memo, useMemo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import equals from 'react-fast-compare';
import {FontSizeDefault} from '@Themes';
import {useTheme} from '@react-navigation/native';
import {AppTheme} from '@Types';
import {enhance} from '@Common/Helper';
import Icon from '@Components/Icon';
import Text from '@Components/Text';
import {ButtonProps} from './Button.props';
import {ButtonPresetNames, buttonStylesView, buttonTextStyles} from './Button.presets';
import Block from '@Components/Block';
import {useSelector} from '@Common/Hook';
import Touchable from '@Components/Touchable';

const styles = (theme: AppTheme, type: ButtonPresetNames) =>
  StyleSheet.create({
    wrap: {
      borderRadius: 8,
      overflow: 'hidden',
    },
    button: buttonStylesView[type],
    buttonText: buttonTextStyles[type],
    loading: {
      marginHorizontal: 2,
    },
    iconContainer: {
      marginHorizontal: 5,
    },
  });

const Button = (props: ButtonProps) => {
  const theme: AppTheme = useTheme();

  const {appType} = useSelector(x => x.app);

  const {
    preset = appType === 'user' || appType === undefined || !appType ? 'primary' : 'black',
    tx,
    text,
    icon,
    style: styleOverride = {},
    textStyle: textStyleOverride = {},
    children,
    loading,
    loadingProps,
    loadingStyle,
    iconStyle,
    iconLeft,
    iconLeftStyle,
    iconRight,
    iconRightStyle,
    disabled,
    background,
    containerStyle,
    hideDisabledStyle,
    width,
    height,
    marginBottom,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginTop,
    marginVertical,
    paddingBottom,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingVertical,
    alignSelf,
    textFontSize,
    textColor,
    ...rest
  } = props;

  const viewStyle = useMemo(
    () =>
      enhance([
        styles(theme, preset).wrap,
        containerStyle,
        marginLeft && {marginLeft},
        marginRight && {marginRight},
        marginTop && {marginTop},
        marginBottom && {marginBottom},
        marginHorizontal && {marginHorizontal},
        marginVertical && {marginVertical},
        paddingRight && {paddingRight},
        paddingBottom && {paddingBottom},
        paddingLeft && {paddingLeft},
        paddingTop && {paddingTop},
        paddingHorizontal && {paddingHorizontal},
        paddingVertical && {paddingVertical},
        alignSelf && {alignSelf},
        width && {width},
        height && {height},
      ]),
    [
      containerStyle,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      marginHorizontal,
      marginVertical,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingTop,
      paddingHorizontal,
      paddingVertical,
      alignSelf,
      width,
      height,
    ],
  );
  const textStyle = useMemo(
    () =>
      enhance([
        styles(theme, preset).buttonText,
        textColor && {color: textColor},
        textFontSize && {fontSize: FontSizeDefault[textFontSize]},
        textStyleOverride,
      ]),
    [textStyleOverride, textColor, textFontSize],
  );

  const content = useMemo(
    () => children || (icon ? <Icon icon={icon} style={iconStyle} /> : <Text tx={tx} text={text} style={textStyle} />),
    [tx, textStyle, children, text],
  );

  const buttonStyle = useMemo(
    () =>
      enhance([
        styles(theme, preset).button,
        styleOverride,
        !hideDisabledStyle && props.disabled && preset !== 'link' && {opacity: 0.6},
      ]),
    [styleOverride],
  );

  const loadingStyleWrap = useMemo(() => enhance([styles(theme, preset).loading, loadingStyle]), [loadingStyle]);

  return (
    <Block style={viewStyle}>
      <Touchable delayPressIn={0} activeOpacity={disabled ? 1 : 0.7} disabled={disabled} {...rest}>
        <View style={buttonStyle}>
          {loading && (
            <ActivityIndicator
              style={loadingStyleWrap}
              color={preset === 'primary' ? 'white' : loadingProps?.color}
              size={loadingProps?.size || 'small'}
              {...loadingProps}
            />
          )}

          {!loading && iconLeft && <Icon icon={iconLeft} style={iconLeftStyle} />}

          {content}

          {!loading && iconRight && <Icon icon={iconRight} style={iconRightStyle} />}
        </View>
      </Touchable>
    </Block>
  );
};
export default memo(Button, equals);
