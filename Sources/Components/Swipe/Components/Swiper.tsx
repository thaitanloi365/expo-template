import Text from '@Components/Text';
import {useTheme} from '@react-navigation/native';
import {AppTheme} from '@Types';
import React, {forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
  PanResponderGestureState,
} from 'react-native';
import {styles} from './Styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

export interface SwiperProps {
  onSwipedRight?(item: any, nextItem: any): void;
  onSwipedLeft?(item: any, nextItem: any): void;
  onSwipedUp?(item: any, nextItem: any): void;
  onSwiped?(item: any, nextItem: any): void;
  renderNoMoreCards?(): void;
  renderHeader?(): void;
  renderCard(item: any): ReactNode;
  onReset?: () => {};
  renderButton?: () => {};
  onTap?(item: any, index: number): void;
  keyProp?: 'id';
  data: any;
  stackSize?: number;
  loop?: boolean;
  isRemoveSwipeLeft?: boolean;
  isRemoveSwipeRight?: boolean;
  isRemoveSwipeUp?: boolean;
  totalCards?: number;
  disabled?: bolean;
}

type IDirectionSwipe = 'left' | 'right' | 'up';

export interface SwipeRef {
  addCards(items: any): void;
  getCardsLength(): number;
  swipe(direction: IDirectionSwipe): void;
}

const Swiper = forwardRef((props: SwiperProps, ref: any) => {
  const {
    onSwipedRight,
    onSwipedLeft,
    onSwipedUp,
    onSwiped,
    renderNoMoreCards,
    renderHeader,
    renderCard,
    onReset,
    onTap,
    renderButton,
    keyProp,
    data,
    stackSize = 1,
    loop = true,
    isRemoveSwipeLeft = false,
    isRemoveSwipeRight = false,
    isRemoveSwipeUp = false,
    totalCards = 0,
    disabled = false,
  } = props;

  const swipeDirection = useRef<'horizontal' | 'vertical' | null>('horizontal');
  const [index, setIndex] = useState(0);
  const [cards, setCards] = useState(data);
  const [cardsQueue, setCardsQueue] = useState([]);
  const [totalData, setTotalData] = useState<number>(totalCards);

  useImperativeHandle(
    ref,
    () => ({
      addCards: (items: any) => {
        const newCards = [...cards];
        setCards([...newCards, ...items]);
      },
      getCardsLength: () => {
        return cards.length;
      },
      swipe: (direction: IDirectionSwipe) => {
        forceSwipe(direction);
      },
    }),
    [cards],
  );

  const theme: AppTheme = useTheme();

  const checkSwipeDirection = (gestureState: PanResponderGestureState) => {
    if (
      Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 3) &&
      Math.abs(gestureState.vx) > Math.abs(gestureState.vy * 3)
    ) {
      swipeDirection.current = 'horizontal';
    } else {
      swipeDirection.current = 'vertical';
    }
    console.log(swipeDirection.current);
  };
  const canMove = (_, gestureState) => {
    if (disabled) {
      return false;
    }
    if (swipeDirection.current === 'horizontal') {
      const {dx, dy} = gestureState;
      return dx > 2 || dx < -2 || dy > 2 || dy < -2;
    } else {
      const {dx, dy} = gestureState;
      return dx > 2 || dx < -2 || dy > 2 || dy < -2;
    }
  };

  const position = new Animated.ValueXY();
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponderCapture: () => false,
    onStartShouldSetPanResponder: canMove,
    onPanResponderMove: (event, gesture) => {
      if (!swipeDirection.current) checkSwipeDirection(gesture);

      if (swipeDirection.current === 'horizontal') {
        position.setValue({x: gesture.dx * 2.5, y: 0});
      }
    },

    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        forceSwipe('right');
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        forceSwipe('left');
      } else if (gesture.dy < -SWIPE_THRESHOLD) {
        // forceSwipe('up');
      } else if (gesture.dx === 0 && gesture.dy === 0) {
        // onTap && onTap(cards[index], index);
        resetPosition();
      } else {
        resetPosition();
      }
    },
    onPanResponderTerminationRequest: () => false,
    onMoveShouldSetPanResponderCapture: canMove,
    onMoveShouldSetPanResponder: canMove,
  });

  useEffect(() => {
    setCards(data);
    if (totalCards) {
      setTotalData(totalCards);
    } else {
      setTotalData(data.length);
    }
  }, [data]);

  useEffect(() => {
    setIndex(0);
  }, [onReset]);

  const forceSwipe = (direction: IDirectionSwipe) => {
    let toValue = {x: 0, y: 0};
    switch (direction) {
      case 'right':
        toValue = {x: SCREEN_WIDTH * 1.2, y: 0};
        break;
      case 'left':
        toValue = {x: -SCREEN_WIDTH * 1.2, y: 0};
        break;
      case 'up':
        toValue = {x: 0, y: -SCREEN_HEIGHT * 0.8};
        break;
      default:
        break;
    }
    Animated.timing(position, {
      toValue: toValue,
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => _onSwipeComplete(direction));
  };

  const _onSwipeComplete = (direction: IDirectionSwipe) => {
    const item = cards[0];
    const nextItem = cards[1];
    position.setValue({x: 0, y: 0});

    switch (direction) {
      case 'right':
        onSwipedRight && onSwipedRight(item, nextItem);
        break;
      case 'left':
        onSwipedLeft && onSwipedLeft(item, nextItem);
        break;
      case 'up':
        // resetPosition();
        onSwipedUp && onSwipedUp(item, nextItem);
        break;
      default:
        break;
    }

    // direction === 'right'
    //   ? onSwipedRight && onSwipedRight(item, nextItem)
    //   : onSwipedLeft && onSwipedLeft(item, nextItem);

    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    // LayoutAnimation.spring();

    let newCards = [...cards];

    if (loop) {
      const newCardsQueue = [...cardsQueue];

      const isRemoveCardIndex =
        (direction === 'left' && isRemoveSwipeLeft) ||
        (direction === 'right' && isRemoveSwipeRight) ||
        (direction === 'up' && isRemoveSwipeUp);

      if (isRemoveCardIndex) {
        setTotalData(totalData - 1);
        newCards.shift();
      } else {
        /** Not remove card has 2 cases:
         * *** Case 1: Can get more data (if cards.length < totalData)
         * - Add first cards[0] to cardsQueue
         *
         * *** Case 2: Has all data
         * --> Condition 2.1: cards.length + cardsQueue === totalData --> cards.push(...cardsQueue)
         * --> Condition 2.2 (after case 2.1): condition cards.length === totalData --> cards.push(cards[0])
         */

        //Case 1
        if (newCards.length < totalData) {
          if (newCards.length + newCardsQueue.length < totalData) {
            newCardsQueue.push(newCards[0]);
            newCards.shift();
            setCardsQueue(newCardsQueue);
          }
          //Case 2.1
          else if (newCards.length + newCardsQueue.length === totalData) {
            newCards.push(...newCardsQueue);
            newCards.push(newCards[0]);
            newCards.shift();
          }
        } else {
          ///Case 2.2
          if (newCards.length === totalData) {
            newCards.push(newCards[0]);
            newCards.shift();
          }
        }
      }

      /** DEBUG */
      // console.log('****** newCardsQueue', newCardsQueue);
      // console.log('****** newCards', newCards);
      // console.log('****** totalData', totalData);
    } else {
      newCards.shift();
    }

    /** DEBUG */
    // console.log('****** newCards', newCards);
    // console.log('****** totalData', totalData);

    setCards(newCards);

    onSwiped && onSwiped(item, nextItem);
  };

  // useEffect(() => {
  //   const item = data[index];
  //   onSwiped && onSwiped(item);
  // }, [index]);

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: {x: 0, y: 0},
      useNativeDriver: false,
    }).start();
  };

  const _renderNoMoreCards = () => {
    return renderNoMoreCards ? renderNoMoreCards() : <Text tx="No more cards" />;
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      outputRange: ['-60deg', '0deg', '60deg'],
    });

    return {
      ...position.getLayout(),
      transform: [{rotate}],
    };
  };

  const renderCards = () => {
    if (index >= cards.length) {
      return _renderNoMoreCards();
    }

    const deck = cards?.map((item, i) => {
      if (i < index) {
        return null;
      }

      if (i === 0) {
        return (
          <Animated.View
            key={`${item[keyProp || 'id']}`}
            style={[getCardStyle(), styles(theme).cardStyle, {zIndex: 99, elevation: 99}]}
            {...panResponder.panHandlers}>
            {renderCard(item)}
          </Animated.View>
        );
      } else if (stackSize > 1 && i !== 0 && i < stackSize) {
        console.log('*** renderCards', cards.length);
        console.log('*** renderCards stackSize', stackSize);
        console.log('*** renderCards i', i);

        return (
          <Animated.View
            key={item[keyProp || 'id']}
            style={[
              styles(theme).cardStyle,
              styles(theme).cardStyleSecond,
              {
                top: 12 * (i - index),
                bottom: -12 * (i - index),
                zIndex: 5 * (stackSize - i),
                elevation: 5 * (stackSize - i),
                transform: [{scaleX: 1 - (i - index) * 0.05}],
              },
            ]}>
            {renderCard(item)}
          </Animated.View>
        );
      } else {
        //stackSize === 1
        return (
          <Animated.View
            key={item[keyProp || 'id']}
            style={[
              styles(theme).cardStyle,
              styles(theme).cardStyleSecond,
              {
                top: 0,
                bottom: 0,
                zIndex: 5 * (stackSize - i),
                elevation: 5 * (stackSize - i),
              },
            ]}>
            {renderCard(item)}
          </Animated.View>
        );
      }
    });

    return Platform.OS === 'android' ? deck : deck.reverse();
  };

  return (
    <View style={styles(theme).container}>
      {renderHeader && renderHeader()}
      <View>
        {renderCards()}
        {renderButton && renderButton()}
      </View>
    </View>
  );
});

export default Swiper;
