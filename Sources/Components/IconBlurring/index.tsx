import React, {memo, useMemo} from 'react';
import icons from '@Assets/Icons';
import {enhance} from '@Common/Helper';
import {scale, verticalScale} from '@Common/Scale';
import Block from '@Components/Block';
import Icon from '@Components/Icon';
import {SpacingDefault} from '@Themes';
import {BlurView} from 'expo-blur';
import isEqual from 'react-fast-compare';
import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';
import {IconBlurringProps} from './IconBlurring.props';
import styles from './IconBlurring.presets';
import Touchable from '@Components/Touchable';

const IconBlurring = (props: IconBlurringProps) => {
  const {
    containerStyle: containerStyleOverride = {},
    raised = true,
    blurTint = 'dark',
    blurIntensity = 100,
    size,
    padding,
    style: styleOverride = {},
    icon,
    children,
    onPress,
    disabled,
  } = props;

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
  const p = verticalScale(padding || SpacingDefault.large);
  const circularStyle: ViewStyle = {
    width: d,
    height: d,
    borderRadius: d,
    backgroundColor: 'transparent',
  };
  const imageStyle: ImageStyle = {
    padding,
    resizeMode: 'contain',
    alignContent: 'center',
  };
  const style: ViewStyle = useMemo(
    () =>
      enhance([
        styles.wrap,
        raised && styles.shadow,
        containerStyleOverride,
        circularStyle,
        padding !== undefined && {padding: scale(padding)},
      ]),
    [containerStyleOverride, circularStyle],
  );
  const iconStyle: ImageStyle = useMemo(() => enhance([styles.icon, styleOverride, imageStyle]), [
    styleOverride,
    imageStyle,
  ]);

  return (
    <Block style={circularStyle} overflow="hidden">
      <BlurView style={StyleSheet.absoluteFill} intensity={blurIntensity} tint={blurTint}>
        <Touchable disabled={disabled} style={style} onPress={onPress} activeOpacity={0.7}>
          {icon && icon in icons ? <Icon icon={icon} style={iconStyle} /> : children}
        </Touchable>
      </BlurView>
    </Block>
  );
};

export default memo(IconBlurring, isEqual);
