import {verticalScale} from '@Common/Scale';
import {FontSizeDefault} from '@Themes';
import {AppTheme} from '@Types';
import {StyleSheet} from 'react-native';

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    placeHolder: {
      flex: 1,
      paddingRight: 5,
    },
    wrapView: {
      backgroundColor: theme.colors.background,
      borderRadius: 3,
      width: '100%',
    },
    wrapViewBottomOpened: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomColor: '#bbb',
    },
    wrapViewTopOpened: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderTopColor: '#bbb',
    },
    dropStyle: {
      position: 'absolute',
      minHeight: 50,
      maxHeight: 250,
      paddingHorizontal: 10,
      backgroundColor: theme.colors.background,
      shadowColor: 'rgba(0, 0, 0, 0.08)',
      shadowOffset: {
        width: 0,
        height: 20,
      },
      shadowRadius: 20,
      shadowOpacity: 1,
      elevation: 10,
    },
    dropTopOpened: {
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
    },
    dropBottomOpened: {
      borderBottomLeftRadius: 3,
      borderBottomRightRadius: 3,
    },
    wrapPlaceholder: {
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    modal: {
      marginHorizontal: 0,
      marginVertical: 0,
    },
    errorWrap: {
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
