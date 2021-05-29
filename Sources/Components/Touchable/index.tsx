import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import {Platform, TouchableNativeFeedback, TouchableOpacity, Touchable as RNTouchable, View} from 'react-native';
import {TouchableProps} from './Touchable.props';

const Touchable = (props: TouchableProps) => {
  const {onPress, children, activeOpacity = 0.7, rippleRadius, style, ...rest} = props;

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        {...rest}
        background={rippleRadius ? {rippleRadius, borderless: true, type: 'RippleAndroid'} : undefined}
        onPress={onPress}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity style={style} activeOpacity={activeOpacity} onPress={onPress} {...rest}>
      {children}
    </TouchableOpacity>
  );
};

export default memo(Touchable, isEqual);
