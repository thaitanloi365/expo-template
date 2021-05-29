const fontFamilies = {
  WorkSansMedium: 'WorkSans-Medium',
  WorkSansRegular: 'WorkSans-Regular',
  WorkSansBold: 'WorkSans-Bold',
  WorkSansLight: 'WorkSans-Light',
  WorkSansItalic: 'WorkSans-Italic',
  WorkSansMediumItalic: 'WorkSans-MediumItalic',
};

export const fonts = {
  [fontFamilies.WorkSansMedium]: require('./Sources/WorkSans-Bold.ttf'),
  [fontFamilies.WorkSansMediumItalic]: require('./Sources/WorkSans-BoldItalic.ttf'),
  [fontFamilies.WorkSansRegular]: require('./Sources/WorkSans-Regular.ttf'),
  [fontFamilies.WorkSansBold]: require('./Sources/WorkSans-Bold.ttf'),
  [fontFamilies.WorkSansLight]: require('./Sources/WorkSans-Light.ttf'),
  [fontFamilies.WorkSansItalic]: require('./Sources/WorkSans-Italic.ttf'),
};

export default fontFamilies;
