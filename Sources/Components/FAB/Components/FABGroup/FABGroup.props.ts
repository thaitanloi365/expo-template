import {IconTypes} from '@Assets/Icons';
import {ViewStyle} from 'react-native';

export interface Actions {
  icon: IconTypes;

  label?: string;

  onPress?: () => void;
}

export interface FABGroupProps {
  style?: ViewStyle | ViewStyle[];

  icon?: IconTypes;

  label?: string | React.ReactNode;

  actions?: Actions[];
}
