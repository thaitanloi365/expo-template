import {StyleSheet} from 'react-native';
import {verticalScale} from '@Common/Scale';
import {AppTheme} from '@Types';

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    wrap: {
      borderRadius: verticalScale(8),
      backgroundColor: '#ffffff',
      shadowColor: 'rgba(0, 0, 0, 0.04)',
      shadowOffset: {
        width: 0,
        height: 15,
      },
      shadowRadius: 20,
      shadowOpacity: 1,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginHorizontal: verticalScale(17),
      paddingHorizontal: verticalScale(14),
    },
  });

export default styles;
