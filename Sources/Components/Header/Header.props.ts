import {ViewStyle, TextStyle, ImageStyle, StyleProp} from 'react-native';
import {IconTypes} from '@Assets/Icons';
import {ReactElementFunc} from '@Types';
import {ReactElement} from 'react';
import {RowProps} from '@Components/Row/Row.props';

export interface HeaderProps extends Omit<RowProps, 'onPress'> {
  style?: StyleProp<ViewStyle>;

  middleStyle?: StyleProp<ViewStyle>;

  title?: string;

  titleTx?: string;

  titleStyle?: StyleProp<TextStyle>;

  leftIcon?: IconTypes;

  leftIconColor?: string;

  leftStyle?: StyleProp<ViewStyle>;

  leftPadding?: number;

  leftPaddingLeft?: number;

  leftPaddingTop?: number;

  leftPaddingRight?: number;

  leftPaddingBottom?: number;

  leftPaddingVertical?: number;

  leftPaddingHorizontal?: number;

  leftIconStyle?: StyleProp<ImageStyle>;

  leftView?: ReactElement | ReactElementFunc;

  onLeftPress?(): void;

  rightStyle?: StyleProp<ViewStyle>;

  rightIcon?: IconTypes;

  rightIconColor?: string;

  rightPadding?: number;

  rightPaddingLeft?: number;

  rightPaddingTop?: number;

  rightPaddingRight?: number;

  rightPaddingBottom?: number;

  rightPaddingVertical?: number;

  rightPaddingHorizontal?: number;

  rightIconStyle?: StyleProp<ImageStyle>;

  onRightPress?(): void;

  rightView?: ReactElement | ReactElementFunc;

  sticky?: boolean;

  unsafe?: boolean;

  hasHeaderLayer?: boolean;

  titleView?: ReactElement | ReactElementFunc;
}
