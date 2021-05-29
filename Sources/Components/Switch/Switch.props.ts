import {ViewStyle, StyleProp} from 'react-native';

export interface SwitchProps {
  disabled?: boolean;

  value?: boolean;

  onToggle?: (newValue: boolean) => void;

  style?: StyleProp<ViewStyle>;

  trackOnStyle?: StyleProp<ViewStyle>;

  trackOffStyle?: StyleProp<ViewStyle>;

  thumbOnStyle?: StyleProp<ViewStyle>;

  thumbOffStyle?: StyleProp<ViewStyle>;
}
