import Block from '@Components/Block';
import Text from '@Components/Text';
import Button from '@Components/Button';
import {useTheme} from '@react-navigation/native';
import {AppTheme, IDress} from '@Types';
import React, {forwardRef, useCallback, useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, View, PanResponder} from 'react-native';
import styles from './Styles';
import ImageRemote from '@Components/ImageRemote';
import {valueAt} from '@Utils/Helper';
import IconButton from '@Components/IconButton';
import Row from '@Components/Row';
import {scale, verticalScale} from '@Common/Scale';
import {SafeAreaView} from 'react-native-safe-area-context';
import ModalFilter, {ModalFilterRef} from '@Screens/Authorization/User/Home/Components/ModalFilter';
import ModalDenyUser, {ModalDenyUserRef} from '@Screens/Authorization/User/Home/Components/ModalDenyUser';
import TextBlurring from '@Components/TextBlurring';
import images from '@Assets/Images';

const {width, height} = Dimensions.get('window');

interface CardSwipesProps {
  dresses: IDress[];
  onFilter?: () => void;
  onLike?: (dress: IDress) => void;
  onDislike?: (dress: IDress) => void;
  onToggleIgnore?: (dress: IDress, enabled: boolean) => void;
  onPress?: (dress: IDress) => void;
}

export interface CardSwipesRef {
  swipeLeft?(): void;
  swipeRight?(): void;
}

const CardSwipes = forwardRef((props: CardSwipesProps, ref: any) => {
  const {dresses, onDislike, onFilter, onLike, onToggleIgnore, onPress} = props;
  const theme: AppTheme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwipe, setIsSwipe] = useState(false);

  const modalRef = useRef<ModalFilterRef>();
  const modalDenyUser = useRef<ModalDenyUserRef>();
  const position = useRef(new Animated.ValueXY()).current;

  const nextCardOpacity = position.x.interpolate({
    inputRange: [-width / 2, -width / 3, 0, width / 3, width / 2],
    // outputRange: [1, 0.8, 0.6, 0.8, 1],
    outputRange: [1, 1, 1, 1, 1],
    extrapolate: 'clamp',
  });

  const nextCardScaleX = (index: number) =>
    position.x.interpolate({
      inputRange: [-width / 2, -width / 3, 0, width / 3, width / 2],
      outputRange: [
        // 1,
        // 0.95,
        // 0.9,
        // 0.95,
        // 1,
        Math.pow(index - currentIndex === 1 ? 1 : 0.95, index - currentIndex),
        Math.pow(0.95, index - currentIndex),
        Math.pow(0.9, index - currentIndex),
        Math.pow(0.95, index - currentIndex),
        Math.pow(index - currentIndex === 1 ? 1 : 0.95, index - currentIndex),
      ],
      extrapolate: 'clamp',
    });
  const nextCardScaleY = (index: number) =>
    position.y.interpolate({
      inputRange: [-width / 2, -width / 3, 0, width / 3, width / 2],
      outputRange: [1, 1, 1, 1, 1],
      extrapolate: 'clamp',
    });

  const nextCardTranslateY = (index: number) =>
    position.x.interpolate({
      inputRange: [-width / 2, -width / 3, 0, width / 3, width / 2],
      outputRange: [
        (index - currentIndex - 1) * 10,
        (index - currentIndex) * 10,
        (index - currentIndex) * 10,
        (index - currentIndex) * 10,
        (index - currentIndex - 1) * 10,
      ],
      extrapolate: 'clamp',
    });

  const lastCardOpacity = position.x.interpolate({
    inputRange: [-width / 2, -width / 3, 0, width / 3, width / 2],
    outputRange: [0.6, 0.8, 0, 0.8, 0.6],
    extrapolate: 'clamp',
  });

  const lastCardScaleX = (index: number) =>
    position.x.interpolate({
      inputRange: [-width / 2, -width / 3, 0, width / 3, width / 2],
      outputRange: [
        Math.pow(0.93, index - currentIndex),
        Math.pow(0.93, index - currentIndex),
        Math.pow(0.93, index - currentIndex),
        Math.pow(0.93, index - currentIndex),
        Math.pow(0.93, index - currentIndex),
      ],
      extrapolate: 'clamp',
    });

  const lastCardTranslateY = (index: number) =>
    position.x.interpolate({
      inputRange: [-width / 2, -width / 3, 0, width / 3, width / 2],
      outputRange: [
        (1 * index - currentIndex - 1) * 10,
        (1 * index - currentIndex - 1) * 10,
        (1 * index - currentIndex - 1 - 1) * 10,
        (1 * index - currentIndex - 1) * 10,
        (1 * index - currentIndex - 1) * 10,
      ],
      extrapolate: 'clamp',
    });

  const rotate = position.x.interpolate({
    inputRange: [-width / 2, -width / 3, 0, width / 3, width / 2],
    outputRange: ['-10deg', '-5deg', '0deg', '5deg', '10deg'],
    extrapolate: 'clamp',
  });

  const rotateAndTranslate = {
    transform: [
      {
        rotate: rotate,
      },
      {translateX: position.x},
      // ...position.getTranslateTransform(),
    ],
  };

  useEffect(() => {
    console.log('**** FINISH', currentIndex);
    position.setValue({x: 0, y: 0});
  }, [currentIndex]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => {
      return true;
    },
    onPanResponderMove: (evt, gestureState) => {
      setIsSwipe(true);

      position.setValue({x: gestureState.dx, y: gestureState.dy});
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > (width * 1) / 2) {
        Animated.spring(position, {
          toValue: {x: width + 50, y: gestureState.dy},
          useNativeDriver: true,
        }).start(() => {
          onLike && onLike(dresses[currentIndex]);
          setCurrentIndex(prevState => prevState + 1);

          setIsSwipe(false);
        });
      } else if (gestureState.dx < (-width * 1) / 2) {
        Animated.spring(position, {
          toValue: {x: -width - 50, y: gestureState.dy},
          useNativeDriver: true,
        }).start(() => {
          onDislike && onDislike(dresses[currentIndex]);
          setCurrentIndex(prevState => prevState + 1);

          setIsSwipe(false);
        });
      } else {
        Animated.spring(position, {
          toValue: {x: 0, y: 0},
          friction: 4,
          useNativeDriver: true,
        }).start(() => {
          setIsSwipe(false);
        });
      }
    },
  });

  const _onSwipeRight = (callback: (index: number) => void) => {
    const index = currentIndex + 1 >= dresses.length ? 0 : currentIndex + 1;

    console.log('SWIPE RIGHT', index);

    Animated.spring(position, {
      toValue: {x: width + 50, y: 0},
      // speed: 0.1,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(index);
      callback && callback(index);

      // position.setValue({x: 0, y: 0});
    });
  };

  const _onSwipeLeft = (callback: (index: number) => void) => {
    const index = currentIndex + 1 >= dresses.length ? 0 : currentIndex + 1;

    console.log('SWIPE LEFT', index);

    Animated.spring(position, {
      toValue: {x: -width - 50, y: 0},
      // speed: 0.1,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(index);
      callback && callback(index);

      // position.setValue({x: 0, y: 0});
    });
  };

  const _onFilter = () => {
    modalRef.current?.show();
  };

  const _onDeny = () => {
    modalDenyUser.current?.show();
  };

  const _onIgnore = useCallback(
    (enable: boolean) => {
      const dress = dresses[currentIndex];
      onToggleIgnore && onToggleIgnore(dress, enable);
    },
    [onToggleIgnore],
  );

  const _onLikeDress = () => {
    _onSwipeRight(index => {
      const dress = dresses[index];
      onLike && dress && onLike(dress);
    });
  };

  const _onDislike = () => {
    _onSwipeLeft(index => {
      const dress = dresses[index];
      onDislike && dress && onDislike(dress);
    });
  };

  const _renderItem = (dress: IDress, index: number) => {
    const _onPress = () => {
      const dress = dresses[currentIndex];
      !isSwipe && onPress && dress && onPress(dress);
    };

    const totalSwopableText = `${dress?.total_swopable || 0}`;
    return (
      <Button activeOpacity={0.8} preset="link" onPress={_onPress}>
        <ImageRemote
          containerStyle={styles(theme).imageWrap}
          resizeMode="stretch"
          preview={valueAt(dress.thumbnails || [], 0, images.default)}
          imageURL={valueAt(dress.photos || [], 0, '')}
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
          <TextBlurring fontSize="FONT_16" fontWeight="bold" color="white" text={dress.title} />
          <Block borderRadius={scale(14)} overflow="hidden">
            <TextBlurring textContainerStyle={styles(theme).circleTextWrap} text={totalSwopableText} />
          </Block>
        </Row>
      </Button>
    );
  };

  const renderBottom = () => {
    if (dresses?.length) {
      return (
        <Row bottom={0} marginHorizontal={scale(16)} alignHorizontal="space-between" alignVertical="center">
          <Row width="45%" alignVertical="center" alignHorizontal="space-between">
            <IconButton raised icon="deny_user" onPress={_onDeny} />
            <IconButton raised size="large" icon="broken_heart" onPress={_onDislike} />
          </Row>
          <Row width="45%" alignVertical="center" alignHorizontal="space-between">
            <IconButton raised size="large" icon="heart" onPress={_onLikeDress} />
            <IconButton raised icon="filter" onPress={_onFilter} />
          </Row>
        </Row>
      );
    }

    return null;
  };

  const renderContent = () => {
    if (!dresses || dresses?.length === 0) {
      return null;
    }

    return dresses
      .map((item, index) => {
        if (index < currentIndex) {
          return null;
        } else if (index === currentIndex) {
          return (
            <>
              <Animated.View
                {...panResponder.panHandlers}
                key={`card_${index}`}
                style={[{...rotateAndTranslate}, styles(theme).animated]}>
                {_renderItem(item, index)}
              </Animated.View>
            </>
          );
        } else if (index < currentIndex + 3) {
          return (
            <Animated.View
              key={`card_${index}`}
              style={[
                {
                  opacity: nextCardOpacity,
                  transform: [
                    {scaleX: nextCardScaleX(index)},
                    // {scaleY: nextCardScaleY(index)},
                    {translateY: nextCardTranslateY(index)},
                    // {translateY: height * 0.02 + (index - currentIndex) * 10},
                  ],
                },
                styles(theme).animated,
              ]}>
              {_renderItem(item, index)}
            </Animated.View>
          );
        } else if (index === currentIndex + 3) {
          return (
            <Animated.View
              key={`card_${index}`}
              style={[
                {
                  // opacity: lastCardOpacity,
                  transform: [
                    {scaleX: lastCardScaleX(index)},
                    {translateY: lastCardTranslateY(index)},
                    // {translateY: height * 0.02 + (index - currentIndex) * 10},
                  ],
                },
                styles(theme).animated,
              ]}>
              {_renderItem(item, index)}
            </Animated.View>
          );
        }
      })
      .reverse();
  };
  return (
    <SafeAreaView style={styles(theme).container}>
      <View style={styles(theme).containerContent}>{renderContent()}</View>
      <View style={styles(theme).containerBottom}>{renderBottom()}</View>

      <ModalFilter ref={modalRef} />
      <ModalDenyUser ref={modalDenyUser} value={false} onToggle={_onIgnore} />
    </SafeAreaView>
  );
});

export default React.memo(CardSwipes);
