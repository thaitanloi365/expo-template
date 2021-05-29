import {StyleSheet} from 'react-native';
import {SpacingDefault, ColorDefault, FontSizeDefault, FontDefault} from '@Themes';
import {verticalScale} from '@Common/Scale';

export const buttonStylesView = StyleSheet.create({
  primary: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: ColorDefault.primary,
  },
  secondary: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: ColorDefault.background,
  },
  white: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  link: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 4,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  black: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: ColorDefault.text,
  },
});

export const buttonTextStyles = StyleSheet.create({
  primary: {
    fontFamily: FontDefault.primary,
    paddingHorizontal: SpacingDefault.smaller,
    fontSize: FontSizeDefault.FONT_14,
    color: '#FFFFFF',
    paddingVertical: verticalScale(10),
    textAlign: 'center',
  },
  black: {
    fontFamily: FontDefault.primary,
    paddingHorizontal: SpacingDefault.smaller,
    fontSize: FontSizeDefault.FONT_14,
    color: '#FFFFFF',
    paddingVertical: verticalScale(10),
    textAlign: 'center',
  },
  secondary: {
    fontFamily: FontDefault.primary,
    paddingHorizontal: SpacingDefault.smaller,
    fontSize: FontSizeDefault.FONT_14,
    color: ColorDefault.text,
    paddingVertical: verticalScale(10),
  },
  white: {
    fontFamily: FontDefault.primary,
    paddingHorizontal: SpacingDefault.smaller,
    fontSize: FontSizeDefault.FONT_14,
    color: ColorDefault.subText,
    paddingVertical: verticalScale(10),
  },
  link: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_14,
    color: ColorDefault.text,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});

export type ButtonPresetNames = keyof typeof buttonStylesView;
