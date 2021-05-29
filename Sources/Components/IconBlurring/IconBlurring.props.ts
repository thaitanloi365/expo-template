import {IconTypes} from '@Assets/Icons';
import {IconProps} from '@Components/Icon/Icon.props';
import {ImageStyle, StyleProp, ViewStyle} from 'react-native';

export interface IconBlurringProps extends IconProps {
  style?: StyleProp<ImageStyle>;

  containerStyle?: StyleProp<ViewStyle>;

  raised?: boolean;

  blurTint?: 'dark' | 'light' | 'default';

  blurIntensity?: number;

  size?: 'small' | 'large' | 'medium' | number;

  icon?: IconTypes;

  padding?: number;

  children?: React.ReactNode;

  onPress?: () => void;

  disabled?: boolean;
}
