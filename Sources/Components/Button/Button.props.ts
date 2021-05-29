import {IconTypes} from '@Assets/Icons';
import {FontSizeTypes} from '@Themes';
import {
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  StyleProp,
  TouchableNativeFeedbackProps,
  ActivityIndicatorProps,
  ImageStyle,
  FlexAlignType,
} from 'react-native';
import {ButtonPresetNames} from './Button.presets';

export interface ButtonProps extends TouchableOpacityProps, TouchableNativeFeedbackProps {
  /**
   * Text which is looked up via i18n.
   * @default undefined
   */
  tx?: string;

  icon?: IconTypes;

  iconStyle?: StyleProp<ImageStyle>;

  text?: string;

  textFontSize?: FontSizeTypes;

  textColor?: string;

  containerStyle?: StyleProp<ViewStyle>;

  style?: StyleProp<ViewStyle>;

  textStyle?: StyleProp<TextStyle>;

  preset?: ButtonPresetNames;

  children?: React.ReactNode;

  loading?: boolean;

  iconLeft?: IconTypes;

  iconLeftStyle?: StyleProp<ImageStyle>;

  iconRight?: IconTypes;

  iconRightStyle?: StyleProp<ImageStyle>;

  loadingProps?: ActivityIndicatorProps;

  loadingStyle?: StyleProp<ViewStyle>;

  hideDisabledStyle?: boolean;

  width?: number;

  height?: number;

  marginLeft?: number;

  marginRight?: number;

  marginBottom?: number;

  marginTop?: number;

  marginHorizontal?: number;

  marginVertical?: number;

  paddingLeft?: number;

  paddingRight?: number;

  paddingBottom?: number;

  paddingTop?: number;

  paddingHorizontal?: number;

  paddingVertical?: number;

  alignSelf?: 'auto' | FlexAlignType;
}
