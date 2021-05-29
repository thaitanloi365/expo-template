import {AppTheme} from '@Types';
import {StyleSheet} from 'react-native';

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    shadow: {
      backgroundColor: '#ffffff',
      shadowColor: 'rgba(0, 0, 0, 0.13)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 10,
      shadowOpacity: 1,
      elevation: 5,
    },
    disabledWrap: {
      opacity: 0.6,
    },
    disabledImage: {
      tintColor: theme.colors.border,
    },
  });

export default styles;
