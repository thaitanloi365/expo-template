import {enhance} from '@Common/Helper';
import Block from '@Components/Block';
import KeyboardSpacer from '@Components/KeyboardSpacer';
import React, {forwardRef, memo, useImperativeHandle, useMemo, useRef, useState} from 'react';
import isEqual from 'react-fast-compare';
import {
  ScrollView,
  Dimensions,
  StatusBar,
  ViewStyle,
  LayoutChangeEvent,
  LayoutRectangle,
  Platform,
  UIManager,
  findNodeHandle,
  View,
  StyleSheet,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScreenProps} from './Screen.props';
import icons from '@Assets/Icons';
import styles from './Screen.presets';
import Header from '@Components/Header';
import {LinearGradient} from 'expo-linear-gradient';
import Row from '@Components/Row';
import Touchable from '@Components/Touchable';
import {verticalScale} from '@Common/Scale';

const {height} = Dimensions.get('window');

type SmartScrollItemLayoutRef = {
  layout: LayoutRectangle;
  ref: any;
};
type SmartScrollItemMap = {
  [key: string]: SmartScrollItemLayoutRef;
};

export type ScreenRef = {
  scrollToTop: () => void;
  scrollTo: (key: string, offset?: number) => void;
  scrollToPos: (y: number, animated?: boolean) => void;
  focusTo: (key: string, offset?: number) => void;
  scrollAndFocusTo: (key: string, offset?: number) => void;
  registerLayout: (key: string, layoutEvent: LayoutChangeEvent) => void;
  registerRef: (key: string, ref: any) => void;
};

const Screen = forwardRef((props: ScreenProps, ref: any) => {
  const {
    children,
    scroll = false,
    statusBarStyle = 'dark-content',
    statusBarHidden = false,
    statusBarColor,
    statusBarTranslucent = true,
    keyboardShouldPersistTaps = 'handled',
    keyboardDismissMode = 'on-drag',
    fixedHeaderView,
    fixedBottomView,
    fixedBottomViewOffset = 0,
    fixedBottomViewKeyboardSticky = false,
    showsVerticalScrollIndicator = false,
    showsHorizontalScrollIndicator = false,
    scrollContainerStyle: scrollContainerStyleOverride = {},
    scrollContentContainerStyle: scrollContentContainerStyleOverride = {},
    scrollContentBackgroundColor,
    scrollContentMargin,
    scrollContentMarginHorizontal,
    scrollContentMarginVertical,
    scrollContentMarginBottom,
    scrollContentMarginLeft,
    scrollContentMarginRight,
    scrollContentMarginTop,
    scrollContentPadding,
    scrollContentPaddingHorizontal,
    scrollContentPaddingVertical,
    scrollContentPaddingBottom,
    scrollContentPaddingLeft,
    scrollContentPaddingRight,
    scrollContentPaddingTop,
    headerSticky,
    headerTitle,
    headerTitleTx,
    headerLeftIcon,
    headerLeftView,
    headerRightIcon,
    headerRightView,
    headerLeftPadding,
    headerLeftPaddingBottom,
    headerLeftPaddingHorizontal,
    headerLeftPaddingLeft,
    headerLeftPaddingRight,
    headerLeftPaddingTop,
    headerLeftPaddingVertical,
    headerStyle,
    headerLeftOnPress,
    headerRightOnPress,
    headerLeftIconColor,
    headerLeftIconStyle,
    headerRightIconColor,
    headerRightIconStyle,
    headerRightPadding,
    headerRightPaddingBottom,
    headerRightPaddingHorizontal,
    headerRightPaddingLeft,
    headerRightPaddingRight,
    headerRightPaddingTop,
    headerRightPaddingVertical,
    headerBackgroundColor,
    hasHeaderLayer = false,
    headerTitleView,
    ...rest
  } = props;

  const itemLayouts = useRef<SmartScrollItemMap>({});
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>();

  let _keyboardHeight = 0;
  let _contentHeight = 0;

  useImperativeHandle(
    ref,
    () => ({
      scrollToTop: () => {
        scrollRef?.current?.scrollTo({x: 0, y: 0});
      },
      scrollTo: (key: string, offset = 0) => {
        scrollTo(key, offset);
      },
      focusTo: (key: string) => {
        focusTo(key);
      },
      scrollAndFocusTo: (key: string, offset = 0) => {
        scrollAndFocusTo(key, offset);
      },
      scrollToPos: (y: number, animated = true) => {
        scrollToPos(y, animated);
      },
      registerLayout: (key: string, layoutEvent: LayoutChangeEvent) => {
        if (layoutEvent?.nativeEvent?.layout) {
          itemLayouts.current[key] = {
            ...(itemLayouts.current[key] || {}),
            layout: layoutEvent?.nativeEvent?.layout,
          };
        }
      },
      registerRef: (key: string, ref: any) => {
        if (ref) {
          itemLayouts.current[key] = {
            ...(itemLayouts.current[key] || {}),
            ref,
          };
        }
      },
    }),
    [],
  );

  const scrollToPos = (y: number, animated = true) => {
    scrollRef?.current?.scrollTo({
      x: 0,
      y,
      animated,
    });
  };

  const scrollTo = (key: string, offset = 0) => {
    const item = itemLayouts.current[key];
    console.log(`**** scrollTo key=${key} offset=${offset}`, item);
    if (!key || !item || !item.layout || !scrollRef.current) return;

    item.ref?.measureLayout(findNodeHandle(scrollRef.current as any), (x: number, y: number, w: number, h: number) => {
      const xPos = 0;
      const yPos = y + offset - (item.layout?.height || h || 0);
      console.log('**** scrollTo findNodeHandle', {x, y, w, h, xPos, yPos});
      setTimeout(
        () =>
          scrollRef?.current?.scrollTo({
            x: 0,
            y: yPos,
          }),
        250,
      );
    });
  };

  const focusTo = (key: string) => {
    const item = itemLayouts.current[key];
    console.log(`**** focusTo key=${key}`, item);
    if (!key || !item || !item.layout) return;
    typeof item.ref?.focus === 'function' && !item.ref?.isFocused() && item.ref?.focus();
  };

  const scrollAndFocusTo = (key: string, offset = 0) => {
    const item = itemLayouts.current[key];
    console.log(`**** scrollAndFocusTo key=${key} offset=${offset}`, item);
    if (!key || !item || !scrollRef.current) return;

    typeof item.ref?.focus === 'function' && !item.ref?.isFocused() && item.ref?.focus();

    item.ref?.measureLayout(findNodeHandle(scrollRef.current as any), (x: number, y: number, w: number, h: number) => {
      const xPos = 0;
      const yPos = y + offset - (item.layout?.height || h || 0);
      console.log('**** scrollTo findNodeHandle', {x, y, w, h, xPos, yPos});
      setTimeout(
        () =>
          scrollRef?.current?.scrollTo({
            x: 0,
            y: yPos,
          }),
        250,
      );
      console.log(scrollRef?.current);
    });
  };

  const onKeyboardShow = (height: number, topOffset: number) => {
    _keyboardHeight = height;
  };

  const onContentSizeChange = (w: number, h: number) => {
    _contentHeight = h;
    if (!scroll) {
      const shouldScroll = h > height - _keyboardHeight;
      scrollRef.current?.setNativeProps({scrollEnabled: shouldScroll});
    }
  };

  const onLayout = (event: LayoutChangeEvent) => {
    if (!scroll && event.nativeEvent.layout) {
      const h = event.nativeEvent.layout.height;
      const shouldScroll = _contentHeight > h;
      scrollRef.current?.setNativeProps({scrollEnabled: shouldScroll});
    }
  };
  const scrollContentContainerStyle: ViewStyle = useMemo(
    () =>
      enhance([
        scrollContainerStyle,
        scrollContentBackgroundColor && {backgroundColor: scrollContentBackgroundColor},
        scrollContentMargin && {margin: scrollContentMargin},
        scrollContentMarginVertical && {paddingVertical: scrollContentMarginVertical},
        scrollContentMarginHorizontal && {paddingHorizontal: scrollContentMarginHorizontal},
        scrollContentMarginBottom && {marginBottom: scrollContentMarginBottom},
        scrollContentMarginLeft && {marginLeft: scrollContentMarginLeft},
        scrollContentMarginRight && {marginRight: scrollContentMarginRight},
        scrollContentMarginTop && {marginTop: scrollContentMarginTop},
        scrollContentPadding && {padding: scrollContentPadding},
        scrollContentPaddingVertical && {paddingVertical: scrollContentPaddingVertical},
        scrollContentPaddingHorizontal && {paddingHorizontal: scrollContentPaddingHorizontal},
        scrollContentPaddingBottom && {paddingBottom: scrollContentPaddingBottom},
        scrollContentPaddingLeft && {paddingLeft: scrollContentPaddingLeft},
        scrollContentPaddingRight && {paddingRight: scrollContentPaddingRight},
        scrollContentPaddingTop && {paddingTop: scrollContentPaddingTop},
      ]),
    [
      scrollContentContainerStyleOverride,
      scrollContentBackgroundColor,
      scrollContentMargin,
      scrollContentMarginVertical,
      scrollContentMarginHorizontal,
      scrollContentMarginBottom,
      scrollContentMarginLeft,
      scrollContentMarginRight,
      scrollContentMarginTop,
      scrollContentPadding,
      scrollContentPaddingVertical,
      scrollContentPaddingHorizontal,
      scrollContentPaddingBottom,
      scrollContentPaddingLeft,
      scrollContentPaddingRight,
      scrollContentPaddingTop,
    ],
  );

  const scrollContainerStyle: ViewStyle = useMemo(() => enhance([styles.scrollWrap]), [scrollContainerStyleOverride]);

  const renderHeaderView = () => {
    if (typeof fixedHeaderView === 'function') {
      return fixedHeaderView();
    }

    if (React.isValidElement(fixedHeaderView)) {
      return fixedHeaderView;
    }

    const hasHeader =
      (!!headerLeftIcon && headerLeftIcon in icons) ||
      (!!headerRightIcon && headerRightIcon in icons) ||
      !!headerTitle ||
      !!headerTitleTx ||
      typeof headerLeftView === 'function' ||
      React.isValidElement(headerLeftView) ||
      typeof headerRightView === 'function' ||
      React.isValidElement(headerRightView);

    if (hasHeader) {
      return (
        <Header
          sticky={headerSticky}
          color={headerBackgroundColor}
          style={headerStyle}
          unsafe={statusBarTranslucent}
          leftIcon={headerLeftIcon}
          leftPadding={headerLeftPadding}
          leftPaddingBottom={headerLeftPaddingBottom}
          leftPaddingTop={headerLeftPaddingTop}
          leftPaddingLeft={headerLeftPaddingLeft}
          leftPaddingRight={headerLeftPaddingRight}
          leftPaddingHorizontal={headerLeftPaddingHorizontal}
          leftPaddingVertical={headerLeftPaddingVertical}
          leftIconStyle={enhance([headerLeftIconStyle, headerLeftIconColor && {tintColor: headerLeftIconColor}])}
          leftView={headerLeftView}
          onLeftPress={headerLeftOnPress}
          rightIcon={headerRightIcon}
          rightPadding={headerRightPadding}
          rightPaddingBottom={headerRightPaddingBottom}
          rightPaddingTop={headerRightPaddingTop}
          rightPaddingLeft={headerRightPaddingLeft}
          rightPaddingRight={headerRightPaddingRight}
          rightPaddingHorizontal={headerRightPaddingHorizontal}
          rightPaddingVertical={headerRightPaddingVertical}
          rightIconStyle={enhance([headerRightIconStyle, headerRightIconColor && {tintColor: headerRightIconColor}])}
          rightView={headerRightView}
          onRightPress={headerRightOnPress}
          titleTx={headerTitleTx}
          title={headerTitle}
          hasHeaderLayer={hasHeaderLayer}
          titleView={headerTitleView}
        />
      );
    }

    return null;
  };

  const renderBottomView = () => {
    return (
      <Block paddingBottom={insets.bottom / 2}>
        {typeof fixedBottomView === 'function' ? fixedBottomView() : fixedBottomView}
      </Block>
    );
  };

  return (
    <Block {...rest} block>
      <StatusBar
        hidden={statusBarHidden}
        backgroundColor={statusBarColor}
        translucent={statusBarTranslucent}
        barStyle={statusBarStyle}
      />

      {!hasHeaderLayer && renderHeaderView()}

      <ScrollView
        ref={scrollRef as any}
        style={scrollContainerStyle}
        contentContainerStyle={scrollContentContainerStyle}
        scrollEnabled={scroll}
        onContentSizeChange={onContentSizeChange}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        keyboardDismissMode={keyboardDismissMode}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        onLayout={onLayout}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        bounces={false}
        stickyHeaderIndices={hasHeaderLayer ? [0] : undefined}>
        {hasHeaderLayer && (
          <Block
            style={{
              position: 'absolute',
              width: '100%',
              zIndex: 2,
              elevation: 2,
              top: 0,
              height: '5%',
            }}>
            <Block
              style={{
                position: 'absolute',
                width: '100%',
                zIndex: 2,
                elevation: 2,
                top: 0,
                bottom: 0,
              }}>
              <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0)']} style={StyleSheet.absoluteFill} />
            </Block>

            <Row
              style={{
                zIndex: 3,
                elevation: 3,
                paddingTop: insets.top,
                paddingHorizontal: verticalScale(20),
              }}
              alignHorizontal="space-between"
              alignVertical="center"
              {...rest}>
              <Block>
                <Touchable hitSlop={{left: 12, right: 20, top: 12, bottom: 12}} onPress={headerLeftOnPress}>
                  <View>{headerLeftView}</View>
                </Touchable>
              </Block>
              <Block block></Block>
              <Block>
                <Touchable hitSlop={{left: 20, right: 12, top: 12, bottom: 12}} onPress={headerRightOnPress}>
                  <View>{headerRightView}</View>
                </Touchable>
              </Block>
            </Row>
          </Block>
        )}

        {children}
        {!fixedBottomViewKeyboardSticky && <KeyboardSpacer />}
      </ScrollView>
      {renderBottomView()}
      {fixedBottomViewKeyboardSticky && (
        <KeyboardSpacer
          onShow={onKeyboardShow}
          onHide={offset => onKeyboardShow(0, offset)}
          keyboardTopOffset={-insets.bottom + fixedBottomViewOffset}
        />
      )}
    </Block>
  );
});

export default memo(Screen, isEqual);
