import {TextStyle, ViewStyle, StyleProp} from 'react-native';

export interface OptionData {
  text: string;
  tx?: string;

  value: string;

  isActive?: boolean;

  activeColor?: string;

  itemCallback?: any;
}

export interface ActionSheetProps {
  options?: OptionData[];

  title?: React.ReactNode | string;

  onPressOption?: (item: OptionData, index: number) => void;

  onPressCancel?: Function;

  textCancel?: string;

  onBackDropPress?: Function;

  closeOnBackDrop?: boolean;

  textOptionStyle?: StyleProp<TextStyle>;

  textCancelStyle?: StyleProp<TextStyle>;

  wrapOptionStyle?: StyleProp<ViewStyle>;

  wrapCancelStyle?: StyleProp<ViewStyle>;

  rootStyle?: StyleProp<ViewStyle>;

  backDropColor?: string;

  defaultValue?: string;
}
