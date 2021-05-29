import {StyleProp, TextInputProps, TextStyle, ViewStyle} from 'react-native';

export interface TextFieldProps extends TextInputProps {
  name?: string;

  containerStyle?: StyleProp<ViewStyle>;

  placeholderTx?: string;

  placeholderTxOptions?: object;

  valueTx?: string;
  valueTxOption?: object;

  activeTintBorderColor?: string;

  errorBorderColor?: string;

  title?: string;

  titleTx?: string;

  titleStyle?: StyleProp<TextStyle>;

  errorMessage?: string;

  errorMessageTx?: string;

  errorMessageTxOptions?: object;

  errorStyle?: StyleProp<TextStyle>;

  textAlign?: 'left' | 'right' | 'center';

  backgroundColor?: string;

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

  searching?: boolean;

  inputRef?: (r: any) => void;
}
