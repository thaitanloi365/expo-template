import {verticalScale, scale} from '@Common/Scale';
import {AppTheme} from '@Types';
import {StyleSheet} from 'react-native';

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    wrap: {
      paddingHorizontal: scale(34),
    },
    logoWrap: {
      marginTop: scale(60),
      marginBottom: scale(21),
    },
    logo: {
      height: verticalScale(33),
    },
    text: {
      marginBottom: scale(60),
    },
    row: {
      marginTop: verticalScale(20),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    btn: {
      marginBottom: verticalScale(240),
      marginHorizontal: scale(34),
    },
  });

export default styles;
