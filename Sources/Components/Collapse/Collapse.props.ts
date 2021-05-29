import {FontSizeTypes} from '@Themes';
import {FontWeight, ReactElementFunc} from '@Types';
import {StyleProp, TextStyle, ViewProps, ViewStyle} from 'react-native';

export interface CollapseProps extends ViewProps {
  containerStyle?: StyleProp<ViewStyle>;

  title?: string;

  titleStyle?: StyleProp<TextStyle>;

  titleFontWeight?: FontWeight;

  titleFontSize?: FontSizeTypes;

  titleTx?: string;

  errorMessage?: string;

  errorMessageTx?: string;

  errorMessageTxOptions?: object;

  errorStyle?: StyleProp<TextStyle>;

  subTitle?: string;

  subTitleTx?: string;

  highlightSubTitle?: string;

  disabled?: boolean;

  expanding?: boolean;

  hasTopDivider?: boolean;

  hasBottomDivider?: boolean;

  rightSubComponent?: React.ReactElement | ReactElementFunc;

  children?: React.ReactNode;

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

  onToggle?: (expanding: boolean) => void;

  hasError?: boolean;
}
