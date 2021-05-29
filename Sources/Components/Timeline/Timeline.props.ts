import {BlockProps} from '@Components/Block/Block.props';
import {ISwopTrackingStatus, ReactElementFunc} from '@Types';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface TimelineItem {
  time: string;

  title?: string;

  titleTx?: string;

  optionTitleTx?: object;

  description?: string;

  descriptionTx?: string;

  descriptionTxOptions?: object;

  titleTxOptions?: Object | undefined;

  titleStyle?: StyleProp<TextStyle>;

  timeStyle?: StyleProp<TextStyle>;

  contentStyle?: StyleProp<ViewStyle>;

  content?: JSX.Element | ReactElementFunc;

  renderButton?: () => {};

  status?: ISwopTrackingStatus;

  hasDescription?: boolean;
}

export interface TimelineProps extends BlockProps {
  flatListStyle?: StyleProp<ViewStyle>;

  items: TimelineItem[];

  indicatorSize?: number;

  titleStyle?: StyleProp<TextStyle>;

  timeStyle?: StyleProp<TextStyle>;

  contentStyle?: StyleProp<ViewStyle>;

  renderButton?: () => {};

  status?: ISwopTrackingStatus;
}
