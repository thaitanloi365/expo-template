import React, {forwardRef, memo, useImperativeHandle, useRef} from 'react';
import Modal, {ModalRef} from '@Components/Modal';
import Text from '@Components/Text';
import Row from '@Components/Row';
import Button from '@Components/Button';
import isEqual from 'react-fast-compare';
import Block from '@Components/Block';
import {scale, verticalScale} from '@Common/Scale';
import Col from '@Components/Col';

interface Props {}

type Func = () => void;

export interface UpdateAddressModalRef {
  show: (onAddNow: Func, onAddLater?: Func) => void;
}
const UpdateAddressModal = forwardRef((props: Props, ref: any) => {
  const modalRef = useRef<ModalRef>(null);
  let onAddLaterCallback: Func | null | undefined = null;
  let onAddNowCallback: Func | null | undefined = null;

  useImperativeHandle(
    ref,
    () => ({
      show: (onAddNow: Func, onAddLater?: Func) => {
        onAddLaterCallback = onAddLater;
        onAddNowCallback = onAddNow;
        modalRef?.current?.show();
      },
      hide: () => {
        modalRef?.current?.hide();
      },
    }),
    [],
  );

  const onLater = () => {
    onAddLaterCallback && onAddLaterCallback();
    modalRef?.current?.hide();
  };

  const onUpdate = () => {
    modalRef?.current?.hide();
    onAddNowCallback && onAddNowCallback();
  };
  return (
    <Modal ref={modalRef}>
      <Block
        borderRadius={scale(12)}
        marginHorizontal={scale(32)}
        paddingHorizontal={scale(32)}
        paddingTop={verticalScale(10)}
        paddingBottom={verticalScale(16)}
        alignItems="center"
        color="white">
        <Text tx="common:requireAddressForSwop" />
        <Row marginTop={verticalScale(32)}>
          <Col marginRight={scale(10)} flex={0.5}>
            <Button tx="common:later" onPress={onLater} />
          </Col>
          <Col marginLeft={scale(10)} flex={0.5}>
            <Button tx="common:updateNow" onPress={onUpdate} />
          </Col>
        </Row>
      </Block>
    </Modal>
  );
});

export default memo(UpdateAddressModal, isEqual);
