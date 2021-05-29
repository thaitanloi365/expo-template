import {TouchableWithoutFeedbackProps, TouchableOpacityProps} from 'react-native';

export interface TouchableProps extends TouchableWithoutFeedbackProps, TouchableOpacityProps {
  children: JSX.Element | React.ReactNode;
  rippleRadius?: number;
}
