import {isEqual} from 'lodash';
import React, {forwardRef, memo, useCallback, useImperativeHandle, useMemo, useState} from 'react';
import ViewPager, {ViewPagerOnPageSelectedEventData} from '@react-native-community/viewpager';
import ImageViewer from 'react-native-image-zoom-viewer';
import ImageRemote from '@Components/ImageRemote';
import {NativeSyntheticEvent, ViewStyle} from 'react-native';
import Modal from 'react-native-modal';
import {enhance} from '@Common/Helper';
import {useTheme} from '@react-navigation/native';
import Button from '@Components/Button';
import Block from '@Components/Block';
import TextBlurring from '@Components/TextBlurring';
import {PhotoItem, PhotoListProps} from './PhotoList.props';
import styles from './PhotoList.presets';

export interface PhotoListRef {
  getCurrentIndex: () => number;
  getCurrentItem: () => PhotoItem | null;
}
const PhotoList = forwardRef((props: PhotoListProps, ref: any) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const {
    items,
    style: styleOverride = {},
    pageStyle: pageStyleOverride = {},
    overlayView,
    width,
    height,
    emptyView,
    backgroundColor,
    previewMode = false,
    aspectRatio,
  } = props;

  useImperativeHandle(
    ref,
    () => ({
      getCurrentIndex: () => {
        return currentIndex;
      },
      getCurrentItem: () => {
        if (items?.length > 0 && items.length > currentIndex) {
          return items[currentIndex];
        }
        return null;
      },
    }),
    [],
  );

  console.log('');

  const style: ViewStyle = useMemo(
    () =>
      enhance([
        styles(theme).viewPager,
        styleOverride,
        width && {width},
        height && {height},
        backgroundColor && {backgroundColor},
      ]),
    [styleOverride],
  );

  const pageStyle: ViewStyle = useMemo(() => enhance([styles(theme).page, pageStyle]), [pageStyleOverride]);

  const onShow = useCallback(() => {
    setVisible(true);
  }, []);

  const onHide = useCallback(() => {
    setVisible(false);
  }, []);

  const renderEmptyView = () => {
    if (typeof emptyView === 'function') {
      return emptyView();
    }
    if (React.isValidElement(emptyView)) {
      return emptyView;
    }

    return <Block />;
  };

  const onPageSelected = (event: NativeSyntheticEvent<ViewPagerOnPageSelectedEventData>) => {
    setCurrentIndex(event.nativeEvent.position);
  };

  const renderOverlayView = () => {
    if (typeof overlayView === 'function') {
      return overlayView();
    }
    if (React.isValidElement(overlayView)) {
      return overlayView;
    }

    if (items?.length) {
      const text = `${currentIndex + 1}/${items?.length}`;
      return (
        <Block position="absolute" left={10} bottom={10}>
          <TextBlurring text={text} />
        </Block>
      );
    }

    return null;
  };

  return (
    <>
      <ViewPager onPageSelected={onPageSelected} style={style} initialPage={0}>
        {Array.isArray(items) && items.length > 0
          ? items?.map((item, index) => {
              const {photo, preview, thumbnail} = item;
              return (
                <Block key={`${index}`} block>
                  <Button disabled={!previewMode} preset="link" onPress={onShow}>
                    <ImageRemote
                      key={index}
                      containerStyle={{flex: 1}}
                      aspectRatio={aspectRatio}
                      resizeMode="cover"
                      preview={preview || (thumbnail ? {uri: thumbnail} : undefined)}
                      imageURL={photo}
                    />
                  </Button>
                  {renderOverlayView()}
                </Block>
              );
            })
          : renderEmptyView()}
      </ViewPager>
      {!!previewMode && (
        <Modal
          isVisible={visible}
          backdropOpacity={0}
          animationIn={'fadeIn'}
          style={[styles(theme).modal]}
          animationOut={'fadeOut'}>
          <ImageViewer imageUrls={items.map(item => ({url: item.photo}))} onSwipeDown={onHide} enableSwipeDown={true} />
        </Modal>
      )}
    </>
  );
});

export default memo(PhotoList, isEqual);

export * from './PhotoList.props';
