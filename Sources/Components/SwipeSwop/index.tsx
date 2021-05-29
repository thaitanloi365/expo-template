import React, {forwardRef, useCallback, useEffect, useState} from 'react';
import Swiper from 'react-native-deck-swiper';
import {View, StyleSheet} from 'react-native';
import {AppTheme, IDress} from '@Types';
import ImageRemote from '@Components/ImageRemote';
import Row from '@Components/Row';
import {useTheme} from '@react-navigation/native';
import TextBlurring from '@Components/TextBlurring';
import Block from '@Components/Block';
import {scale, verticalScale} from '@Common/Scale';
import {styles} from './Styles';
import {valueAt} from '@Utils/Helper';
import Col from '@Components/Col';
import images from '@Assets/Images';
import Text from '@Components/Text';
import {LinearGradient} from 'expo-linear-gradient';

interface SwipeSwopProps {
  data: IDress[];
  onDressDetail?(index: number): void;
  onSwipedLeft?(index: number): void;
  onSwipedRight?(index: number): void;
  onSwipedTop?(index: number): void;
  infinite?: boolean;
  cardIndex?: number;
}

export type SwipeSwopRef = Swiper<IDress>;
const SwipeSwop = forwardRef(
  (
    {data, onDressDetail, onSwipedLeft, onSwipedRight, onSwipedTop, infinite = false, cardIndex = 0}: SwipeSwopProps,
    ref: any,
  ) => {
    const theme: AppTheme = useTheme();

    const [cards, setCards] = useState<IDress[]>([]);
    console.log('SwipeSwop cardIndex', cardIndex);
    console.log('SwipeSwop data', data);

    useEffect(() => {
      setCards(data);
    }, [data]);

    const renderCard = (dress: IDress, index: number) => {
      if (dress && dress !== undefined) {
        const totalSwopableText = `${dress?.total_swopable || 0}`;

        return (
          <View style={[styles(theme).cardItem, styles(theme).cardGradient]}>
            <ImageRemote
              containerStyle={styles(theme).imageWrap}
              preview={valueAt(dress?.thumbnails || [], 0, images.default)}
              imageURL={valueAt(dress?.photos || [], 0, '')}
            />

            <Row
              paddingLeft={scale(10)}
              paddingRight={scale(12)}
              paddingBottom={verticalScale(22)}
              width="100%"
              alignHorizontal="space-between"
              alignVertical="center"
              position="absolute"
              bottom={0}
              left={0}>
              <LinearGradient style={StyleSheet.absoluteFill} colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.6)']} />

              <Col flex={1} marginRight={scale(10)}>
                <Text
                  style={styles(theme).title}
                  fontSize="FONT_16"
                  fontWeight="bold"
                  color="white"
                  text={dress?.title}
                />
              </Col>

              <Col borderRadius={scale(14)} overflow="hidden">
                <Block style={styles(theme).circleTextWrap}>
                  <Text fontWeight="bold" color="white" text={totalSwopableText} />
                </Block>
              </Col>
            </Row>
          </View>
        );
      } else {
        return null;
      }
    };

    if (!cards || cards?.length === 0) {
      return null;
    }

    return (
      <Swiper
        ref={ref}
        containerStyle={styles(theme).containerSwipe}
        cardStyle={styles(theme).card}
        cardVerticalMargin={verticalScale(20)}
        onSwipedLeft={onSwipedLeft}
        onSwipedRight={onSwipedRight}
        onSwipedTop={onSwipedTop}
        onTapCard={onDressDetail}
        cardIndex={cardIndex}
        cards={cards}
        renderCard={renderCard}
        stackSize={cards.length < 3 ? cards.length : 3}
        stackSeparation={15}
        animateOverlayLabelsOpacity
        animateCardOpacity
        swipeBackCard
        verticalSwipe={false}
        infinite={infinite}
        overlayLabels={{
          left: {
            title: 'NOPE',
            style: {
              label: styles(theme).overlayLeftLabel,
              wrapper: styles(theme).overlayLeftLabelWrap,
            },
          },
          right: {
            title: 'LIKE',
            style: {
              label: styles(theme).overlayRightLabel,
              wrapper: styles(theme).overlayRightLabelWrap,
            },
          },
        }}
      />
    );
  },
);

export default SwipeSwop;
