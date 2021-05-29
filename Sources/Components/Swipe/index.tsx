import images from '@Assets/Images';
import {scale, verticalScale} from '@Common/Scale';
import Block from '@Components/Block';
import Col from '@Components/Col';
import ImageRemote from '@Components/ImageRemote';
import Row from '@Components/Row';
import Screen from '@Components/Screen';
import Text from '@Components/Text';
import {Text as RNText} from 'react-native';
import Touchable from '@Components/Touchable';
import {useTheme} from '@react-navigation/native';
import {AppTheme, IDress} from '@Types';
import {valueAt} from '@Utils/Helper';
import {LinearGradient} from 'expo-linear-gradient';
import React, {forwardRef} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import Swiper, {SwiperProps} from './Components/Swiper';
import {styles} from './Styles';

interface SwipeProps {
  data: any;
  onTap?(value: any, index: number): void;
  onSwipedLeft?(item: any, nextItem: any): void;
  onSwipedRight?(item: any, nextItem: any): void;
  onSwipedUp?(item: any, nextItem: any): void;
  onSwiped?(item: any, nextItem: any): void;
  isRemoveSwipeLeft?: boolean;
  isRemoveSwipeRight?: boolean;
  isRemoveSwipeUp?: boolean;
  loop?: boolean;
  totalCards?: number;
  renderNoMoreCards?(): void;
  renderHeader?(): void;
  isHeight169?: boolean;
  isClickBottom?: boolean;
  onPressBottom?(dress: IDress): void;
  styleCardItem?: ViewStyle;
  disabled?: boolean;
}

export const BlockMatchesNumber = ({totalSwopable = '0'}) => {
  const theme: AppTheme = useTheme();

  return (
    <Block style={styles(theme).rectangleTextWrap}>
      <RNText>
        <Text preset="title" fontWeight="bold" text={totalSwopable} color="white" />
      </RNText>
      <RNText>
        <Text preset="footNote" tx="common:matches" color="white" />
      </RNText>
    </Block>
  );
};

const Swipe = forwardRef((props: SwipeProps, ref: any) => {
  const theme: AppTheme = useTheme();
  const {
    data,
    onTap,
    onSwipedLeft,
    onSwipedRight,
    onSwipedUp,
    onSwiped,
    isRemoveSwipeRight = false,
    isRemoveSwipeLeft = false,
    isRemoveSwipeUp = false,
    loop = false,
    totalCards,
    renderNoMoreCards,
    renderHeader,
    isHeight169 = true,
    isClickBottom = false,
    onPressBottom,
    styleCardItem,
    disabled = false,
  } = props;

  const renderCard = (dress: IDress, index?: number) => {
    if (dress && dress !== undefined) {
      const totalSwopableText = `${dress?.total_swopable || 0}`;

      return (
        <Touchable
          style={[
            styles(theme).cardItem,
            styles(theme).cardGradient,
            isHeight169 ? styles(theme).height169 : styles(theme).heightFull,
            styleCardItem,
          ]}
          onPress={() => onTap && onTap(dress, index)}
          activeOpacity={1}>
          <ImageRemote
            containerStyle={styles(theme).imageWrap}
            preview={valueAt(dress?.thumbnails || [], 0, images.default)}
            imageURL={valueAt(dress?.photos || [], 0, '')}
            resizeMode="cover"
          />

          <Row
            // paddingLeft={scale(10)}
            width="100%"
            alignHorizontal="space-between"
            alignVertical="flex-end"
            position="absolute"
            top={0}
            bottom={0}
            left={0}>
            <LinearGradient style={StyleSheet.absoluteFill} colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']} />
            <Block
              direction="row"
              paddingLeft={verticalScale(20)}
              paddingBottom={verticalScale(20)}
              justifyContent="space-between"
              alignItems="center">
              <Col flex={1}>
                <RNText>
                  <Text preset="footNote" fontWeight="bold" color="white" tx={`category:${dress?.category}`} />
                  <Text preset="footNote" fontWeight="bold" color="white" text={` - `} />
                  <Text preset="footNote" fontWeight="bold" color="white" tx={`type:${dress?.type}`} />
                </RNText>
              </Col>
              <Col>
                <Touchable
                  style={{
                    alignItems: 'flex-end',
                    paddingRight: verticalScale(20),
                  }}
                  activeOpacity={1}
                  onPress={() => {
                    onPressBottom && onPressBottom(dress);
                  }}>
                  <BlockMatchesNumber totalSwopable={totalSwopableText} />
                  {/* <Block style={styles(theme).rectangleTextWrap}>
                    <RNText>
                      <Text preset="title" fontWeight="bold" text={totalSwopableText} color="white" />
                    </RNText>
                    <RNText>
                      <Text preset="footNote" tx="common:matches" color="white" />
                    </RNText>
                  </Block> */}
                </Touchable>
              </Col>
            </Block>
          </Row>
        </Touchable>
      );
    } else {
      return null;
    }
  };

  return (
    <Block>
      <Swiper
        ref={ref}
        onSwipedRight={onSwipedRight}
        onSwipedLeft={onSwipedLeft}
        onSwipedUp={onSwipedUp}
        onSwiped={onSwiped}
        keyProp="id"
        data={data}
        loop={loop}
        totalCards={totalCards}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
        renderHeader={renderHeader}
        isRemoveSwipeLeft={isRemoveSwipeLeft}
        isRemoveSwipeRight={isRemoveSwipeRight}
        isRemoveSwipeUp={isRemoveSwipeUp}
        disabled={disabled}
        // onTap={onTap}
      />
    </Block>
  );
});

export default Swipe;
