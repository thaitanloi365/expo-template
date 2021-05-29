import {TextPresetNames} from './Text.presets';
import {TextStyle, TextProps as TextProperties, StyleProp, FlexAlignType} from 'react-native';
import {FontSizeTypes, FontFamily} from '@Themes';

type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined;
type VerticalAlign = 'auto' | 'bottom' | 'center' | 'top' | undefined;
type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';
type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase';

export interface TextProps extends TextProperties {
  fontStyle?: 'normal' | 'italic';

  letterSpacing?: number;

  lineHeight?: number;

  preset?: TextPresetNames;

  children?: React.ReactNode;

  tx?: string;

  txOptions?: object;

  text?: string;

  flex?: number;

  fontSize?: FontSizeTypes;

  fontWeight?: FontWeight;

  fontFamily?: FontFamily;

  marginHorizontal?: number;

  marginVertical?: number;

  margin?: number;

  marginLeft?: number;

  marginRight?: number;

  marginBottom?: number;

  marginTop?: number;

  padding?: number;

  paddingHorizontal?: number;

  paddingTop?: number;

  paddingBottom?: number;

  paddingLeft?: number;

  paddingRight?: number;

  paddingVertical?: number;

  width?: number | string;

  height?: number | string;

  color?: string;

  center?: boolean;

  textAlign?: TextAlign;

  alignItems?: FlexAlignType;

  alignSelf?: 'auto' | FlexAlignType;

  textAlignVertical?: VerticalAlign;

  textTransform?: TextTransform;

  flexShrink?: number;

  style?: StyleProp<TextStyle>;

  required?: boolean;
}
