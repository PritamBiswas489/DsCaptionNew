import appColors from '@theme/appColors';
import {windowHeight, windowWidth} from '@theme/appConstant';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: windowHeight(6),
    backgroundColor: appColors.ratingBg,
    marginTop: windowHeight(3),
  },
  mainContainer: {
    height: windowWidth(18),
    width: windowWidth(18),
    borderRadius: windowWidth(10),
    borderColor: appColors.primary,
    borderWidth: 1,
    bottom: windowHeight(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.white,
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: windowWidth(18),
    width: windowWidth(18),
    borderRadius: windowWidth(10),
  },
});
