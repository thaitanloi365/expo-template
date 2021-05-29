import {Dimensions, StyleSheet} from 'react-native';
import {AppTheme} from '@Types';
import {scale, verticalScale} from '@Common/Scale';
import {FontSizeDefault} from '@Themes';

export const styles = (theme: AppTheme) =>
  StyleSheet.create({
    containerSwipe: {
      backgroundColor: 'transparent',
    },
    card: {
      backgroundColor: 'transparent',
    },
    cardItem: {
      width: '100%',
      height: verticalScale(600),
      borderRadius: verticalScale(24),
      overflow: 'hidden',
    },

    cardGradient: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    imageWrap: {
      borderRadius: verticalScale(24),
    },
    title: {
      paddingHorizontal: scale(6),
      paddingTop: verticalScale(4),
      paddingBottom: verticalScale(6),
    },
    circleTextWrap: {
      justifyContent: 'center',
      alignItems: 'center',
      width: scale(28),
      height: scale(28),
      borderColor: 'white',
      borderWidth: 2,
      borderRadius: scale(14),

      textAlign: 'center',
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
