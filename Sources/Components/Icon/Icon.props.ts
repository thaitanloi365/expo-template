import {ImageStyle, ViewStyle, StyleProp, TextStyle} from 'react-native';
import {IconTypes} from '@Assets/Icons';

export interface IconProps {
  style?: StyleProp<ImageStyle>;

  containerStyle?: StyleProp<ViewStyle>;

  icon?: IconTypes;

  badgeCount?: number;

  badgeProps?: BadgeProps | boolean;

  width?: number;

  height?: number;
}

export interface BadgeProps {
  top?: number;

  right?: number;

  width?: number;

  height?: number;

  backgroundColor?: string;

  textColor?: string;

  textStyle?: TextStyle;

  value: number;

  borderWidth?: number;

  borderColor?: string;
}
