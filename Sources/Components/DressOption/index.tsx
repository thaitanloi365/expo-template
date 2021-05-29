import images from '@Assets/Images';
import {scale, verticalScale} from '@Common/Scale';
import Block from '@Components/Block';
import {BlockProps} from '@Components/Block/Block.props';
import ImageRemote from '@Components/ImageRemote';
import Text from '@Components/Text';
import {TextProps} from '@Components/Text/Text.props';
import {useTheme} from '@react-navigation/native';
import {AppTheme} from '@Types';
import {valueAt} from '@Utils/Helper';
import React from 'react';
import {Dimensions, Image as RNImage, Text as RNText} from 'react-native';
import styles from './Styles';

const {width} = Dimensions.get('window');

interface DressOptionProps {
  title?: string;
  text?: string;
  imageUrl?: string;
  isSelected?: boolean;
  deselectTintColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  showTintColor?: boolean;
  tintColor?: string;
}

const DressOption = ({
  title,
  imageUrl,
  isSelected,
  text,
  deselectTintColor,
  backgroundColor = 'transparent',
  borderColor,
  showTintColor = true,
  tintColor = '',
}: DressOptionProps) => {
  const theme: AppTheme = useTheme();
  const imageURLCheck =
    imageUrl && imageUrl !== ''
      ? typeof imageUrl === 'string'
        ? {uri: imageUrl}
        : imageUrl
      : images.defaultDressOption;
  const widthOption = (width - verticalScale(20) * 5) / 4;

  return (
    <Block
      block
      style={{width: widthOption}}
      justifyContent="flex-start"
      alignItems="center"
      marginRight={verticalScale(20)}
      marginBottom={verticalScale(20)}>
      <Block
        overflow="hidden"
        color={backgroundColor}
        borderWidth={2}
        borderColor={isSelected ? theme.colors.primary : borderColor || theme.colors.border}
        borderRadius={scale(8)}
        justifyContent="center"
        alignItems="center"
        style={{width: widthOption, height: widthOption}}>
        <Block
          style={{
            width: 64,
            height: 64,
            borderRadius: scale(4),
            overflow: 'hidden',
          }}>
          {text && (
            <Block block justifyContent="center" alignItems="center">
              <RNText>
                <Text
                  text={text}
                  fontWeight="bold"
                  fontSize="FONT_30"
                  color={isSelected ? theme.colors.primary : deselectTintColor || theme.colors.grey}
                />
              </RNText>
            </Block>
          )}
          {/* {!text && (
            <ImageRemote
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="cover"
              tintColor={
                showTintColor ? (isSelected ? theme.colors.primary : deselectTintColor || theme.colors.grey) : ''
              }
              preview={valueAt(imageURLCheck || [], 0, images.defaultDressOption)}
              imageURL={valueAt(imageURLCheck || [], 0, '')}
            />
          )} */}
          {!text && (
            <RNImage
              source={imageURLCheck}
              style={{
                width: '100%',
                height: '100%',
                tintColor: showTintColor
                  ? isSelected
                    ? theme.colors.primary
                    : deselectTintColor || theme.colors.grey
                  : tintColor,
              }}
              resizeMode="cover"
            />
          )}
        </Block>
      </Block>

      <Block marginTop={verticalScale(5)} justifyContent="center" alignItems="center">
        <RNText>
          <Text
            preset="footNote"
            textAlign="center"
            tx={title}
            color={isSelected ? theme.colors.primary : deselectTintColor || theme.colors.grey}
          />
        </RNText>
      </Block>
    </Block>
  );
};

export default DressOption;
