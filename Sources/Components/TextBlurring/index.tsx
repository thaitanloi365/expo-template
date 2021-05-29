import {enhance} from '@Common/Helper';
import {scale} from '@Common/Scale';
import Block from '@Components/Block';
import Text from '@Components/Text';
import {TextProps} from '@Components/Text/Text.props';
import {FontSizeDefault} from '@Themes';
import {BlurView} from 'expo-blur';
import React, {memo, useMemo} from 'react';
import isEqual from 'react-fast-compare';
import {StyleProp, StyleSheet, ViewStyle, TouchableOpacity} from 'react-native';

interface Props extends TextProps {
  containerStyle?: StyleProp<ViewStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
  blurTint?: 'dark' | 'light' | 'default';
  blurIntensity?: number;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: scale(10),
    overflow: 'hidden',
  },
  text: {
    fontSize: FontSizeDefault.FONT_14,

    color: 'white',
  },
  textWrap: {},
});
const TextBlurring = (props: Props) => {
  const {
    containerStyle: containerStyleOverride = {},
    blurTint = 'dark',
    blurIntensity = 100,
    onPress,
    style,
    textContainerStyle,
    ...rest
  } = props;
  const containerStyle = useMemo(() => enhance([styles.wrap, containerStyleOverride]), [containerStyleOverride]);
  const textStyle = useMemo(() => enhance([styles.text, style]), [style]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={containerStyle}>
      <BlurView tint={blurTint} intensity={blurIntensity}>
        <Block style={textContainerStyle}>
          <Text {...rest} style={textStyle} />
        </Block>
      </BlurView>
    </TouchableOpacity>
  );
};

export default memo(TextBlurring, isEqual);
