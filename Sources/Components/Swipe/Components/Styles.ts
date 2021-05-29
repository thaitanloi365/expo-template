import {Dimensions, StyleSheet} from 'react-native';
import {AppTheme} from '@Types';
import {verticalScale} from '@Common/Scale';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

console.log('*** SCREEN_HEIGHT', SCREEN_HEIGHT);

export const styles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      // height: verticalScale(SCREEN_HEIGHT),
      // backgroundColor: 'blue',
      // justifyContent: 'center',
    },
    cardStyle: {
      width: SCREEN_WIDTH,
    },
    cardStyleSecond: {
      position: 'absolute',
    },
  });

export default styles;
