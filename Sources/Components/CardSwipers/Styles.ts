import {Dimensions, StyleSheet} from 'react-native';
import {AppTheme} from '@Types';
import {scale, verticalScale} from '@Common/Scale';
import {FontSizeDefault} from '@Themes';

const {width} = Dimensions.get('window');

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      marginTop: verticalScale(10),
      marginBottom: verticalScale(16),
      justifyContent: 'space-between',
    },

    containerContent: {
      flex: 1,
      width: width,
    },

    containerBottom: {
      marginTop: verticalScale(40),
    },

    animated: {
      ...StyleSheet.absoluteFillObject,
      marginHorizontal: scale(20),
      // marginBottom: verticalScale(90),
      position: 'absolute',
      borderRadius: scale(24),
      overflow: 'hidden',
    },

    circle: {
      width: scale(28),
      height: scale(28),
      borderRadius: scale(14),
      borderColor: 'white',
      borderWidth: StyleSheet.hairlineWidth,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageWrap: {
      flex: 1,
    },
    circleTextWrap: {
      justifyContent: 'center',
      alignItems: 'center',
      width: scale(28),
      height: scale(28),
    },
  });

export default styles;
