import React, {memo} from 'react';
import {FABDefault} from './Components/FABDefault/FABDefault';
import {FABGroup} from './Components/FABGroup/FABGroup';
import {FABProps} from './FAB.props';
import equals from 'react-fast-compare';

const FAB = (props: FABProps) => {
  const {type = 'default', icon = 'plus', style = {}} = props;
  return type === 'default' ? <FABDefault {...{...props, icon, style}} /> : <FABGroup {...{...props, icon, style}} />;
};
export default memo(FAB, equals);
