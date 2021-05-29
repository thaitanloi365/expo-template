import {StyleSheet} from 'react-native';
import {SpacingDefault, ColorDefault, FontSizeDefault, FontDefault} from '@Themes';

const styles = StyleSheet.create({
  primary: {
    fontFamily: FontDefault.primary,
    paddingHorizontal: SpacingDefault.smaller,
    fontSize: FontSizeDefault.FONT_14,
    color: ColorDefault.primary,
  },
  display: {
    fontFamily: FontDefault.primary,
    paddingHorizontal: SpacingDefault.smaller,
    fontSize: FontSizeDefault.FONT_14,
    color: ColorDefault.text,
  },
  link: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_14,
    paddingHorizontal: SpacingDefault.smaller,
    color: ColorDefault.text,
    textDecorationLine: 'underline',
  },
  linkPrimary: {
    fontFamily: FontDefault.primary,
    fontSize: FontSizeDefault.FONT_14,
    color: ColorDefault.primary,
    textDecorationLine: 'underline',
  },

  //New format
  title: {
    fontFamily: FontDefault.primary,
    paddingHorizontal: SpacingDefault.smaller,
    fontSize: FontSizeDefault.FONT_18,
    color: ColorDefault.text,
  },
  mainText: {
    fontFamily: FontDefault.primary,
    paddingHorizontal: SpacingDefault.smaller,
    fontSize: FontSizeDefault.FONT_14,
    color: ColorDefault.text,
  },
  highlight: {
    fontFamily: FontDefault.primary,
    paddingHorizontal: SpacingDefault.smaller,
    fontSize: FontSizeDefault.FONT_14,
    color: ColorDefault.primary,
  },
  footNote: {
    fontFamily: FontDefault.primary,
    paddingHorizontal: SpacingDefault.smaller,
    fontSize: FontSizeDefault.FONT_10,
    color: ColorDefault.text,
  },
});

export type TextPresetNames = keyof typeof styles;

export default styles;
