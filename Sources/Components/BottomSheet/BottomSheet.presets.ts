import {AppTheme} from '@Types';
import {StyleSheet} from 'react-native';

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      backgroundColor: 'grey',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
    },
  });

export default styles;
