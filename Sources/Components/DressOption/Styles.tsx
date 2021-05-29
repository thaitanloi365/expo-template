import {StyleSheet} from 'react-native';
import {scale, verticalScale} from '@Common/Scale';
import {AppTheme} from '@Types';
import {FontSizeDefault} from '@Themes';

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      marginRight: verticalScale(20),
      backgroundColor: theme.colors.background,
    },
  });

export default styles;
