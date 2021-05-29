import React, {memo, useRef} from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {ListViewProps} from './ListView.props';
import isEqual from 'react-fast-compare';
import Block from '@Components/Block';
import Screen from '@Components/Screen';

const defaultStyles = StyleSheet.create({
  emptyWrap: {
    position: 'absolute',
    alignSelf: 'center',
    top: '30%',
  },
});
const ListView = (props: ListViewProps) => {
  const ref = useRef<FlatList>(null);

  const {
    onLoadMore,
    onRefresh,
    canRefresh = true,
    canLoadMore = false,
    refreshing = false,
    emptyView,
    emptyViewStyle,
    renderLastItem,
  } = props;
  const loadMore = () => {
    if (canLoadMore && onLoadMore && typeof onLoadMore === 'function') {
      onLoadMore(ref);
    }
  };
  const refresh = () => {
    if (onRefresh && typeof onRefresh === 'function') {
      onRefresh();
    }
  };

  const renderEmptyView = () => {
    if (emptyView && (!props.data || props.data.length === 0)) {
      return <Block style={defaultStyles.emptyWrap}>{typeof emptyView === 'function' ? emptyView() : emptyView}</Block>;
    }

    return null;
  };

  const scrollToEnd = () => {
    ref.current?.scrollToEnd({animated: true});
  };
  return (
    <Block block>
      <FlatList
        ref={ref}
        refreshControl={canRefresh ? <RefreshControl refreshing={refreshing} onRefresh={refresh} /> : undefined}
        onEndReached={loadMore}
        onEndReachedThreshold={0.001}
        {...props}
      />
      {renderEmptyView()}
      {renderLastItem && renderLastItem()}
    </Block>
  );
};

export default memo(ListView, isEqual);

export * from './ListView.props';
