import {StyleSheet} from 'react-native';
import {AppTheme} from '@Types';

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    viewPager: {
      flex: 1,
    },
    modal: {
      marginHorizontal: 0,
      marginVertical: 0,
    },
    page: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
  });

export default styles;
