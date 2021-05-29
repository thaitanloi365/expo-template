import React, {forwardRef, memo, useRef} from 'react';
import isEqual from 'react-fast-compare';

import ListView from '@Components/ListView';
import DressOption from '@Components/DressOption';
import Touchable from '@Components/Touchable';
import {LayoutChangeEvent, View} from 'react-native';

type ListDressOptionsProps = {
  options?: any;
  onSelected?(value: any): void;
  selectedValue?: string | string[];
  multiple?: boolean;
  showTintColor?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  inputRef?: (r: any) => void;
};

const ListDressOptions = forwardRef((props: ListDressOptionsProps, ref: any) => {
  const {options, onSelected, selectedValue, multiple = false, showTintColor = true, onLayout, inputRef} = props;

  const _onSelected = (value: any) => {
    if (multiple) {
      if (!selectedValue?.includes(value?.value)) {
        onSelected && onSelected([...(selectedValue || []), value.value]);
      } else {
        const newSelectedValue = [...selectedValue];
        const valueIndex = newSelectedValue.indexOf(value.value);

        newSelectedValue.splice(valueIndex, 1);
        onSelected && onSelected(newSelectedValue);
      }
    } else {
      if (selectedValue !== value?.value) {
        onSelected && onSelected(value);
      } else {
        onSelected && onSelected(null);
      }
    }
  };

  const renderDressOption = ({item, index}: any) => {
    return (
      <Touchable onPress={() => _onSelected(item)}>
        <DressOption
          showTintColor={showTintColor}
          title={item.label}
          imageUrl={item.image_url}
          text={item.text}
          isSelected={!multiple ? selectedValue === item.value : selectedValue?.includes(item.value)}
        />
      </Touchable>
    );
  };

  return (
    <View onLayout={onLayout} ref={ref}>
      <ListView
        showsHorizontalScrollIndicator={false}
        refreshing={false}
        canLoadMore={false}
        data={options || []}
        renderItem={renderDressOption}
        horizontal
      />
    </View>
  );
});

export default memo(ListDressOptions, isEqual);
