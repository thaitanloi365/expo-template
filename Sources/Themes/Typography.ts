import fontFamilies from '@Assets/Fonts';
import {Platform} from 'react-native';
import {FontType} from '@Types';

export const FontDefault: FontType = {
  primary: Platform.select({
    ios: fontFamilies.NotoSansRegular,
    android: fontFamilies.NotoSansRegular,
  })!,
  secondary: Platform.select({
    ios: fontFamilies.NotoSansRegular,
    android: fontFamilies.NotoSansRegular,
  })!,
  bold: Platform.select({
    ios: fontFamilies.NotoSansBold,
    android: fontFamilies.NotoSansBold,
  })!,
  italic: Platform.select({
    ios: fontFamilies.NotoSansItalic,
    android: fontFamilies.NotoSansItalic,
  })!,
  light: Platform.select({
    ios: fontFamilies.NotoSansLight,
    android: fontFamilies.NotoSansLight,
  })!,
  medium: Platform.select({
    ios: fontFamilies.NotoSansMedium,
    android: fontFamilies.NotoSansMedium,
  })!,
};

export type FontFamily = keyof typeof FontDefault;
