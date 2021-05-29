import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import Button from '@Components/Button';
import Text from '@Components/Text';
import isEqual from 'react-fast-compare';
import {useTheme} from '@react-navigation/native';
import {enhance} from '@Common/Helper';
import Row from '@Components/Row';
import {Tag, TagsProps} from './Tags.props';
import styles from './Tags.presets';
import Block from '@Components/Block';
import {View} from 'react-native';

const Tags = (props: TagsProps) => {
  const theme = useTheme();
  const ref = useRef(null);
  const {
    style: styleOverride = {},
    buttonStyle: buttonStyleOverride = {},
    textStyle: textStyleOverride = {},
    containerStyle: containerStyleOverride = {},
    defaultTagValues = [],
    disabled = false,
    tags,
    onSelected,
    multiple,
    errorMessage,
    errorMessageTx,
    errorMessageTxOptions,
    errorStyle: errorStyleOverride = {},
    shouldReset = false,
    tagsRef,
    onLayout,
  } = props;

  useEffect(() => {
    if (shouldReset && selectedTags.length) {
      setSelectedTags([]);
    }
  }, [shouldReset]);

  useEffect(() => {
    if (ref.current !== null && tagsRef) {
      tagsRef(ref.current);
    }
  }, [ref]);

  const defaultValues = tags?.filter(item => defaultTagValues?.includes(item?.value));

  const [selectedTags, setSelectedTags] = useState<Tag[]>(defaultValues || []);

  const style = useMemo(() => enhance([styles(theme).tagWrap, styleOverride]), [styleOverride]);

  const containerStyle = useMemo(() => enhance([styles(theme).wrap, containerStyleOverride]), [containerStyleOverride]);

  const buttonStyle = useMemo(() => enhance([styles(theme).button, buttonStyleOverride]), [buttonStyleOverride]);

  const errorStyle = useMemo(() => enhance([styles(theme).error, errorStyleOverride]), [errorStyleOverride]);
  useEffect(() => {
    if (defaultTagValues.length > 0) {
      const defaultValues = tags?.filter(item => defaultTagValues?.includes(item?.value));
      setSelectedTags(defaultValues);
    }
  }, [defaultTagValues]);

  const hasError =
    (typeof errorMessage === 'string' && errorMessage.length > 0) ||
    (typeof errorMessageTx === 'string' && errorMessageTx.length > 0);
  return (
    <Block block>
      <View ref={ref} onLayout={onLayout} style={containerStyle}>
        <Row style={containerStyle}>
          {tags?.map((item, index) => {
            const {value, label} = item;
            const selected = selectedTags?.findIndex(tag => tag.value === item.value) !== -1;

            const isLast = index === tags?.length - 1;
            return (
              <Button
                disabled={disabled}
                hideDisabledStyle={disabled}
                activeOpacity={0.8}
                key={`${index}-${value}-${label}`}
                containerStyle={[style, isLast && {marginRight: 0}]}
                onPress={() => {
                  if (multiple) {
                    if (selected) {
                      const tags = selectedTags.filter(tag => tag.value !== item.value);
                      setSelectedTags(tags);
                      onSelected && onSelected(tags);
                    } else {
                      const tags = [...selectedTags, item];
                      setSelectedTags(tags);
                      onSelected && onSelected(tags);
                    }
                  } else {
                    const tags = [item];
                    setSelectedTags(tags);
                    onSelected && onSelected(tags);
                  }
                }}
                preset={selected ? 'primary' : 'secondary'}
                style={buttonStyle}
                text={label}
                textStyle={textStyleOverride}
              />
            );
          })}
        </Row>
      </View>
      {hasError && (
        <Text style={errorStyle} text={errorMessage} tx={errorMessageTx} txOptions={errorMessageTxOptions} />
      )}
    </Block>
  );
};

export default memo(Tags, isEqual);

export * from './Tags.props';
