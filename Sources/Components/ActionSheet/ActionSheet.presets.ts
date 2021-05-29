import {StyleSheet} from 'react-native';
import {FontSizeDefault, FontDefault} from '@Themes';
import {AppTheme} from '@Types';
import {verticalScale} from '@Common/Scale';

export const styles = (theme: AppTheme) =>
  StyleSheet.create({
    modal: {
      margin: 0,
    },
    wrap: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      paddingBottom: 20,
      paddingHorizontal: 16,
    },
    backDrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 998,
      elevation: 998,
    },
    wrapOption: {
      backgroundColor: '#FFFFFF',
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 10,
    },
    option: {
      backgroundColor: 'transparent',
      paddingVertical: verticalScale(15),
    },
    wrapCancel: {
      backgroundColor: '#FFFFFF',
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: verticalScale(10),
    },
    buttonCancel: {
      backgroundColor: 'transparent',
      paddingVertical: verticalScale(15),
    },
    textCancel: {
      color: 'rgba(255,0,0,0.8)',
      fontSize: FontSizeDefault.FONT_16,
      fontWeight: 'bold',
    },
    wrapTitle: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
    },
    title: {
      fontSize: FontSizeDefault.FONT_20,
      fontWeight: '700',
      alignSelf: 'center',
      fontFamily: FontDefault.primary,
      color: '#333333',
    },
  });
