import React, {memo, forwardRef, useState, useCallback, useMemo, useEffect, useRef} from 'react';
import {
  StyleProp,
  ViewStyle,
  Platform,
  LayoutChangeEvent,
  FlatList,
  useWindowDimensions,
  StatusBar,
  View,
} from 'react-native';
import isEqual from 'react-fast-compare';
import {DropDownProps, RowDropDown} from './DropDown.props';
import Animated, {interpolate} from 'react-native-reanimated';
import Modal from 'react-native-modal';
import {DropDownItem} from './DropDownItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTimingTransition, toRad} from '@Animated';
import {enhance} from '@Common/Helper';
import Button from '@Components/Button';
import Block from '@Components/Block';
import Icon from '@Components/Icon';
import Text from '@Components/Text';
import {AppTheme} from '@Types';
import {useTheme} from '@react-navigation/native';
import styles from './DropDown.presets';

const DropDown = forwardRef((props: DropDownProps, ref: any) => {
  const {height: deviceH} = useWindowDimensions();
  const theme: AppTheme = useTheme();
  const inset = useSafeAreaInsets();

  const refDrop = useRef<View>(null);
  const {
    data,
    defaultValue,
    style,
    containerStyleItem,
    customTickIcon,
    activeItemStyle,
    activeLabelStyle,
    renderArrow,
    placeholderStyle,
    containerStyle,
    dropDownStyle,
    placeHolder = 'Select an item',
    multiple = false,
    disabled = false,
    multipleText = '%d items have been selected',
    onSelected,
    backgroundColor,
    flex,
    margin,
    marginLeft,
    marginRight,
    marginBottom,
    marginTop,
    marginHorizontal,
    marginVertical,
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingHorizontal,
    paddingVertical,
    errorMessage,
    errorMessageTxOptions,
    errorMessageStyle,
    errorMessageTx,
    onLayout,
    dropdownRef,
  } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | Array<string>>('');
  const [viewLayout, setViewLayout] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [dropHeight, setDropHeight] = useState(0);

  const hasError =
    (typeof errorMessage === 'string' && errorMessage.length > 0) ||
    (typeof errorMessageTx === 'string' && errorMessageTx.length > 0);

  useEffect(() => {
    if (typeof defaultValue === 'string') {
      setSelectedValue(defaultValue);
    } else if (Array.isArray(defaultValue) && defaultValue.every(x => typeof x === 'string')) {
      setSelectedValue(defaultValue);
    } else {
      setSelectedValue(multiple ? [] : '');
    }
  }, [defaultValue]);

  useEffect(() => {
    if (refDrop.current !== null && dropdownRef) {
      dropdownRef(refDrop.current);
    }
  }, [refDrop]);

  const onPressItem = useCallback(
    (value: string) => {
      let selectValue = selectedValue;
      if (multiple && Array.isArray(selectedValue)) {
        const item = selectedValue.find(x => x === value);
        if (item) {
          selectValue = selectedValue.filter(x => x !== value);
          setSelectedValue(selectedValue.filter(x => x !== value));
        } else {
          selectValue = selectedValue.concat(value);
          setSelectedValue(selectedValue.concat(value));
        }
      } else {
        selectValue = value === selectedValue ? '' : value;
      }

      setIsVisible(false);
      setSelectedValue(selectValue);
      onSelected && onSelected(selectValue);
    },
    [selectedValue, data],
  );

  const _onCheckSelected = useCallback(
    (item: RowDropDown): boolean => {
      if (multiple && Array.isArray(selectedValue)) {
        const itemSelect = selectedValue.find(x => x === item.value);
        return itemSelect !== undefined;
      } else {
        return selectedValue === item.value;
      }
    },
    [data, selectedValue],
  );

  const _renderItem = ({item, index}: {item: RowDropDown; index: number}) => {
    return (
      <DropDownItem
        index={index}
        {...{
          item,
          onPressItem,
          activeItemStyle,
          containerStyleItem,
          activeLabelStyle,
          customTickIcon,
          selected: _onCheckSelected(item),
        }}
      />
    );
  };

  const _keyExtractor = (item: RowDropDown, index: number) => item.value;

  const _onLayoutDrop = useCallback(
    (e: LayoutChangeEvent) => {
      const {height: DropH} = e.nativeEvent.layout;
      setDropHeight(DropH);
    },
    [inset, deviceH],
  );

  const _onCheckRenderBottom = useCallback((): boolean => {
    let statusbarHeight = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : inset.top;
    return deviceH - (viewLayout.y + statusbarHeight + viewLayout.height) > dropHeight + 50;
  }, [deviceH, viewLayout, dropHeight, inset]);

  const _onToggle = useCallback(() => {
    if (refDrop.current) {
      refDrop.current.measure((x, y, width, height, px, py) => {
        setViewLayout({height, width, x: px, y: py});
      });
    }
    setIsVisible(val => !val);
  }, []);

  const _onHideDrop = useCallback(() => {
    setIsVisible(false);
  }, []);

  const getTextPlaceHolder = () => {
    if (disabled) {
      return Array.isArray(defaultValue) ? `${defaultValue} items have been selected` : defaultValue || '';
    }

    if (multiple) {
      if (selectedValue.length <= 0) {
        return placeHolder;
      }
      if (selectedValue.length === 1) {
        const item = data.find(x => x.value === selectedValue[0]);
        if (item) {
          return item.label;
        }
        return placeHolder;
      }
      return multipleText.replace('%d', selectedValue.length + '');
    } else {
      if (selectedValue.length <= 0) {
        return placeHolder;
      }
      const item = data.find(x => x.value === selectedValue);
      if (item) {
        return item.label;
      }
      return placeHolder;
    }
  };

  // animated
  const progress = useTimingTransition(isVisible);
  const rotate = toRad(
    interpolate(progress, {
      inputRange: [0, 1],
      outputRange: [0, -180],
    }),
  );

  // effect

  // style
  const wrapStyle = useMemo(
    () =>
      enhance([
        styles(theme).wrapView,
        backgroundColor && {backgroundColor},
        isVisible && (_onCheckRenderBottom() ? styles(theme).wrapViewBottomOpened : styles(theme).wrapViewTopOpened),
        style,
        margin && {margin},
        marginLeft && {marginLeft},
        marginRight && {marginRight},
        marginBottom && {marginBottom},
        marginTop && {marginTop},
        marginHorizontal && {marginHorizontal},
        marginVertical && {marginVertical},
        padding && {padding},
        paddingTop && {paddingTop},
        flex && {flex},
        paddingBottom && {paddingBottom},
        paddingLeft && {paddingLeft},
        paddingRight && {paddingRight},
        paddingHorizontal && {paddingHorizontal},
        paddingVertical && {paddingVertical},
        hasError && styles(theme).errorWrap,
      ]) as StyleProp<ViewStyle>,
    [
      style,
      isVisible,
      deviceH,
      inset,
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
      hasError,
    ],
  );
  const container = useMemo(() => enhance([styles(theme).wrapPlaceholder, containerStyle]) as StyleProp<ViewStyle>, [
    containerStyle,
  ]);
  const textPlaceHolderStyle = useMemo(
    () => enhance([styles(theme).placeHolder, placeholderStyle]) as StyleProp<ViewStyle>,
    [placeholderStyle],
  );
  const contentModalStyle = useMemo(
    () =>
      enhance([
        styles(theme).dropStyle,
        dropDownStyle,
        _onCheckRenderBottom() ? styles(theme).dropBottomOpened : styles(theme).dropTopOpened,
        {width: viewLayout.width, left: viewLayout.x},
        _onCheckRenderBottom()
          ? {top: viewLayout.y + viewLayout.height}
          : {
              bottom: deviceH - viewLayout.y - (Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0),
            },
      ]) as StyleProp<ViewStyle>,
    [viewLayout, deviceH, inset],
  );

  const _renderArrow = () => {
    if (disabled) {
      return null;
    }

    if (renderArrow) {
      return renderArrow(progress);
    }

    return (
      <Animated.View style={[{transform: [{rotate: rotate}]}]}>
        <Icon icon={'arrow_down'} />
      </Animated.View>
    );
  };

  return (
    <>
      <View onLayout={onLayout} ref={refDrop} style={wrapStyle}>
        <Button disabled={disabled} preset={'link'} onPress={_onToggle}>
          <Block style={container} direction={'row'}>
            <Text style={textPlaceHolderStyle} numberOfLines={1} tx={getTextPlaceHolder()}></Text>
            {_renderArrow()}
          </Block>
        </Button>
      </View>
      {hasError && (
        <Text
          text={errorMessage}
          tx={errorMessageTx}
          txOptions={errorMessageTxOptions}
          style={enhance([styles(theme).error, errorMessageStyle])}
        />
      )}
      {!disabled && (
        <Modal
          backdropOpacity={0}
          useNativeDriver={true}
          animationInTiming={100}
          animationOutTiming={100}
          onBackButtonPress={_onHideDrop}
          onBackdropPress={_onHideDrop}
          removeClippedSubviews={true}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          style={[styles(theme).modal]}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating
          isVisible={isVisible}>
          <Block onLayout={_onLayoutDrop} style={contentModalStyle}>
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={_keyExtractor}
              renderItem={_renderItem}
            />
          </Block>
        </Modal>
      )}
    </>
  );
});

export default memo(DropDown, isEqual);
