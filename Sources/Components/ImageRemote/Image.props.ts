import {ImageStyle, ViewStyle, StyleProp, ImageResizeMode, ImageURISource, ImageSourcePropType} from 'react-native';
import {DownloadOptions} from './CacheManager';

export interface ImageRemoteProps {
  style?: StyleProp<ImageStyle>;

  containerStyle?: StyleProp<ViewStyle>;

  imageURL: string;

  defaultSource?: ImageURISource | number;

  width?: number;

  height?: number;

  borderRadius?: number;

  backgroundColor?: string;

  preview?: ImageSourcePropType;

  resizeMode?: ImageResizeMode;

  tintColor?: string;

  transitionDuration?: number;

  options?: DownloadOptions;

  tint?: 'dark' | 'light';

  onError?: (error: {nativeEvent: {error: Error}}) => void;

  aspectRatio?: number;
}
