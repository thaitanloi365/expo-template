import React, {useMemo, useCallback, memo} from 'react';
import {StyleSheet} from 'react-native';
import {SpacingDefault, ColorDefault} from '@Themes';
import {CheckboxProps} from './CheckBox.props';
import isEqual from 'react-fast-compare';
import Block from '@Components/Block';
import Text from '@Components/Text';
import Button from '@Components/Button';
import {enhance} from '@Common/Helper';

const dimensions = {width: 16, height: 16};
const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    paddingVertical: SpacingDefault.tiny,
    alignSelf: 'flex-start',
  },
  outline: {
    ...dimensions,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ColorDefault.primaryDarker,
    borderRadius: 1,
  },
  fill: {
    width: dimensions.width - 4,
    height: dimensions.height - 4,
    backgroundColor: ColorDefault.primary,
  },
  label: {
    paddingLeft: SpacingDefault.smaller,
  },
});

const CheckBox = ({fillStyle, onToggle, outlineStyle, style, text, tx, value}: CheckboxProps) => {
  const rootStyle = useMemo(() => enhance([styles.wrap, style ?? {}]), [style]);
  const outlineStyleWrap = useMemo(() => enhance([styles.outline, outlineStyle ?? {}]), [outlineStyle]);
  const fillStyleWrap = useMemo(() => enhance([styles.fill, fillStyle ?? {}]), [fillStyle]);
  const labelStyle = useMemo(() => styles.label, []);

  const onPress = useCallback(() => {
    onToggle && onToggle(!value);
  }, [onToggle, value]);

  return (
    <Button activeOpacity={1} preset={'link'} disabled={!onToggle} onPress={onPress} style={rootStyle}>
      <>
        <Block style={outlineStyleWrap}>{value && <Block style={fillStyleWrap} />}</Block>
        <Text text={text} tx={tx} style={labelStyle} />
      </>
    </Button>
  );
};
export default memo(CheckBox, isEqual);
