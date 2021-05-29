import {IRowDropDown} from '@Types';
import {StyleProp, ViewStyle, TextStyle, LayoutChangeEvent} from 'react-native';
import Animated from 'react-native-reanimated';

export interface ItemProps {
  item: IRowDropDown;

  index?: number;

  containerStyleItem?: StyleProp<ViewStyle>;

  labelStyle?: StyleProp<TextStyle>;

  activeItemStyle?: StyleProp<ViewStyle>;

  activeLabelStyle?: StyleProp<TextStyle>;

  customTickIcon?: () => React.ReactNode;

  selected: boolean;

  onPressItem: (value: string) => void;
}

export interface DropDownProps
  extends Pick<
    ItemProps,
    'containerStyleItem' | 'labelStyle' | 'activeItemStyle' | 'activeLabelStyle' | 'customTickIcon'
  > {
  data: Array<IRowDropDown>;

  defaultValue?: Array<string> | string;

  placeHolder?: string;

  placeholderStyle?: StyleProp<TextStyle>;

  style?: StyleProp<ViewStyle>;

  backgroundColor?: string;

  dropDownStyle?: StyleProp<ViewStyle>;

  containerStyle?: StyleProp<ViewStyle>;

  showArrow?: boolean;

  renderArrow?: (progress: Animated.Node<number>) => React.ReactNode;

  disabled?: boolean;

  multiple?: boolean;

  multipleText?: string;

  searchable?: boolean;

  searchableStyle?: boolean;

  searchableError?: boolean;

  flex?: number;

  margin?: number;

  marginLeft?: number;

  marginRight?: number;

  marginBottom?: number;

  marginTop?: number;

  marginHorizontal?: number;

  marginVertical?: number;

  padding?: number;

  paddingTop?: number;

  paddingBottom?: number;

  paddingLeft?: number;

  paddingRight?: number;

  paddingHorizontal?: number;

  paddingVertical?: number;

  onOpen?: () => void;

  onClose?: () => void;

  onSelected?: (value: string | string[]) => void;

  errorMessage?: string;

  errorMessageTx?: string;

  errorMessageTxOptions?: object;

  errorMessageStyle?: StyleProp<TextStyle>;

  onLayout?: (e: LayoutChangeEvent) => void;

  dropdownRef?: (ref: any) => void;
}
