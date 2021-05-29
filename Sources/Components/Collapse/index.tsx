import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import {View, StyleSheet, Animated, LayoutAnimation, UIManager, Platform} from 'react-native';
import Text from '@Components/Text';
import {AppTheme} from '@Types';
import {CollapseProps} from './Collapse.props';
import {enhance} from '@Common/Helper';
import {useTheme} from '@react-navigation/native';
import styles from './Collapse.presets';
import icons from '@Assets/Icons';
import {isEqual} from 'lodash';
import {FontSizeDefault} from '@Themes';
import Block from '@Components/Block';
import Touchable from '@Components/Touchable';

const Collapse = (props: CollapseProps) => {
  const {
    style: styleOverride = {},
    title,
    titleTx,
    subTitle,
    subTitleTx,
    hasTopDivider = false,
    hasBottomDivider = true,
    disabled,
    containerStyle,
    rightSubComponent,
    children,
    paddingBottom = 0,
    margin,
    marginLeft,
    marginRight,
    marginBottom,
    marginTop,
    marginHorizontal,
    marginVertical,
    padding,
    paddingTop,
    paddingLeft,
    paddingRight,
    paddingHorizontal,
    paddingVertical,
    titleFontSize,
    titleFontWeight,
    errorMessage,
    errorMessageTx,
    errorMessageTxOptions,
    errorStyle: errorStyleOverride = {},
    expanding: defaultExpanding = false,
    titleStyle: titleStyleOverride = {},
    onToggle,
    onLayout,
    hasError = false,
  } = props;
  const theme: AppTheme = useTheme();
  const [expanding, setExpanding] = useState(defaultExpanding);
  const rotateValue = useRef(new Animated.Value(expanding ? 1 : 0)).current;

  useEffect(() => {
    if (Platform.OS == 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  });

  useEffect(() => {
    setExpanding(defaultExpanding);
  }, [defaultExpanding]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.timing(rotateValue, {
      toValue: expanding ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [expanding]);

  const _onToggle = () => {
    onToggle && onToggle(!expanding);
    setExpanding(!expanding);
  };

  const onStartShouldSetResponder = () => {
    if (!expanding) {
      _onToggle();
    }
    return !expanding;
  };

  const contentStyle = useMemo(
    () =>
      enhance([
        styles(theme).row,
        hasTopDivider && {
          borderTopColor: theme.colors.border,
          borderTopWidth: StyleSheet.hairlineWidth,
        },
      ]),
    [],
  );

  const rotateStyle = useMemo(
    () =>
      enhance([
        {
          transform: [
            {
              rotate: rotateValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '-180deg'],
              }),
            },
          ],
        },
      ]),
    [rotateValue],
  );

  const childStyle = useMemo(() => enhance([containerStyle, styles(theme).childContainer]), [containerStyle]);

  const style = useMemo(
    () =>
      enhance([
        styleOverride,
        hasBottomDivider && {borderBottomColor: theme.colors.border, borderBottomWidth: StyleSheet.hairlineWidth},

        margin && {margin},
        marginLeft && {marginLeft},
        marginRight && {marginRight},
        marginBottom && {marginBottom},
        marginTop && {marginTop},
        marginHorizontal && {marginHorizontal},
        marginVertical && {marginVertical},
        padding && {padding},
        paddingTop && {paddingTop},
        paddingBottom && {paddingBottom},
        paddingLeft && {paddingLeft},
        paddingRight && {paddingRight},
        paddingHorizontal && {paddingHorizontal},
        paddingVertical && {paddingVertical},
      ]),
    [
      styleOverride,
      margin,
      marginLeft,
      marginRight,
      marginBottom,
      marginTop,
      marginHorizontal,
      marginVertical,
      padding,
      paddingTop,
      paddingLeft,
      paddingRight,
      paddingHorizontal,
      paddingVertical,
      paddingBottom,
    ],
  );

  const titleStyle = useMemo(
    () =>
      enhance([
        styles(theme).title,
        titleStyleOverride,
        titleFontSize && {fontSize: FontSizeDefault[titleFontSize]},
        titleFontWeight && {fontWeight: titleFontWeight},
        hasError && styles(theme).titleErrorStyle,
      ]),
    [titleFontSize, titleFontWeight, titleStyleOverride],
  );
  const renderRightComponent = () => {
    if (typeof rightSubComponent === 'function') {
      return rightSubComponent();
    }

    if (React.isValidElement(rightSubComponent)) {
      return rightSubComponent;
    }
    return null;
  };

  const hasErrorMessage =
    (typeof errorMessage === 'string' && errorMessage.length > 0) ||
    (typeof errorMessageTx === 'string' && errorMessageTx.length > 0);

  const errorStyle = useMemo(() => enhance([styles(theme).error, errorStyleOverride]), [errorStyleOverride]);

  return (
    <View onLayout={onLayout} style={style} onStartShouldSetResponder={onStartShouldSetResponder}>
      <Touchable activeOpacity={0.7} onPress={_onToggle} style={contentStyle}>
        <Text style={titleStyle} text={title} tx={titleTx} />
        <View style={styles(theme).row}>
          {renderRightComponent()}
          {!disabled && (
            <View style={styles(theme).icon}>
              <Animated.Image
                style={[rotateStyle, {tintColor: hasError || hasErrorMessage ? theme.colors.error : theme.colors.text}]}
                source={icons.arrow_down}
              />
            </View>
          )}
        </View>
      </Touchable>
      {(!!subTitle || !!subTitleTx) && <Text style={styles(theme).subTitle} text={subTitle} tx={subTitleTx} />}

      {expanding && (
        <View style={childStyle}>
          <Block>{children}</Block>
        </View>
      )}

      {hasErrorMessage && (
        <Text style={errorStyle} text={errorMessage} tx={errorMessageTx} txOptions={errorMessageTxOptions} />
      )}
    </View>
  );
};

export default memo(Collapse, isEqual);
