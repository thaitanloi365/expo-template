import {FlexWrap, JustifyContent, OverFlow, Position, Direction} from '@Types';
import {ViewStyle, ViewProps, StyleProp, FlexAlignType} from 'react-native';

export type ShadowConfig = {
  shadowColor?: string;
  shadowOffset?: {
    width?: number;
    height?: number;
  };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
};
export interface BlockProps extends ViewProps {
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

  minWidth?: number | string;

  maxWidth?: number | string;

  width?: number | string;

  height?: number | string;

  minHeight?: number | string;

  maxHeight?: number | string;

  border?: boolean;

  borderWidth?: number;

  borderColor?: string;

  color?: string;

  justifyContent?: JustifyContent;

  middle?: boolean;

  borderRadius?: number;

  shadow?: boolean;

  shadowConfig?: ShadowConfig;

  style?: StyleProp<ViewStyle>;

  children?: React.ReactNode;
}
