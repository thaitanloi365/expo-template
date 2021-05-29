import {StyleSheet} from 'react-native';
import {scale, verticalScale} from '@Common/Scale';
import {AppTheme} from '@Types';

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    actions: {
      marginTop: verticalScale(45),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      paddingHorizontal: scale(15),
      paddingBottom: scale(30),
    },
    refreshButton: {
      paddingVertical: verticalScale(14),
      width: scale(160),
      marginTop: verticalScale(10),
    },
  });

export default styles;
