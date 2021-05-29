import {FlatListProps, StyleProp, ViewStyle} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

export type ListViewRef = React.RefObject<FlatList<any>>;

type FuncElement = () => JSX.Element;
export interface ListViewProps extends FlatListProps<any> {
  /**
   * Function when scroll to end
   * @default undefined
   */
  onLoadMore?: (ref: ListViewRef) => void;

  /**
   * Enable to load more when scroll to end
   * @default false
   */
  canLoadMore?: boolean;

  /**
   * State of Refresh Control
   * @default false
   */
  refreshing?: boolean;

  /**
   * Enable to render Refresh Control
   * @default true
   */
  canRefresh?: boolean;

  emptyView?: JSX.Element | FuncElement;

  emptyViewStyle?: StyleProp<ViewStyle>;

  renderLastItem?: () => void;
}
