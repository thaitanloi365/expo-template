import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {DividerProps} from './Divider.props';
import isEqual from 'react-fast-compare';
import Block from '@Components/Block';

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
});

const Divider = (props: DividerProps) => {
  const {height = 1, bg = '#bbb'} = props;
  return <Block height={height * StyleSheet.hairlineWidth} color={bg} style={styles.wrap} />;
};
export default memo(Divider, isEqual);
