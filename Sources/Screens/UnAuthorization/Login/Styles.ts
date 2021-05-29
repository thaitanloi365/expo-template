import {verticalScale, scale} from '@Common/Scale';
import {AppTheme} from '@Types';
import {StyleSheet} from 'react-native';

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    wrap: {
      paddingHorizontal: scale(34),
      backgroundColor: 'red',
    },
    logoWrap: {
      marginTop: scale(96),
      marginBottom: scale(21),
    },
    logo: {
      height: verticalScale(50),
    },
    text: {
      marginBottom: scale(60),
    },
    term: {
      position: 'absolute',
      bottom: verticalScale(20),
      alignSelf: 'center',
    },
  });

export default styles;
