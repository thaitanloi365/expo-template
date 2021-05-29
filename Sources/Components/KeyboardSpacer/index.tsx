import Block from '@Components/Block';
import {BlockProps} from '@Components/Block/Block.props';
import React, {memo, useEffect, useState} from 'react';
import isEqual from 'react-fast-compare';
import {LayoutAnimationConfig, StyleSheet} from 'react-native';
import {Keyboard, LayoutAnimation, Platform, UIManager, View, KeyboardEvent, Dimensions} from 'react-native';

interface Props extends BlockProps {
  keyboardTopOffset?: number;
  onShow?: (keyboardSpace: number, keyboardTopOffset: number) => void;
  onHide?: (keyboardTopOffset: number) => void;
}

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const KeyboardSpacer = (props: Props) => {
  const {keyboardTopOffset = 0, onShow, onHide, style, ...rest} = props;
  const [keyboardSpace, setKeyboardSpace] = useState(0);
  const isAndroid = Platform.OS === 'android';

  const animationConfig: LayoutAnimationConfig = isAndroid
    ? LayoutAnimation.Presets.easeInEaseOut
    : {
        duration: 250,
        create: {
          type: LayoutAnimation.Types.keyboard,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          delay: 0,
          type: LayoutAnimation.Types.keyboard,
          property: LayoutAnimation.Properties.opacity,
        },
        delete: {
          type: LayoutAnimation.Types.keyboard,
          property: LayoutAnimation.Properties.opacity,
        },
      };

  useEffect(() => {
    if (Platform.OS == 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const updateListener = isAndroid ? 'keyboardDidShow' : 'keyboardWillShow';
    const resetListener = isAndroid ? 'keyboardDidHide' : 'keyboardWillHide';

    const listeners = [
      Keyboard.addListener(updateListener, updateKeyboardSpace),
      Keyboard.addListener(resetListener, resetKeyboardSpace),
    ];

    return () => {
      listeners && listeners.forEach(listener => listener.remove());
    };
  }, []);

  useEffect(() => {
    if (keyboardSpace > 0) {
      onShow && onShow(keyboardSpace, keyboardTopOffset);
    } else {
      onHide && onHide(keyboardTopOffset);
    }
  }, [keyboardSpace]);

  const updateKeyboardSpace = (event: KeyboardEvent) => {
    if (!event.endCoordinates) {
      return;
    }

    LayoutAnimation.configureNext(animationConfig);

    const screenHeight = Dimensions.get('window').height;

    const keyboardTop = event.endCoordinates.screenY;
    const keyboardSpace = screenHeight - keyboardTop + keyboardTopOffset;

    setKeyboardSpace(keyboardSpace);
  };

  const resetKeyboardSpace = (event: KeyboardEvent) => {
    LayoutAnimation.configureNext(animationConfig);

    setKeyboardSpace(0);
  };

  return <Block style={[{width: '100%', height: keyboardSpace}, style]} {...rest} />;
};

export default memo(KeyboardSpacer, isEqual);
