import {enhance} from '@Common/Helper';
import Touchable from '@Components/Touchable';
import React, {useMemo} from 'react';
import {View, StyleSheet, ViewStyle, Platform, StyleProp, FlexStyle} from 'react-native';
import {RowProps} from './Row.props';

const Row = (props: RowProps) => {
  const {
    alignHorizontal,
    alignVertical,
    alignSelf,
    block,
    margin,
    marginLeft,
    alignItems,
    marginRight,
    marginTop,
    marginBottom,
    direction,
    padding,
    paddingHorizontal,
    paddingVertical,
    marginHorizontal,
    marginVertical,
    width,
    height,
    border,
    borderWidth,
    borderColor,
    color,
    justifyContent,
    middle,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingTop,
    borderRadius,
    shadow,
    flex,
    position,
    flexWrap,
    left,
    right,
    bottom,
    top,
    zIndex,
    overflow,
    borderBottomWidth,
    borderEndWidth,
    borderLeftWidth,
    borderRightWidth,
    borderStartWidth,
    borderTopWidth,
    borderBottomColor,
    borderBottomEndRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderBottomStartRadius,
    borderEndColor,
    borderLeftColor,
    borderRightColor,
    borderStartColor,
    borderStyle,
    borderTopColor,
    borderTopEndRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderTopStartRadius,
    opacity,
    style = {},
    children,
    onLayout,
    onPress,
    ...rest
  } = props;

  const styleComponent = useMemo(
    () =>
      enhance([
        [
          margin && {margin},
          marginLeft && {marginLeft},
          marginRight && {marginRight},
          marginTop && {marginTop},
          marginBottom && {marginBottom},
          marginHorizontal && {marginHorizontal},
          marginVertical && {marginVertical},
          padding && {padding},
          paddingRight && {paddingRight},
          paddingBottom && {paddingBottom},
          paddingLeft && {paddingLeft},
          paddingTop && {paddingTop},
          paddingHorizontal && {paddingHorizontal},
          paddingVertical && {paddingVertical},
          width && {width},
          height && {height},
          border && {
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: '#bbb',
          },
          borderWidth && {borderWidth},
          borderColor && {borderColor},
          color && {backgroundColor: color},
          justifyContent && {justifyContent},
          middle && {alignItems: 'center'},
          alignItems && {alignItems},
          alignSelf && {alignSelf},
          borderRadius && {borderRadius},
          flex && {flex},
          position && {position},
          flexWrap && {flexWrap},
          left !== undefined && {left},
          right !== undefined && {right},
          bottom !== undefined && {bottom},
          top !== undefined && {top},
          overflow && {overflow},
          borderBottomWidth && {borderBottomWidth},
          borderEndWidth && {borderEndWidth},
          borderLeftWidth && {borderLeftWidth},
          borderRightWidth && {borderRightWidth},
          borderStartWidth && {borderStartWidth},
          borderTopWidth && {borderTopWidth},
          borderBottomColor && {borderBottomColor},
          borderBottomEndRadius && {borderBottomEndRadius},
          borderBottomLeftRadius && {borderBottomLeftRadius},
          borderBottomRightRadius && {borderBottomRightRadius},
          borderBottomStartRadius && {borderBottomStartRadius},
          borderEndColor && {borderEndColor},
          borderLeftColor && {borderLeftColor},
          borderRightColor && {borderRightColor},
          borderStartColor && {borderStartColor},
          borderStyle && {borderStyle},
          borderTopColor && {borderTopColor},
          borderTopEndRadius && {borderTopEndRadius},
          borderTopLeftRadius && {borderTopLeftRadius},
          borderTopRightRadius && {borderTopRightRadius},
          borderTopStartRadius && {borderTopStartRadius},
          opacity && {opacity},
          {zIndex},
          style,
        ] as StyleProp<ViewStyle>,
      ]),
    [props],
  );

  const flexStyle: FlexStyle = {
    alignItems: alignVertical,
    justifyContent: alignHorizontal,
    alignSelf: alignSelf,
    flexDirection: 'row',
    flex: flex ? flex : style && StyleSheet.flatten(style).height ? 0 : 0,
  };

  if (onPress && typeof onPress === 'function') {
    return (
      <Touchable onLayout={onLayout} style={styleComponent} onPress={onPress}>
        <View style={flexStyle}>{children}</View>
      </Touchable>
    );
  }

  return (
    <View onLayout={onLayout} style={[flexStyle, styleComponent]}>
      {children}
    </View>
  );
};

export default Row;
