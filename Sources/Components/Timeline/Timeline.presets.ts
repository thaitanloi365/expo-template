import {scale, verticalScale} from '@Common/Scale';
import {FontSizeDefault} from '@Themes';
import {AppTheme} from '@Types';
import {StyleSheet} from 'react-native';

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    wrap: {},
    time: {},
    title: {
      marginVertical: 0,
    },
    content: {
      color: theme.colors.text,
    },
  });

export default styles;
