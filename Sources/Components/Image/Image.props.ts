import {ImageTypes} from '@Assets/Images';
import {ImageStyle, ViewStyle, StyleProp, ImageResizeMode, FlexAlignType} from 'react-native';

export interface ImageProps {
  style?: StyleProp<ImageStyle>;

  containerStyle?: StyleProp<ViewStyle>;

  source: ImageTypes;

  resizeMode?: ImageResizeMode;

  styleDefault?: StyleProp<ImageStyle>;

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

  alignSelf?: 'auto' | FlexAlignType;

  width?: number;

  height?: number;
}
