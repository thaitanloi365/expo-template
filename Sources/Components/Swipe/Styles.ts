import {Dimensions, StyleSheet} from 'react-native';
import {AppTheme} from '@Types';
import {scale, verticalScale} from '@Common/Scale';
import {FontSizeDefault} from '@Themes';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const SCALE_WIDTH = 1;
const SCALE = 0.85;

export const styles = (theme: AppTheme) =>
  StyleSheet.create({
    cardStyle: {
      width: SCREEN_WIDTH,
    },
    cardStyleSecond: {
      position: 'absolute',
    },
    containerSwipe: {
      backgroundColor: 'transparent',
    },
    card: {
      backgroundColor: 'transparent',
    },
    cardItem: {
      width: SCREEN_WIDTH - verticalScale(20) * 2,
      // height: '100%',
      borderRadius: scale(20),
      overflow: 'hidden',

      marginLeft: verticalScale(20),

      // right: '5%',
    },
    heightFull: {
      height: '100%',
    },
    height169: {
      height: (((SCREEN_WIDTH - verticalScale(20) * 2) * 16) / 9) * SCALE,
    },

    cardGradient: {
      // position: 'absolute',
      // left: 0,
      // right: 0,
      // top: 0,
      // bottom: 0,
    },
    imageWrap: {
      borderRadius: scale(20),
    },
    title: {
      paddingHorizontal: scale(6),
      paddingTop: verticalScale(4),
      paddingBottom: verticalScale(6),
    },
    circleTextWrap: {
      justifyContent: 'center',
      alignItems: 'center',
      width: scale(30),
      height: scale(30),
      borderColor: 'white',
      borderWidth: 2,
      borderRadius: scale(15),

      textAlign: 'center',
    },

    rectangleTextWrap: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'white',
      borderWidth: 2,
      borderRadius: scale(10),

      textAlign: 'center',

      paddingVertical: verticalScale(10),
      paddingHorizontal: verticalScale(5),
    },

    overlayLeftLabel: {
      backgroundColor: 'transparent',
      borderColor: '#6ee3b4',
      borderWidth: scale(4),
      fontSize: FontSizeDefault.FONT_32,
      color: '#6ee3b4',
      fontWeight: 'bold',
    },
    overlayLeftLabelWrap: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      marginTop: 30,
      marginLeft: -30,
    },
    overlayRightLabel: {
      backgroundColor: 'transparent',
      borderColor: '#ec5288',
      borderWidth: scale(4),
      fontSize: FontSizeDefault.FONT_32,
      color: '#ec5288',
      fontWeight: 'bold',
    },
    overlayRightLabelWrap: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginTop: 30,
      marginLeft: 30,
    },
  });

export default styles;
