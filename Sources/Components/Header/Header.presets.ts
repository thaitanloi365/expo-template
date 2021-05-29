import {StyleSheet} from 'react-native';
import {scale} from '@Common/Scale';
import {FontSizeDefault} from '@Themes';
import {AppTheme} from '@Types';

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    title: {
      textAlign: 'center',
      // fontSize: FontSizeDefault.FONT_18,
      // color: theme.colors.text,
      // fontWeight: 'bold',
    },
    titleMiddle: {
      flex: 1,
      justifyContent: 'center',
    },
    sticky: {
      position: 'absolute',
      zIndex: 999,
      elevation: 999,
    },
  });
export default styles;
