import {FlexAlignType, LayoutChangeEvent, StyleProp, ViewStyle} from 'react-native';

type Direction = 'row' | 'column' | 'column-reverse' | 'row-reverse';

type JustifyContent = 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'space-evenly';

type Position = 'absolute' | 'relative';

type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';

type OverFlow = 'visible' | 'hidden' | 'scroll';

export interface RowProps {
  onPress?: () => void;

  alignVertical?: FlexAlignType;

  alignHorizontal?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

  flexWrap?: FlexWrap;

  left?: number | string;

  right?: number | string;

  bottom?: number | string;

  top?: number | string;

  zIndex?: number;

  overflow?: OverFlow;

  borderBottomWidth?: number;

  borderEndWidth?: number | string;

  borderLeftWidth?: number;

  borderRightWidth?: number;

  borderStartWidth?: number | string;

  borderTopWidth?: number;

  borderBottomColor?: string;

  borderBottomEndRadius?: number;

  borderBottomLeftRadius?: number;

  borderBottomRightRadius?: number;

  borderBottomStartRadius?: number;

  borderEndColor?: string;

  borderLeftColor?: string;

  borderRightColor?: string;

  borderStartColor?: string;

  borderStyle?: 'solid' | 'dotted' | 'dashed';

  borderTopColor?: string;

  borderTopEndRadius?: number;

  borderTopLeftRadius?: number;

  borderTopRightRadius?: number;

  borderTopStartRadius?: number;

  opacity?: number;

  position?: Position;

  block?: boolean;

  flex?: number;

  alignItems?: FlexAlignType;

  alignSelf?: 'auto' | FlexAlignType;

  margin?: number;

  marginLeft?: number;

  marginRight?: number;

  marginBottom?: number;

  marginTop?: number;

  marginHorizontal?: number;

  marginVertical?: number;

  direction?: Direction;

  padding?: number;

  paddingTop?: number;

  paddingBottom?: number;

  paddingLeft?: number;

  paddingRight?: number;

  paddingHorizontal?: number;

  paddingVertical?: number;

  width?: number | string;

  height?: number | string;

  border?: boolean;

  borderWidth?: number;

  borderColor?: string;

  color?: string;

  justifyContent?: JustifyContent;

  middle?: boolean;

  borderRadius?: number;

  shadow?: boolean;

  style?: StyleProp<ViewStyle>;

  children?: React.ReactNode;

  onLayout?: (event: LayoutChangeEvent) => void;
}
