import {scale} from '@Common/Scale';
import {ColorDefault, FontSizeDefault} from '@Themes';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  imageStyle: {
    resizeMode: 'contain',
  },
  badgeStyle: {
    position: 'absolute',
    top: scale(-15),
    right: scale(-15),
    width: scale(25),
    height: scale(25),
    borderRadius: scale(12.5),
    backgroundColor: ColorDefault.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeTextStyle: {
    color: 'white',
    fontSize: FontSizeDefault.FONT_12,
    textAlign: 'center',
    paddingHorizontal: 0,
  },
});

export default styles;
