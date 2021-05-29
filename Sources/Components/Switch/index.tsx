import React, {memo, useMemo} from 'react';
import {TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {SwitchProps} from './Switch.props';
import Animated, {useCode, set, Easing, interpolate} from 'react-native-reanimated';
import {ColorDefault} from '@Themes';
import {enhance} from '@Common/Helper';
import isEqual from 'react-fast-compare';
import {interpolateColor, timing} from '@Common/Animated';

// dimensions
const THUMB_SIZE = 20;
const WIDTH = 40;
const MARGIN = 2;
const OFF_POSITION = -0.5;
const ON_POSITION = WIDTH - THUMB_SIZE - MARGIN;
const BORDER_RADIUS = (THUMB_SIZE * 3) / 4;

// colors
const ON_COLOR = ColorDefault.primary;
const OFF_COLOR = ColorDefault.background;
const BORDER_ON_COLOR = ON_COLOR;
const BORDER_OFF_COLOR = 'rgba(0, 0, 0, 0.1)';

// animation
const DURATION = 250;

const styles = StyleSheet.create({
  track: {
    height: THUMB_SIZE + MARGIN,
    width: WIDTH,
    borderRadius: BORDER_RADIUS,
    borderWidth: MARGIN / 2,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderColor: BORDER_OFF_COLOR,
    borderRadius: THUMB_SIZE / 2,
    borderWidth: MARGIN / 2,
    backgroundColor: '#FFFFFF',
    shadowColor: BORDER_OFF_COLOR,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
});

const SwitchComponent = (props: SwitchProps) => {
  const {
    onToggle,
    style: overwriteStyle,
    thumbOffStyle,
    thumbOnStyle,
    trackOffStyle,
    trackOnStyle,
    disabled,
    value = false,
  } = props;
  const timer = new Animated.Value(value ? 0 : 1);
  useCode(
    () => [
      set(
        timer,
        timing({
          from: value ? 0 : 1,
          to: value ? 1 : 0,
          easing: Easing.out(Easing.circle),
          duration: DURATION,
        }),
      ),
    ],
    [value],
  );

  const handlePress = useMemo(() => () => onToggle && onToggle(!value), [onToggle, value]);

  const translateX = interpolate(timer, {
    inputRange: [0, 1],
    outputRange: [OFF_POSITION, ON_POSITION],
  });
  const bgTrackColor = interpolateColor(timer, {
    inputRange: [0, 1],
    outputRange: [OFF_COLOR, ON_COLOR],
  });
  const borderColor = interpolateColor(timer, {
    inputRange: [0, 1],
    outputRange: [BORDER_OFF_COLOR, BORDER_ON_COLOR],
  });
  const style = useMemo(() => enhance([{}, overwriteStyle]), [overwriteStyle]);

  const trackStyle = useMemo(
    () =>
      enhance([
        styles.track,
        {
          backgroundColor: bgTrackColor,
          borderColor: borderColor,
        },
        value ? trackOnStyle : trackOffStyle,
      ]),
    [value],
  );

  const thumbStyle = useMemo(
    () =>
      enhance([
        styles.thumb,
        {
          transform: [{translateX}],
        },
        value ? thumbOnStyle : thumbOffStyle,
      ]),
    [value],
  );

  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={handlePress} style={style}>
      <Animated.View style={trackStyle}>
        <Animated.View style={thumbStyle} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
export default memo(SwitchComponent, isEqual);
