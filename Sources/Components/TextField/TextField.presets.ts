import {scale, verticalScale} from '@Common/Scale';
import {FontSizeDefault} from '@Themes';
import {AppTheme} from '@Types';
import {StyleSheet} from 'react-native';

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    wrap: {},
    indicator: {
      marginLeft: scale(8),
      marginRight: scale(8),
    },
    title: {
      fontSize: FontSizeDefault.FONT_14,
      marginBottom: verticalScale(8),
    },
    inputWrap: {
      borderRadius: 6,
    },
    input: {
      flex: 1,
      paddingVertical: verticalScale(16),
      paddingHorizontal: scale(10),
      paddingTop: verticalScale(16),
      paddingBottom: verticalScale(16),
    },
    inputError: {
      borderColor: theme.colors.error,
      borderWidth: 1,
    },
    error: {
      fontSize: FontSizeDefault.FONT_10,
      fontWeight: 'bold',
      marginVertical: verticalScale(4),
      color: theme.colors.error,
    },
  });

export default styles;
