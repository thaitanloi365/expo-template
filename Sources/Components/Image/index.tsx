import React, {memo, useMemo} from 'react';
import {ImageStyle, Image as RNImage, StyleSheet} from 'react-native';
import {enhance} from '@Common/Helper';
import equals from 'react-fast-compare';
import Block from '@Components/Block';
import images from '@Assets/Images';
import {ImageProps} from './Image.props';

const defaultStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    resizeMode: 'contain',
  },
});
const Image = (props: ImageProps) => {
  const {
    style: styleOverride = {},
    source,
    styleDefault = {},
    resizeMode = 'contain',
    containerStyle: containerStyleOverride = {},
    width,
    height,
    ...rest
  } = props;

  const containerStyle = useMemo(() => enhance([defaultStyles.container, containerStyleOverride]), [
    containerStyleOverride,
  ]);
  const style = useMemo(() => enhance([defaultStyles.image, styleOverride, width && {width}, height && {height}]), [
    styleOverride,
  ]);

  return (
    <Block {...rest} style={containerStyle}>
      <RNImage resizeMode={resizeMode} style={style} source={images[source || 'default']} {...rest} />
    </Block>
  );
};
export default memo(Image, equals);
