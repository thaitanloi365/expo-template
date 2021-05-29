import React, {memo, forwardRef, useImperativeHandle, useState, useCallback} from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import isEqual from 'react-fast-compare';
import RNModal from 'react-native-modal';
import {ModalProps} from './Modal.props';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT');

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    marginVertical: 0,
    marginHorizontal: 0,
  },
});

const Modal = forwardRef((props: ModalProps, ref: any) => {
  const {style, children, ...rest} = props;
  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setIsVisible(true);
      },
      hide: () => {
        _hideModal();
      },
    }),
    [],
  );

  const [isVisible, setIsVisible] = useState(false);
  const _hideModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <RNModal
      style={[styles.modal, style]}
      useNativeDriver={true}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating
      onBackdropPress={_hideModal}
      onBackButtonPress={_hideModal}
      isVisible={isVisible}
      {...rest}>
      {props.children}
    </RNModal>
  );
});

export default memo(Modal, isEqual);

export interface ModalRef {
  show(): void;
  hide(): void;
}
