import React, {forwardRef, useImperativeHandle, useState, memo, useCallback, useEffect, useRef} from 'react';
import {StyleSheet, View, Animated, PanResponder} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FontSizeDefault} from '@Themes';
import {ToastConfig, DefaultConfig, colors, toastTypeIcon} from './Toast.props';
import Icon from '@Components/Icon';
import IconButton from '@Components/IconButton';
import {enhance} from '@Common/Helper';
import Text from '@Components/Text';
import isEqual from 'react-fast-compare';
import {scale, verticalScale} from '@Common/Scale';

const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  wrap: {
    width: '90%',
    alignSelf: 'center',
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(8),
    borderRadius: 6,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  borderLeft: {
    borderLeftWidth: 5,
    borderLeftColor: colors.mantis,
  },
  leftIcon: {
    marginRight: scale(5),
    marginLeft: scale(14),
  },
  closeIcon: {
    marginRight: scale(14),
    marginLeft: scale(5),
  },
  contentWrap: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: FontSizeDefault.FONT_16,
    fontWeight: 'bold',
    marginBottom: verticalScale(2),
  },
  message: {
    fontSize: FontSizeDefault.FONT_14,
    paddingTop: verticalScale(2),
    paddingBottom: verticalScale(4),
  },
});

const Toast = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<ToastConfig>(DefaultConfig);
  const inset = useSafeAreaInsets();
  useImperativeHandle(
    ref,
    () => ({
      show: (config: ToastConfig) => {
        setVisible(true);
        setConfig({
          ...DefaultConfig,
          ...config,
        });
      },
      hide: () => {
        setVisible(false);
      },
    }),
    [],
  );

  const [height, setHeight] = useState(60);
  const heightPercent = new Animated.Value(0);
  const bottomOffset = config.bottomOffset || 0;
  const topOffset = config.topOffset || 5;
  const offset = config.position === 'bottom' ? inset.bottom + bottomOffset : inset.top + topOffset;
  const range = [height + 5, -offset];
  const outputRange = config.position === 'bottom' ? range : range.map(i => -i);
  const translateY = heightPercent.interpolate({
    inputRange: [0, 1],
    outputRange: outputRange,
  });

  const opacity = heightPercent.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0, 0.2, 1],
  });
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        const {dy} = gesture;
        let value = 1 + dy / 100;

        if (config.position === 'bottom') {
          value = 1 - dy / 100;
        }

        console.log('onPanResponderMove', value);
        if (value < 1) {
          heightPercent.setValue(value);
        }
      },
      onPanResponderRelease: (event, gesture) => {
        const {dy, vy} = gesture;
        let value = 1 + dy / 100;

        if (config.position === 'bottom') {
          value = 1 - dy / 100;
        }

        console.log('onPanResponderRelease', value);

        if (value < 0.65) {
          Animated.spring(heightPercent, {
            toValue: -2,
            speed: config.position === 'bottom' ? vy : -vy,
            useNativeDriver: true,
          }).start(() => {
            onClose && onClose();
          });
        } else if (value < 0.95) {
          Animated.spring(heightPercent, {
            toValue: 1,
            velocity: vy,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const onLayout = useCallback(event => {
    const {height} = event.nativeEvent.layout;
    setHeight(height);
  }, []);

  const animate = (visible: boolean, callback: Function) => {
    Animated.spring(heightPercent, {
      toValue: visible ? 1 : 0,
      useNativeDriver: true,
      friction: 8,
    }).start(() => callback());
  };

  const onClose = () => {
    animate(false, () => setVisible(false));
  };

  useEffect(() => {
    let cancelTimeout: NodeJS.Timeout | null = null;
    animate(visible, () => {
      if (visible) {
        cancelTimeout = setTimeout(() => animate(false, () => setVisible(false)), config.visibilityTime) as any;
      }
    });

    return () => {
      cancelTimeout && clearTimeout(cancelTimeout);
    };
  }, [visible, heightPercent]);

  const animationStyle = enhance([
    styles.position,
    {
      transform: [{translateY}],
      opacity: opacity,
    },
    !visible && {weight: 0, height: 0},
  ]);

  return (
    <Animated.View onLayout={onLayout} style={animationStyle} {...panResponder.panHandlers}>
      <View style={enhance([styles.wrap, styles.borderLeft])}>
        <Icon style={styles.leftIcon} icon={toastTypeIcon[config.type]} />
        <View style={styles.contentWrap}>
          {config.title !== '' && <Text style={styles.title} text={config.title} />}
          {config.message !== '' && <Text style={styles.message} text={config.message} />}
        </View>
        <IconButton iconSize={24} icon="close" onPress={onClose} />
      </View>
    </Animated.View>
  );
});

export default memo(Toast, isEqual);

export interface ToastRef {
  show(config: ToastConfig): void;
  hide(): void;
}
