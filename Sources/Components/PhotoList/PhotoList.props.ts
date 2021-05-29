import {ImageSourcePropType, StyleProp, ViewStyle} from 'react-native';
import {ReactElementFunc} from '@Types';

export interface PhotoItem {
  photo: string;
  thumbnail: string;
  preview: ImageSourcePropType;
}

export interface PhotoListProps {
  items: PhotoItem[];

  style?: StyleProp<ViewStyle>;

  pageStyle?: StyleProp<ViewStyle>;

  overlayView?: React.ReactNode | ReactElementFunc;

  emptyView?: React.ReactNode | ReactElementFunc;

  width?: number | string;

  height?: number | string;

  backgroundColor?: string;

  previewMode?: boolean;

  aspectRatio?: number;
}
