import React, {memo, useMemo} from 'react';
import {ImageStyle, Platform, Image, ViewStyle} from 'react-native';
import {IconButtonProps} from './IconButton.props';
import {scale, verticalScale} from '@Common/Scale';
import {enhance} from '@Common/Helper';
import isEqual from 'react-fast-compare';
import icons from '@Assets/Icons';
import styles from './IconButton.presets';
import {useTheme} from '@react-navigation/native';
import Touchable from '@Components/Touchable';

const IconButton = (props: IconButtonProps) => {
  const {
    style: styleOverride = {},
    iconStyle: iconStyleOverride = {},
    contentStyle: contentStyleOverride = {},
    onPress,
    disabled,
    background,
    icon = 'back',
    raised = false,
    size = 'small',
    iconColor,
    iconSize = 32,
  } = props;
  const theme = useTheme();

  const getSize = () => {
    if (typeof size === 'number') {
      return size;
    }

    if (typeof size === 'string') {
      switch (size) {
        case 'small':
          return 45;
        case 'medium':
          return 60;
        case 'large':
          return 70;
      }
    }

    return 45;
  };

  const d = verticalScale(getSize());
  const circularStyle: ViewStyle = {
    width: d,
    height: d,
    borderRadius: d,
  };
  const imageStyle: ImageStyle = {
    resizeMode: 'contain',
    alignContent: 'center',
    width: scale(iconSize),
    height: scale(iconSize),
  };
  const style: ViewStyle = useMemo(
    () => enhance([styles(theme).container, styleOverride, circularStyle, raised && styles(theme).shadow]),
    [styleOverride, circularStyle],
  );
  const contentStyle: ViewStyle = useMemo(
    () => enhance([contentStyleOverride, disabled && styles(theme).disabledWrap]),
    [contentStyleOverride],
  );
  const iconStyle: ImageStyle = useMemo(
    () =>
      enhance([
        iconStyleOverride,
        // disabled && styles(theme).disabledImage,
        imageStyle,
        iconColor && {tintColor: iconColor},
      ]),
    [iconStyleOverride, imageStyle],
  );

  return (
    <Touchable
      delayPressIn={0}
      activeOpacity={0.3}
      disabled={disabled}
      rippleRadius={d / 2}
      style={style}
      onPress={onPress}>
      <Image style={iconStyle} source={icons[icon]} />
    </Touchable>
  );
};
export default memo(IconButton, isEqual);
