import React, {memo} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {RadioButtonProps} from './RadioButton.props';
import Animated, {interpolate} from 'react-native-reanimated';
import {interpolateColor, useTimingTransition} from '@Animated';
import isEqual from 'react-fast-compare';
import {useTheme} from '@react-navigation/native';

const SIZE = 30;
const STROKE_WIDTH = 3;
const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

const RadioButton = (props: RadioButtonProps) => {
  const theme = useTheme();
  const {
    value = false,
    activeColor = theme.colors.primary,
    unActiveColor = theme.colors.border,
    strokeWidth = STROKE_WIDTH,
    sizeDot = SIZE - 10,
    onPress,
  } = props;
  const progress = useTimingTransition(value, {duration: 100});
  const size = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, sizeDot - strokeWidth],
  });
  const color = interpolateColor(
    progress,
    {
      inputRange: [0, 1],
      outputRange: [unActiveColor, activeColor],
    },
    'rgb',
  );
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          styles.wrap,
          {
            borderColor: color as any,
            width: sizeDot + 10,
            height: sizeDot + 10,
            borderRadius: (sizeDot + 10) / 2,
            borderWidth: strokeWidth,
          },
        ]}>
        <Animated.View
          pointerEvents={'none'}
          style={[
            styles.dot,
            {
              width: size,
              height: size,
              borderRadius: (sizeDot - strokeWidth) / 2,
              backgroundColor: color as any,
            },
          ]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default memo(RadioButton, isEqual);
