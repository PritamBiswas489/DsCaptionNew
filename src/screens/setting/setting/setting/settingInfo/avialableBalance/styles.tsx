import {StyleSheet} from 'react-native';
import appColors from '@theme/appColors';
import {fontSizes, windowHeight, windowWidth} from '@theme/appConstant';
import appFonts from '@theme/appFonts';

export const styles = StyleSheet.create({
  container: {
    height: windowWidth(17),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: windowHeight(4),
    borderRadius: windowHeight(1.3),
    flexDirection: 'row',
    paddingHorizontal: windowWidth(4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    color: appColors.white,
    fontFamily: appFonts.NunitoRegular,
    fontSize: fontSizes.FONT4,
  },
  price: {
    color: appColors.white,
    fontFamily: appFonts.NunitoBold,
    fontSize: fontSizes.FONT4HALF,
  },
  containerStyle: {
    bottom: windowHeight(3),
  },
  textStyle: {
    color: appColors.white,
    fontFamily: appFonts.NunitoBold,
    fontSize: fontSizes.FONT4,
  },
  verticalLine: {
    height: windowHeight(6),
    borderColor: appColors.border,
    borderWidth: 0.3,
    width: 0.3,
    opacity: 0.4,
  },
});
