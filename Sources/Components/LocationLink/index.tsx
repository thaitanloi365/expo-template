import React, {memo, useCallback, useMemo} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Text from '@Components/Text';
import openMap from 'react-native-open-maps';
import {LocationLinkingProps} from './LocationLinking.props';
import isEqual from 'react-fast-compare';
import {AppTheme} from '@Types';
import {useTheme} from '@react-navigation/native';
import {enhance} from '@Common/Helper';

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    text: {
      // textDecorationLine: 'underline',
      // color: theme.colors.primary,
    },
  });
const LocationLinking = (props: LocationLinkingProps) => {
  const theme = useTheme();
  const {coordinate, style: styleOverride = {}, text, tx, ...rest} = props;
  const onPress = useCallback(() => {
    openMap({
      latitude: coordinate?.lat,
      longitude: coordinate?.lng,
      provider: 'google',
      zoom: 18,
      end: coordinate?.formatted_address,
    });
  }, []);

  const style = useMemo(() => enhance([styles(theme).text, styleOverride]), [styleOverride]);

  const defaultText = text || coordinate?.formatted_address;

  return (
    <TouchableOpacity onPress={onPress}>
      <Text text={defaultText} tx={tx} style={style} preset="link" {...rest} />
    </TouchableOpacity>
  );
};

export default memo(LocationLinking, isEqual);
