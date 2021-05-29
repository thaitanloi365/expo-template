import React, {FunctionComponent, memo, useMemo} from 'react';
import {HeaderProps} from './Header.props';
import {enhance} from '@Common/Helper';
import Block from '@Components/Block';
import Text from '@Components/Text';
import Icon from '@Components/Icon';
import isEqual from 'react-fast-compare';
import styles from '@Components/Header/Header.presets';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import Touchable from '@Components/Touchable';
import {scale} from '@Common/Scale';
import Row from '@Components/Row';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';

const Header: FunctionComponent<HeaderProps> = props => {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    title,
    titleTx,
    style: styleOverride = {},
    titleStyle: titleStyleOverride = {},
    leftView,
    leftStyle: leftStyleOverride = {},
    leftIconColor,
    leftIconStyle: leftIconStyleOverride = {},
    leftPadding,
    leftPaddingBottom,
    leftPaddingHorizontal = scale(12),
    leftPaddingLeft,
    leftPaddingRight,
    leftPaddingTop,
    leftPaddingVertical,
    rightView,
    rightStyle: rightStyleOverride = {},
    rightIconColor,
    rightIconStyle: rightIconStyleOverride = {},
    rightPadding,
    rightPaddingBottom,
    rightPaddingHorizontal = scale(12),
    rightPaddingLeft,
    rightPaddingRight,
    rightPaddingTop,
    rightPaddingVertical,
    middleStyle: middleStyleOverride = {},
    sticky,
    unsafe = false,
    hasHeaderLayer = false,
    titleView,
    ...rest
  } = props;

  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const statusBarHeight = getStatusBarHeight();
  const titleStyle = useMemo(() => enhance([styles(theme).title, titleStyleOverride]), [titleStyleOverride]);

  const leftStyle = useMemo(
    () =>
      enhance([
        leftStyleOverride,
        leftPaddingBottom && {paddingBottom: leftPaddingBottom},
        leftPaddingHorizontal && {paddingHorizontal: leftPaddingHorizontal},
        leftPaddingLeft && {paddingLeft: leftPaddingLeft},
        leftPaddingRight && {paddingRight: leftPaddingRight},
        leftPaddingTop && {paddingTop: leftPaddingTop},
        leftPaddingVertical && {paddingVertical: leftPaddingVertical},
        leftPadding && {padding: leftPadding},
      ]),
    [
      leftPadding,
      leftPaddingBottom,
      leftPaddingHorizontal,
      leftPaddingLeft,
      leftPaddingRight,
      leftPaddingTop,
      leftPaddingVertical,
    ],
  );

  const leftIconStyle = useMemo(() => enhance([leftIconStyleOverride, leftIconColor && {tintColor: leftIconColor}]), [
    leftIconStyleOverride,
  ]);

  const rightStyle = useMemo(
    () =>
      enhance([
        rightStyleOverride,
        rightPaddingBottom && {paddingBottom: rightPaddingBottom},
        rightPaddingHorizontal && {paddingHorizontal: rightPaddingHorizontal},
        rightPaddingLeft && {paddingLeft: rightPaddingLeft},
        rightPaddingRight && {paddingRight: rightPaddingRight},
        rightPaddingTop && {paddingTop: rightPaddingTop},
        rightPaddingVertical && {paddingVertical: rightPaddingVertical},
        rightPadding && {padding: rightPadding},
      ]),
    [
      rightPadding,
      rightPaddingBottom,
      rightPaddingHorizontal,
      rightPaddingLeft,
      rightPaddingRight,
      rightPaddingTop,
      rightPaddingVertical,
    ],
  );

  const rightIconStyle = useMemo(
    () => enhance([rightIconStyleOverride, rightIconColor && {tintColor: rightIconColor}]),
    [rightIconStyleOverride],
  );

  const middleStyle = useMemo(() => enhance([styles(theme).titleMiddle, middleStyleOverride]), [middleStyleOverride]);

  const style = useMemo(
    () =>
      enhance([
        !unsafe && {marginTop: insets.top},
        sticky && styles(theme).sticky,
        sticky && {paddingTop: statusBarHeight},
        styleOverride,
      ]),
    [styleOverride],
  );

  const renderLeft = () => {
    if (leftIcon) {
      return <Icon style={leftIconStyle} icon={leftIcon} />;
    }

    if (typeof leftView === 'function') {
      return leftView();
    }

    if (React.isValidElement(leftView)) {
      return leftView;
    }
    return <Ionicons name="ios-chevron-back" size={scale(30)} color={theme.colors.text} />;
  };

  const renderTitle = () => {
    if (typeof titleView === 'function') {
      return titleView();
    }

    if (React.isValidElement(titleView)) {
      return titleView;
    }

    return <Text preset="title" style={titleStyle} text={title} tx={titleTx} />;
  };

  const renderRight = () => {
    if (rightIcon) {
      return <Icon style={rightIconStyle} icon={rightIcon} />;
    }

    if (typeof rightView === 'function') {
      return rightView();
    }

    if (React.isValidElement(rightView)) {
      return rightView;
    }
    return null;
  };

  return (
    <>
      {hasHeaderLayer && (
        <Block style={{position: 'absolute', width: '100%', zIndex: 2, bottom: '80%', top: 0}}>
          <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0)']} style={StyleSheet.absoluteFill} />
        </Block>
      )}
      <Row style={style} alignHorizontal="space-between" alignVertical="center" {...rest}>
        <Block>
          <Touchable hitSlop={{left: 12, right: 20, top: 12, bottom: 12}} onPress={onLeftPress}>
            <View style={leftStyle}>{renderLeft()}</View>
          </Touchable>
        </Block>
        <Block block>{renderTitle()}</Block>
        <Block>
          <Touchable hitSlop={{left: 20, right: 12, top: 12, bottom: 12}} onPress={onRightPress}>
            <View style={rightStyle}>{renderRight()}</View>
          </Touchable>
        </Block>
      </Row>
    </>
  );
};
export default memo(Header, isEqual);
