import React, {memo, useCallback, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Block from '@Components/Block';
import {useTheme} from '@react-navigation/native';
import styles from './BottomSheet.presets';
import {ReactElementFunc} from '@Types';
import Button from '@Components/Button';
import Text from '@Components/Text';
import isEqual from 'react-fast-compare';
import {BlurView} from 'expo-blur';

interface Props {
  snapPoints?: React.Key[];
  content?: JSX.Element | ReactElementFunc;
}
const BottomSheet = (props: Props) => {
  const {snapPoints = ['25%', '50%'], content} = props;
  const theme = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const renderContent = () => {
    if (React.isValidElement(content)) {
      return content;
    }
    if (typeof content === 'function') {
      return content();
    }

    return null;
  };

  // callbacks
  const handlePresentModalPress = bottomSheetModalRef.current?.present();

  const handleSheetChanges = (index: number) => {
    console.log('handleSheetChanges', index);
  };

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop {...props} enableTouchThrough={true} closeOnPress={true} />
  );

  const renderBackground = () => {
    return (
      <Block block>
        <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={100} />
      </Block>
    );
  };
  return (
    <BottomSheetModalProvider>
      <Block style={styles(theme).container}>
        <Button onPress={handlePresentModalPress} text="Present Modal" color="black" />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          dismissOnPanDown={true}
          backdropComponent={renderBackdrop}
          backgroundComponent={renderBackground}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <Block style={styles(theme).contentContainer}>
            <Text>Awesome 🎉</Text>
          </Block>
        </BottomSheetModal>
      </Block>
    </BottomSheetModalProvider>
  );
};

export default memo(BottomSheet, isEqual);
