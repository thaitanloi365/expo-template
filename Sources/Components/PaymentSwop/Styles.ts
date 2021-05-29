import {scale, verticalScale} from '@Common/Scale';
import {AppTheme} from '@Types';
import {StyleSheet} from 'react-native';

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    wrap: {
      marginHorizontal: verticalScale(20),
      marginBottom: verticalScale(20),
      paddingHorizontal: verticalScale(20),
      paddingVertical: verticalScale(20),
      backgroundColor: '#ffffff',
      shadowColor: 'rgba(0, 0, 0, 0.13)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 10,
      shadowOpacity: 1,
      borderRadius: 10,
      elevation: 5,
    },
    table: {
      borderRadius: scale(8),
      backgroundColor: 'white',
      shadowColor: 'rgba(0, 0, 0, 0.04)',
      shadowOffset: {
        width: 0,
        height: 15,
      },
      shadowRadius: 20,
      shadowOpacity: 1,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#efefef',
      elevation: 10,
    },
  });

export default styles;
