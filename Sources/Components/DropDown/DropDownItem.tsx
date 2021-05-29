import React, {memo, useCallback, useMemo} from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import isEqual from 'react-fast-compare';
import {ItemProps} from './DropDown.props';
import {enhance} from '@Common/Helper';
import Block from '@Components/Block';
import Button from '@Components/Button';
import Text from '@Components/Text';
import Icon from '@Components/Icon';
import {ColorDefault} from '@Themes';

const styles = StyleSheet.create({
  labelStyle: {
    flex: 1,
    paddingRight: 5,
  },
  container: {
    alignItems: 'center',
  },
});

const DropDownItemComponent = (props: ItemProps) => {
  const {
    item,
    onPressItem,
    selected = false,
    activeItemStyle,
    activeLabelStyle,
    containerStyleItem,
    customTickIcon,
    labelStyle,
    index,
  } = props;

  const _onItemPress = useCallback(() => {
    onPressItem && item && onPressItem(item.value ?? '');
  }, [item, onPressItem]);

  const activeContainer = useMemo(() => enhance([activeItemStyle]) as StyleProp<ViewStyle>, [activeItemStyle]);
  const activeLabel = useMemo(() => enhance([activeLabelStyle]) as StyleProp<ViewStyle>, [activeLabelStyle]);
  const label = useMemo(() => enhance([styles.labelStyle, labelStyle]) as StyleProp<ViewStyle>, [labelStyle]);
  const container = useMemo(
    () => enhance([styles.container, index === 0 && {marginTop: 10}, containerStyleItem]) as StyleProp<ViewStyle>,
    [containerStyleItem],
  );
  return (
    <Button onPress={_onItemPress} preset={'link'}>
      <Block width={'100%'} paddingVertical={5} direction={'row'} style={[container, selected && activeContainer]}>
        <Text style={[label, selected && activeLabel]}>{item.label}</Text>
        {selected && (customTickIcon ? customTickIcon() : <Icon icon={'check'} />)}
      </Block>
    </Button>
  );
};

export const DropDownItem = memo(DropDownItemComponent, isEqual);
