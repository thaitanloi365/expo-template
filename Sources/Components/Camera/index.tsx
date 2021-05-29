import Block from '@Components/Block';
import React, {forwardRef, memo, useEffect, useImperativeHandle, useRef, useState} from 'react';
import isEqual from 'react-fast-compare';
// import {Camera as RNCamera} from 'expo-camera';
import {RNCamera} from 'react-native-camera';
import Button from '@Components/Button';
import Text from '@Components/Text';
import {ActivityIndicator, Image, StatusBar, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IconButton from '@Components/IconButton';
import Row from '@Components/Row';
import {IPhotoBlur, ReactElementFunc} from '@Types';
import * as ImagePicker from 'expo-image-picker';
// import {ImageType} from 'expo-camera/build/Camera.types';
import {scale, verticalScale} from '@Common/Scale';
import {FontSizeDefault} from '@Themes';
import Switch from '@Components/Switch';
import {BlurView} from 'expo-blur';
import {Fontisto} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import Modal, {ModalRef} from '@Components/Modal';
import {createDressActions} from '@Screens/Authorization/User/CreateDress/Redux';
import {useDispatch} from '@Common/Hook';
import {unwrapResult} from '@reduxjs/toolkit';
import * as mime from 'react-native-mime-types';
import ImagePickerCrop from 'react-native-image-crop-picker';
import {getImageSize} from '@Utils/Helper';
import Touchable from '@Components/Touchable';
import * as Permissions from 'expo-permissions';

type onImageReceivedCallback = (result: IPhotoBlur) => void;
interface Props {
  rightView?: React.ReactNode | ReactElementFunc;
  onImageReceived?: onImageReceivedCallback;
  onToggleBlur?(value: boolean, photo: string): void;
}

const styles = StyleSheet.create({
  circleButton: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderWrap: {
    flex: 0.4,
    borderRadius: scale(16),
  },
  cameraBorder: {
    marginHorizontal: scale(16),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(32),
  },
  contentWrap: {
    flex: 1,
    justifyContent: 'space-between',
  },
  previewWrap: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: verticalScale(10),
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: FontSizeDefault.FONT_14,
    margin: scale(20),
  },
  loadingWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
});
const Camera = forwardRef((props: Props, ref: any) => {
  const {rightView, onImageReceived} = props;
  const modalRef = useRef<ModalRef>(null);
  const cameraRef = useRef<RNCamera>(null);
  const [blurFace, setBlurFace] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(RNCamera.Constants.Type.back);
  const [photo, setPhoto] = useState('');
  const [photoBlur, setPhotoBlur] = useState('');
  const [loadingBlur, setLoadingBlur] = useState(false);
  const [editing, setEditing] = useState(false);
  const [snapping, setSnapping] = useState(false);
  const [loadingPhoto, setLoadingPhoto] = useState(false);

  const dispatch = useDispatch();
  const onImageReceivedCallback = useRef<onImageReceivedCallback | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      show: (onImageReceived: onImageReceivedCallback) => {
        _onResetState();
        modalRef.current?.show();
        cameraRef?.current?.resumePreview();
        onImageReceivedCallback.current = onImageReceived;
      },
      hide: () => {
        _onResetState();
        modalRef.current?.hide();
      },
    }),
    [],
  );

  useEffect(() => {
    console.log('request permission');
    onRefreshPermissions();
  }, []);

  const onRefreshPermissions = async () => {
    const {status} = await Permissions.getAsync(Permissions.CAMERA);

    if (status !== 'granted') {
      setHasPermission(false);
    }
    if (status === 'granted') {
      setHasPermission(true);
    }
  };

  const onFlip = () => {
    setType(type === RNCamera.Constants.Type.back ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back);
  };

  const onSnap = async () => {
    try {
      setSnapping(true);
      const result = await cameraRef?.current?.takePictureAsync({
        quality: 1,
        imageType: 'png',
        fixOrientation: true,
        forceUpOrientation: true,
      });
      setSnapping(false);

      cameraRef?.current?.pausePreview();

      ImagePickerCrop.openCropper({
        path: result?.uri,
        ...getImageSize(),
      })
        .then(image => {
          setLoadingPhoto(true);
          setPhoto({uri: image.path, mime: image.mime});
          setEditing(true);
        })
        .catch(error => {
          console.log('**** ImagePickerCrop error', error);
        });
    } finally {
      setSnapping(false);
    }
  };

  const onClose = () => {
    modalRef.current?.hide();
  };

  const onUsePhotoLibrary = async () => {
    console.log('onUsePhotoLibrary');
    cameraRef?.current?.pausePreview();
    ImagePickerCrop.openPicker({
      ...getImageSize(),
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        console.log('*** imge', image);
        setLoadingPhoto(true);
        // setPhoto({uri: `data:${image.mime};base64,${image.data}`, mime: image.mime});
        setPhoto({uri: image.path, mime: image.mime});
        setEditing(true);
      })
      .catch(error => {
        console.log('*** ImagePickerCrop', error);
      });
    return;
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });
      if (!result.cancelled) {
        setLoadingPhoto(true);
        setPhoto(result.uri);
        setEditing(true);
      }
    } catch (error) {
      cameraRef?.current?.resumePreview();
    }
  };

  const _onResetState = () => {
    setEditing(false);
    setPhoto('');
    setPhotoBlur('');
    setBlurFace(false);
  };

  const retake = () => {
    setEditing(false);
    setPhoto('');
    setBlurFace(false);
    setPhotoBlur('');
    cameraRef?.current?.resumePreview();
  };

  const onUse = () => {
    cameraRef?.current?.pausePreview();
    let result: IPhotoBlur = {
      uri: photo.uri,
      is_blur_face: blurFace,
      mime: photo.mime,
    };
    if (blurFace) {
      result = {
        uri: photoBlur,
        is_blur_face: blurFace,
      };
    }
    _onResetState();
    onImageReceived && onImageReceived(result);

    onImageReceivedCallback.current && onImageReceivedCallback.current(result);
    modalRef?.current?.hide();
  };

  const onToggle = (value: boolean) => {
    console.log('onToggle', value);
    setBlurFace(value);
    if (value && (!photoBlur || photoBlur === '')) {
      let formData = new FormData();
      const file: any = {
        uri: photo.uri,
        type: photo.mime,
        name: photo.uri.substring(photo.uri.lastIndexOf('/') + 1, photo.length),
      };
      formData.append('file', file);
      setLoadingBlur(true);

      dispatch(createDressActions.blurPhoto(formData))
        .then(unwrapResult)
        .then(resp => {
          console.log('onBlurPhoto resp', resp);
          setPhotoBlur(resp.data.photo);
          setLoadingBlur(false);
        })
        .catch(error => {
          setLoadingBlur(false);
          console.log('onBlurPhoto error', error);
        });
    } else {
      // props.onToggleBlur && props.onToggleBlur(value, photo);
    }
  };

  const onPhotoLoad = () => {
    setLoadingPhoto(false);
  };

  const renderRightView = () => {
    if (typeof rightView === 'function') {
      return rightView();
    }
    if (React.isValidElement(rightView)) {
      return rightView;
    }

    return (
      <Block direction="row" justifyContent="center" alignItems="center">
        {loadingBlur && <ActivityIndicator color="white" />}
        <Text color="white" tx="BLUR FACE?" marginRight={verticalScale(10)} />
        <Switch value={blurFace} onToggle={onToggle} disabled={loadingBlur} />
      </Block>
    );
  };

  const renderContent = () => {
    const insets = useSafeAreaInsets();
    if (editing) {
      return (
        <Block block style={styles.previewWrap}>
          <BlurView intensity={50} tint="dark">
            <Row
              marginHorizontal={verticalScale(20)}
              paddingTop={insets.top}
              alignHorizontal="space-between"
              alignVertical="center">
              <IconButton icon="close" iconColor="white" onPress={onClose} />
              {renderRightView()}
            </Row>
          </BlurView>
          <Block block>
            {photo !== '' && (
              <Image
                onLoad={onPhotoLoad}
                style={{flex: 1}}
                resizeMode="contain"
                source={{uri: blurFace && !loadingBlur ? photoBlur : photo?.uri}}
              />
            )}
            {loadingPhoto && (
              <View style={styles.loadingWrap}>
                <ActivityIndicator hidesWhenStopped color={'white'} size={'small'} />
              </View>
            )}
          </Block>
          <BlurView intensity={50} tint="dark">
            <Row
              paddingTop={verticalScale(16)}
              paddingBottom={insets.bottom}
              marginHorizontal={scale(16)}
              alignHorizontal="space-between"
              alignVertical="center">
              <Button
                containerStyle={styles.borderWrap}
                textStyle={styles.text}
                preset="link"
                tx="common:retake"
                onPress={retake}
                disabled={snapping}
              />
              <Button
                containerStyle={styles.borderWrap}
                textStyle={styles.text}
                preset="link"
                tx="common:use"
                onPress={onUse}
                disabled={snapping}
              />
            </Row>
          </BlurView>
        </Block>
      );
    }
    return (
      <Block block style={styles.contentWrap}>
        <BlurView intensity={50} tint="dark">
          <Row paddingTop={insets.top} alignHorizontal="space-between" alignVertical="center">
            <IconButton icon="close" iconStyle={{tintColor: 'white'}} onPress={onClose} />
            {/* {renderRightView()} */}
          </Row>
        </BlurView>

        {/* <Block block style={styles.cameraBorder} /> */}
        <Block block>
          <RNCamera ref={cameraRef} style={{flex: 1, backgroundColor: 'red'}} type={type}>
            {({camera, status, recordAudioPermissionStatus}) => {
              console.log('* camera status', status);

              if (!status) {
                return (
                  <Block block justifyContent="center" alignItems="center" color="black">
                    <ActivityIndicator color="white" size="small" />
                  </Block>
                );
              } else if (status === 'PENDING_AUTHORIZATION' || status === 'NOT_AUTHORIZED') {
                return (
                  <Block block justifyContent="center" alignItems="center" color="black">
                    <Text fontSize="FONT_16" fontWeight="bold" tx="permissions:noCamera" />
                    <Button
                      containerStyle={styles.borderWrap}
                      textStyle={styles.text}
                      preset="link"
                      tx="common:close"
                      onPress={onClose}
                    />
                  </Block>
                );
              }

              return null;
            }}
          </RNCamera>
        </Block>
        <BlurView intensity={50} tint="dark">
          <Row
            paddingTop={verticalScale(16)}
            paddingBottom={insets.bottom}
            paddingHorizontal={scale(16)}
            alignHorizontal="space-between"
            alignVertical="center">
            <Button
              containerStyle={styles.borderWrap}
              textStyle={styles.text}
              preset="link"
              tx="common:photoLibrary"
              onPress={onUsePhotoLibrary}
              disabled={snapping}>
              <Fontisto name="photograph" size={verticalScale(30)} color="white" />
            </Button>

            <Touchable disabled={snapping} activeOpacity={0.8} style={styles.circleButton} onPress={onSnap}>
              {snapping && <ActivityIndicator color="black" size="small" />}
            </Touchable>
            <Button
              containerStyle={styles.borderWrap}
              textStyle={styles.text}
              preset="link"
              tx="common:flip"
              onPress={onFlip}
              disabled={snapping}>
              <Feather name="refresh-cw" size={verticalScale(30)} color="white" />
            </Button>
          </Row>
        </BlurView>
      </Block>
    );
  };

  const renderCamera = () => {
    // if (hasPermission === null) {
    //   return (
    //     <Block block justifyContent="center" alignItems="center" color="black">
    //       <ActivityIndicator color="white" size="small" />
    //     </Block>
    //   );
    // }
    // if (hasPermission === false) {
    //   return (
    //     <Block block justifyContent="center" alignItems="center" color="black">
    //       <Text fontSize="FONT_16" fontWeight="bold" tx="permissions:noCamera" />
    //       <Button
    //         containerStyle={styles.borderWrap}
    //         textStyle={styles.text}
    //         preset="link"
    //         tx="common:close"
    //         onPress={onClose}
    //       />
    //     </Block>
    //   );
    // }

    return (
      <Block block color="black">
        {/* <Block block>
          <Block style={{backgroundColor: 'red', flex: 1}}></Block>
          <RNCamera ref={cameraRef} style={{flex: 1, backgroundColor: 'red'}} type={type}></RNCamera>
        </Block> */}
        {renderContent()}
      </Block>
    );
  };
  return (
    <Modal ref={modalRef}>
      <StatusBar backgroundColor="black" translucent barStyle="light-content" />
      {renderCamera()}
    </Modal>
  );
});

export default memo(Camera, isEqual);

export interface CameraRef {
  show(onImageReceived: onImageReceivedCallback): void;
  hide(): void;
}
