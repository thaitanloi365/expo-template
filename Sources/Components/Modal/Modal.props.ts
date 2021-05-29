import {StyleProp, ViewStyle} from 'react-native';

export interface ModalProps {
  style?: StyleProp<ViewStyle>;

  backdropColor?: string;

  children?: React.ReactNode | React.ReactNode[];
}
