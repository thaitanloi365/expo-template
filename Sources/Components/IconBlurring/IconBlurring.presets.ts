import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    tintColor: 'white',
    backgroundColor: 'transparent',
  },

  shadow: {
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.13)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 5,
  },
});
export default styles;
