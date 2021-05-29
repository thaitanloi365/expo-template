import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FABDefaultProps} from './FABDefault.props';
import {ColorDefault} from '@Themes';
import {enhance} from '@Common/Helper';
import Button from '@Components/Button';
import Text from '@Components/Text';

const SIZE_FAB = 60;
const styles = StyleSheet.create({
  wrap: {
    borderRadius: SIZE_FAB / 2,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fe00f6',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  button: {
    minWidth: SIZE_FAB,
    minHeight: SIZE_FAB,
    borderRadius: SIZE_FAB / 2,
  },
  label: {
    color: '#FFFFFF',
    fontWeight: 'normal',
    fontFamily: undefined,
    paddingLeft: 5,
  },
});

export const FABDefault = (props: FABDefaultProps) => {
  const {
    onPress,
    style = {},
    iconStyle = {tintColor: 'white'},
    icon = 'plus',
    margin,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    label,
  } = props;
  const inset = useSafeAreaInsets();
  const styleBase = useMemo(
    () =>
      enhance([
        styles.wrap,
        {
          right: inset.right + 15,
          bottom: inset.bottom + 5,
          backgroundColor: ColorDefault.primary,
        },
        style,
        margin && {margin},
        marginLeft && {marginLeft},
        marginRight && {marginRight},
        marginTop && {marginTop},
        marginBottom && {marginBottom},
      ]),
    [inset, style, margin, marginLeft, marginRight, marginTop, marginBottom],
  );
  return (
    <Button
      onPress={onPress}
      activeOpacity={0.6}
      icon={icon}
      style={styles.button}
      iconStyle={iconStyle}
      containerStyle={styleBase}>
      {React.isValidElement(label) ? label : label && <Text style={[styles.label]} text={label as string} />}
    </Button>
  );
};
