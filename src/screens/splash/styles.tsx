import appColors from '@theme/appColors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.darkText,
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
});
