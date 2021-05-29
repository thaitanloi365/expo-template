import React, {memo, useMemo, useState} from 'react';
import {FlexAlignType, StyleSheet} from 'react-native';
import {StyleProp, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {getAppVersion, getExpoShortVersion} from '@Utils/DeviceInfo';
import Text from '@Components/Text';
import isEqual from 'react-fast-compare';
import {enhance} from '@Common/Helper';
import {FontSizeDefault} from '@Themes';
interface VersionProps {
  style?: StyleProp<ViewStyle>;

  textStyle?: StyleProp<TextStyle>;

  alignSelf?: 'auto' | FlexAlignType;

  margin?: number;

  marginLeft?: number;

  marginRight?: number;

  marginBottom?: number;

  marginTop?: number;

  marginHorizontal?: number;

  marginVertical?: number;

  padding?: number;

  paddingTop?: number;

  paddingBottom?: number;

  paddingLeft?: number;

  paddingRight?: number;

  paddingHorizontal?: number;

  paddingVertical?: number;
}

const styles = StyleSheet.create({
  text: {
    fontSize: FontSizeDefault.FONT_11,
  },
});
const Version = (props: VersionProps) => {
  const {
    style: styleOverride = {},
    textStyle: textStyleOverride = {},
    margin,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    marginHorizontal,
    marginVertical,
    padding,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingTop,
    paddingHorizontal,
    paddingVertical,
    alignSelf,
  } = props;
  const [version, setVersion] = useState<'app' | 'expo'>('app');
  const onPress = () => setVersion(version === 'app' ? 'expo' : 'app');

  const textStyle = useMemo(() => enhance([styles.text, textStyleOverride]), [textStyleOverride]);

  const style = useMemo(
    () =>
      enhance([
        styleOverride,
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
        alignSelf && {alignSelf},
      ]),
    [
      styleOverride,
      margin,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      marginHorizontal,
      marginVertical,
      padding,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingTop,
      paddingHorizontal,
      paddingVertical,
      alignSelf,
    ],
  );
  return (
    <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.7}>
      <Text style={textStyle} text={version === 'app' ? getAppVersion() : getExpoShortVersion()} />
    </TouchableOpacity>
  );
};

export default memo(Version, isEqual);
