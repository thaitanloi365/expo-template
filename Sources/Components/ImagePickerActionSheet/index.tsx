import React, {forwardRef, memo, useImperativeHandle, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {ImagePickerResult as RNImagePickerResult, useImagePicker} from '@Common/ImagePicker';
import ActionSheet, {ActionSheetRef} from '@Components/ActionSheet';
import {useTranslation} from 'react-i18next';
import {FontSizeDefault} from '@Themes';
import {verticalScale} from '@Common/Scale';
import Text from '@Components/Text';
import isEqual from 'react-fast-compare';
import {AppTheme} from '@Types';
import {useTheme} from '@react-navigation/native';
import {ImageOrVideo} from 'react-native-image-crop-picker';

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    textOption: {
      paddingVertical: verticalScale(10),
      fontSize: FontSizeDefault.FONT_16,
    },
    titleWrap: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    title: {
      paddingVertical: verticalScale(10),
      fontSize: FontSizeDefault.FONT_18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    cancelText: {
      fontSize: FontSizeDefault.FONT_16,
      fontWeight: 'bold',
    },
  });

interface Props {
  onImageReceived: (result: ImagePickerResult | ImageOrVideo) => void;
}
const ImagePickerActionSheet = forwardRef((props: Props, ref: any) => {
  const theme: AppTheme = useTheme();
  const {onImageReceived} = props;
  const actionSheetRef = useRef<ActionSheetRef>();

  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        actionSheetRef?.current?.show();
      },
      hide: () => {
        actionSheetRef?.current?.hide();
      },
    }),
    [],
  );

  const [show, avatarURI] = useImagePicker({
    onSuccess: onImageReceived,
  });

  const [t] = useTranslation();

  const onShowLibrary = () => {
    setTimeout(() => {
      show('library');
    }, 1000);
  };

  const onShowCamera = () => {
    setTimeout(() => {
      show('camera');
    }, 1000);
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      closeOnBackDrop
      title={
        <View style={styles(theme).titleWrap}>
          <Text style={styles(theme).title} tx="common:selectImagePicker" />
        </View>
      }
      textCancelStyle={styles(theme).cancelText}
      textOptionStyle={styles(theme).textOption}
      options={[
        {
          tx: t('common:camera'),
          text: t('common:camera'),
          value: 'camera',
          itemCallback: onShowCamera,
        },
        {
          tx: t('common:imageLibrary'),
          text: t('common:imageLibrary'),
          value: 'imageLibrary',
          itemCallback: onShowLibrary,
        },
      ]}
    />
  );
});

export default memo(ImagePickerActionSheet, isEqual);

export type ImagePickerResult = RNImagePickerResult;

export interface ImagePickerActionSheetRef {
  show: () => void;
  hide: () => void;
}
