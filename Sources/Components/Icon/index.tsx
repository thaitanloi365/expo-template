import React, {memo, useMemo} from 'react';
import {Image, ImageStyle, TextStyle} from 'react-native';
import {BadgeProps, IconProps} from './Icon.props';
import icons from '@Assets/Icons';
import {enhance} from '@Common/Helper';
import Block from '@Components/Block';
import Text from '@Components/Text';
import isEqual from 'react-fast-compare';
import styles from './Icon.presets';

const Badge = (props: BadgeProps) => {
  const {textColor, textStyle, value, ...badgeStyleOverride} = props;

  const badgeStyle: ImageStyle = React.useMemo(() => enhance([styles.badgeStyle, badgeStyleOverride]), [
    badgeStyleOverride,
  ]);
  const badgeTextStyle: TextStyle = React.useMemo(
    () => enhance([styles.badgeTextStyle, textStyle, textColor && {color: textColor}]),
    [textStyle],
  );

  return (
    <Block style={badgeStyle}>
      <Text style={badgeTextStyle} text={`${value}`} />
    </Block>
  );
};
const Icon = (props: IconProps) => {
  const {
    style: styleOverride = {},
    icon,
    containerStyle: containerStyleOverride = {},
    width,
    height,
    badgeProps,
    badgeCount,
  } = props;
  const style: ImageStyle = useMemo(
    () => enhance([styles.imageStyle, styleOverride, width && {width}, height && {height}]),
    [styleOverride, width, height],
  );
  const containerStyle = useMemo(() => enhance([containerStyleOverride, width && {width}, height && {height}]), [
    containerStyleOverride,
  ]);
  return (
    <Block style={containerStyle}>
      <Image style={style} source={icons[icon ?? 'close']} />
      {!!badgeCount && <Badge {...badgeProps} value={badgeCount} />}
    </Block>
  );
};
export default memo(Icon, isEqual);
