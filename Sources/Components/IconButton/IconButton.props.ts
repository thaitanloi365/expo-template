import {ImageStyle, StyleProp, ViewStyle} from 'react-native';
import {IconTypes} from '@Assets/Icons';

export type IconSize = number | 'large' | 'medium' | 'small';

export interface IconButtonProps {
  style?: StyleProp<ViewStyle>;

  iconStyle?: StyleProp<ImageStyle>;

  contentStyle?: StyleProp<ViewStyle>;

  icon?: IconTypes;

  iconColor?: string;

  disabled?: boolean;

  background?: string;

  onPress?: () => void;

  raised?: boolean;

  size?: IconSize;

  iconSize?: number;

  margin?: boolean;

  marginHorizontal?: boolean;

  marginVertical?: boolean;

  marginLeft?: boolean;

  marginRight?: boolean;

  marginTop?: boolean;

  marginBottom?: boolean;

  paddingHorizontal?: boolean;

  paddingVertical?: boolean;

  paddingLeft?: boolean;

  paddingRight?: boolean;

  paddingTop?: boolean;

  paddingBottom?: boolean;
}
