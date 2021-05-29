import {scale, verticalScale} from '@Common/Scale';
import {ColorDefault, FontDefault, FontSizeDefault} from '@Themes';
import {AppTheme} from '@Types';
import {StyleSheet} from 'react-native';

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    childContainer: {
      flexDirection: 'column',
      overflow: 'hidden',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: verticalScale(10),
    },
    icon: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: theme.colors.text,
    },
    subTitle: {
      marginTop: 2,
      fontSize: FontSizeDefault.FONT_14,
      color: theme.colors.text,
    },
    error: {
      fontSize: FontSizeDefault.FONT_10,
      fontWeight: 'bold',
      marginVertical: verticalScale(4),
      color: theme.colors.error,
    },
    titleErrorStyle: {
      color: theme.colors.error,
      fontWeight: 'bold',
    },
  });

export default styles;
