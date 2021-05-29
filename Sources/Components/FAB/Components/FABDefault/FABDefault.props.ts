import {IconTypes} from '@Assets/Icons';
import {ImageStyle, StyleProp, ViewStyle} from 'react-native';
export interface FABDefaultProps {
  onPress?: () => void;

  style?: ViewStyle | ViewStyle[];

  icon?: IconTypes;

  iconStyle?: StyleProp<ImageStyle>;

  label?: string | React.ReactNode;

  margin?: number;

  marginLeft?: number;

  marginRight?: number;

  marginTop?: number;

  marginBottom?: number;
}
