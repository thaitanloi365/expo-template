import {StyleSheet} from 'react-native';
import {AppTheme} from '@Types';
import {scale, verticalScale} from '@Common/Scale';
import {FontSizeDefault} from '@Themes';

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    wrap: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      flex: 1,
      overflow: 'visible',
    },
    tagWrap: {
      marginRight: scale(10),
      borderRadius: verticalScale(26),
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      minWidth: scale(60),
      paddingHorizontal: scale(6),
      height: verticalScale(52),
      borderRadius: verticalScale(26),
      marginBottom: verticalScale(10),
    },
    error: {
      fontSize: FontSizeDefault.FONT_10,
      fontWeight: 'bold',
      marginVertical: verticalScale(4),
      color: theme.colors.error,
    },
  });

export default styles;
