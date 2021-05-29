import {LayoutChangeEvent, StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';

export interface Tag {
  label: string;
  value: string;
}

export interface TagsProps {
  style?: StyleProp<ViewStyle>;

  containerStyle?: StyleProp<ViewStyle>;

  buttonStyle?: StyleProp<TextStyle>;

  textStyle?: StyleProp<TextStyle>;

  tags: Tag[];

  onSelected?: (tags: Tag[]) => void;

  defaultTagValues?: string[];

  multiple?: boolean;

  disabled?: boolean;

  errorMessage?: string;

  errorMessageTx?: string;

  errorMessageTxOptions?: object;

  errorStyle?: StyleProp<TextStyle>;

  shouldReset?: boolean;

  onLayout?: (e: LayoutChangeEvent) => void;

  tagsRef?: (ref: any) => void;
}
