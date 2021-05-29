import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {ImageStyle, Image as RNImage, Animated, Platform, StyleProp, StyleSheet, ActivityIndicator} from 'react-native';
import {ImageRemoteProps} from './Image.props';
import equals from 'react-fast-compare';
import CacheManager from './CacheManager';
import {BlurView} from 'expo-blur';
import _ from 'lodash';
import {enhance} from '@Common/Helper';
import Block from '@Components/Block';
import {AppTheme} from '@Types';
import {useTheme} from '@react-navigation/native';

const defaultStyles = StyleSheet.create({
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  loadingWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ImageRemote = (props: ImageRemoteProps) => {
  const {
    style: styleOverride = {},
    onError,
    resizeMode = 'cover',
    transitionDuration = 300,
    imageURL,
    preview,
    containerStyle: containerStyleOverride,
    tintColor,
    tint = 'dark',
    width,
    height,
    borderRadius,
    backgroundColor,
    aspectRatio,
    options = {},
  } = props;
  const theme: AppTheme = useTheme();
  const intensity = new Animated.Value(100);
  const [uri, setUri] = useState(imageURL);
  const [loading, setLoading] = useState(!!imageURL);

  const style = useMemo(
    () => enhance([defaultStyles.image, styleOverride, tintColor && {tintColor}, resizeMode && {resizeMode}]),
    [styleOverride],
  );
  const containerStyle = useMemo(
    () =>
      enhance([
        defaultStyles.wrap,
        containerStyleOverride,
        width && {width},
        height && {height},
        backgroundColor && {backgroundColor},
        borderRadius && {borderRadius},
      ]),
    [containerStyleOverride, width, height, backgroundColor, borderRadius],
  );

  async function load() {
    if (imageURL) {
      if (imageURL.startsWith('file')) {
        setUri(imageURL);
        Animated.timing(intensity, {
          duration: transitionDuration,
          toValue: 0,
          useNativeDriver: true,
        }).start();
        setLoading(false);

        return;
      } else if (imageURL.startsWith('data:')) {
        setUri(imageURL);
        Animated.timing(intensity, {
          duration: transitionDuration,
          toValue: 0,
          useNativeDriver: true,
        }).start();
        setLoading(false);
        return;
      } else if (!imageURL.startsWith('http')) {
        setUri(imageURL);
        Animated.timing(intensity, {
          duration: transitionDuration,
          toValue: 0,
          useNativeDriver: true,
        }).start();
        setLoading(false);
        return;
      }
      try {
        const path = await CacheManager.get(imageURL, options).getPath();

        if (path) {
          setUri(path);

          Animated.timing(intensity, {
            duration: transitionDuration,
            toValue: 0,
            useNativeDriver: true,
          }).start();
          setLoading(false);
        } else {
          setLoading(false);
          onError && onError({nativeEvent: {error: new Error('Could not load image')}});
        }
      } catch (error) {
        console.log('*** error', error);
        onError && onError({nativeEvent: {error}});
        setLoading(false);
      }
    }
    setLoading(false);
  }

  const loadFunc = useCallback(async () => {
    await load();
  }, [load]);

  useEffect(() => {
    setLoading(true);
    loadFunc();
  }, [imageURL, uri]);

  const opacity = intensity.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 0.5],
  });

  const computedStyle: any = [
    style,
    aspectRatio && {aspectRatio},
    _.transform(
      _.pickBy(style, (_val, key) => propsToCopy.indexOf(key) !== -1),
      (result, value: any, key) => Object.assign(result, {[key]: value - (style.borderWidth || 0)}),
    ),
  ];

  const onLoadEnd = () => {
    setLoading(false);
    Animated.timing(intensity, {
      duration: transitionDuration * 10,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const renderImage = () => {
    if (!!uri) {
      return (
        <RNImage
          onLoadEnd={onLoadEnd}
          resizeMode={resizeMode}
          source={{uri}}
          style={{...computedStyle, tintColor: tintColor}}
        />
      );
    }

    if (!!preview) {
      return (
        <RNImage
          onLoadEnd={onLoadEnd}
          source={preview}
          resizeMode={resizeMode}
          style={computedStyle}
          blurRadius={Platform.OS === 'android' ? 0.5 : 0}
        />
      );
    }

    if (Platform.OS === 'ios') {
      return (
        <AnimatedBlurView style={computedStyle} {...{intensity, tint}}>
          <Block style={defaultStyles.loadingWrap}>
            <ActivityIndicator color={theme.colors.text} />
          </Block>
        </AnimatedBlurView>
      );
    }

    return (
      <Animated.View style={[computedStyle, {backgroundColor: tint === 'dark' ? black : white, opacity}]}>
        <Block style={defaultStyles.loadingWrap}>
          <ActivityIndicator color={theme.colors.text} />
        </Block>
      </Animated.View>
    );
  };

  return (
    <Block style={containerStyle}>
      {renderImage()}
      {loading && (
        <Block style={defaultStyles.loadingWrap}>
          <ActivityIndicator style={{position: 'absolute', alignSelf: 'center'}} color={theme.colors.text} />
        </Block>
      )}
    </Block>
  );
};

export default memo(ImageRemote, equals);

const black = 'black';
const white = 'white';
const propsToCopy = [
  'borderRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
];

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
