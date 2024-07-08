import {StyleSheet} from 'react-native';
import {fontSizes, windowHeight, windowWidth} from '@theme/appConstant';
import appColors from '@theme/appColors';
import appFonts from '@theme/appFonts';

export const styles = StyleSheet.create({
  titleStyle: {
    color: appColors.darkText,
    fontFamily: appFonts.NunitoSemiBold,
    fontSize: fontSizes.FONT4,
    marginTop: windowHeight(1),
    marginHorizontal: windowWidth(2),
  },
  note: {
    color: appColors.darkText,
    margin: windowWidth(1),
    fontSize: fontSizes.FONT3HALF,
    fontFamily: appFonts.NunitoMedium,
    marginHorizontal: windowWidth(2),
    marginTop: windowWidth(1),
  },
});
