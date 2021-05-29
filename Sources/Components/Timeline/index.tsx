import React, {memo, useMemo} from 'react';
import {FlatList} from 'react-native';
import Block from '@Components/Block';
import isEqual from 'react-fast-compare';
import {TimelineItem, TimelineProps} from './Timeline.props';
import {enhance} from '@Common/Helper';
import {useTheme} from '@react-navigation/native';
import styles from './Timeline.presets';
import Row from '@Components/Row';
import Col from '@Components/Col';
import Text from '@Components/Text';
import {scale, verticalScale} from '@Common/Scale';
import {ReactElementFunc} from '@Types';
import Button from '@Components/Button';

const Timeline = (props: TimelineProps) => {
  const theme = useTheme();
  const {
    style: styleOverride = {},
    flatListStyle: flatListStyleOverride = {},
    items = [],
    indicatorSize = scale(6),
    titleStyle: titleStyleOverride = {},
    timeStyle: timeStyleOverride = {},
    contentStyle: contentStyleOverride = {},
    renderButton,
    status,
    ...rest
  } = props;
  const style = useMemo(() => enhance([styleOverride]), [styleOverride]);

  const flatListStyle = useMemo(() => enhance([styles(theme).wrap, flatListStyleOverride]), [flatListStyleOverride]);

  const titleStyle = useMemo(() => enhance([styles(theme).title, titleStyleOverride]), [titleStyleOverride]);

  const timeStyle = useMemo(() => enhance([styles(theme).time, timeStyleOverride]), [timeStyleOverride]);

  const contentStyle = useMemo(() => enhance([styles(theme).content, contentStyleOverride]), [contentStyleOverride]);

  const renderContent = (item?: JSX.Element | ReactElementFunc) => {
    if (React.isValidElement(item)) {
      return item;
    }
    if (typeof item === 'function') {
      return item();
    }

    return null;
  };
  const renderItem = ({item, index}: {item: TimelineItem; index: number}) => {
    const lastIndex = index === items?.length - 1;

    return (
      <Row key={`${index}-${item.time}`} alignVertical="flex-start">
        <Col>
          <Block
            width={indicatorSize * 2}
            height={indicatorSize * 2}
            borderRadius={indicatorSize}
            color={lastIndex ? theme.colors.primary : theme.colors.border}
          />
          {!lastIndex && (
            <Block
              borderLeftColor={theme.colors.border}
              borderLeftWidth={1}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: indicatorSize,
                right: 0,
                height: '100%',
              }}
            />
          )}
        </Col>
        <Col justifyContent="flex-start" flex={1} paddingBottom={verticalScale(20)}>
          <Text preset="footNote" style={timeStyle} text={item?.time} />
          <Text
            preset="mainText"
            style={titleStyle}
            text={item?.title}
            tx={item?.titleTx}
            txOptions={item?.titleTxOptions}
          />
          {item?.hasDescription && item?.descriptionTx && (
            <Text
              preset="footNote"
              style={contentStyle}
              text={item?.description}
              tx={item?.descriptionTx}
              txOptions={item.descriptionTxOptions}
            />
          )}
          {renderContent(item.content)}
          {item.renderButton && item.renderButton()}
        </Col>
      </Row>
    );
  };
  return (
    <Block style={style} {...rest}>
      <FlatList nestedScrollEnabled style={flatListStyle} data={items} renderItem={renderItem} />
    </Block>
  );
};

export default memo(Timeline, isEqual);

export * from './Timeline.props';
