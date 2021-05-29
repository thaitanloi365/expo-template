import {ViewStyle, StyleProp, StatusBarStyle, ImageStyle} from 'react-native';
import {IconTypes} from '@Assets/Icons';
import {BlockProps} from '@Components/Block/Block.props';
import {ReactElementFunc} from '@Types';

export interface ScreenProps extends BlockProps {
  scroll?: boolean;

  children?: React.ReactElement | React.ReactElement[] | JSX.Element | JSX.Element[] | React.ReactNode;

  headerStyle?: StyleProp<ViewStyle>;

  headerSticky?: boolean;

  headerBackgroundColor?: string;

  headerLeftIcon?: IconTypes;

  headerLeftPadding?: number;

  headerLeftPaddingLeft?: number;

  headerLeftPaddingTop?: number;

  headerLeftPaddingRight?: number;

  headerLeftPaddingBottom?: number;

  headerLeftPaddingVertical?: number;

  headerLeftPaddingHorizontal?: number;

  headerLeftIconStyle?: StyleProp<ImageStyle>;

  headerLeftIconColor?: string;

  headerLeftOnPress?: () => void;

  headerLeftView?: React.ReactElement | ReactElementFunc;

  headerRightIcon?: IconTypes;

  headerRightPadding?: number;

  headerRightPaddingLeft?: number;

  headerRightPaddingTop?: number;

  headerRightPaddingRight?: number;

  headerRightPaddingBottom?: number;

  headerRightPaddingVertical?: number;

  headerRightPaddingHorizontal?: number;

  headerRightIconStyle?: StyleProp<ImageStyle>;

  headerRightIconColor?: string;

  headerRightOnPress?: () => void;

  headerRightView?: React.ReactElement | ReactElementFunc;

  headerTitleView?: React.ReactElement | ReactElementFunc;

  headerTitleTx?: string;

  headerTitle?: string;

  fixedHeaderView?: React.ReactElement | ReactElementFunc;

  fixedBottomView?: React.ReactElement | ReactElementFunc;

  fixedBottomViewKeyboardSticky?: boolean;

  fixedBottomViewOffset?: number;

  statusBarHidden?: boolean;

  statusBarColor?: string;

  statusBarTranslucent?: boolean;

  statusBarStyle?: StatusBarStyle;

  style?: StyleProp<ViewStyle>;

  backgroundColor?: string;

  scrollContainerStyle?: StyleProp<ViewStyle>;

  scrollContentContainerStyle?: StyleProp<ViewStyle>;

  scrollContentPadding?: number;

  scrollContentPaddingHorizontal?: number;

  scrollContentPaddingVertical?: number;

  scrollContentPaddingTop?: number;

  scrollContentPaddingLeft?: number;

  scrollContentPaddingRight?: number;

  scrollContentPaddingBottom?: number;

  scrollContentMargin?: number;

  scrollContentMarginHorizontal?: number;

  scrollContentMarginVertical?: number;

  scrollContentMarginTop?: number;

  scrollContentMarginLeft?: number;

  scrollContentMarginRight?: number;

  scrollContentMarginBottom?: number;

  scrollContentBackgroundColor?: string;

  showsHorizontalScrollIndicator?: boolean;

  showsVerticalScrollIndicator?: boolean;

  keyboardDismissMode?: 'none' | 'interactive' | 'on-drag';

  keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled';

  hasHeaderLayer?: boolean;
}
