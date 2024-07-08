import appColors from '@theme/appColors';
import {fontSizes, windowHeight, windowWidth} from '@theme/appConstant';
import appFonts from '@theme/appFonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: windowWidth(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: windowWidth(3),
  },
  serviceImage: {
    height: windowHeight(5),
    width: windowWidth(10),
    resizeMode: 'contain',
  },
  textContainer: {
    marginHorizontal: windowWidth(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalLine: {
    height: windowHeight(2),
    borderColor: appColors.border,
    borderWidth: 0.3,
    width: 0,
    marginTop: 6,
    marginHorizontal: windowWidth(2),
    marginVertical: 6,
  },
  title: {
    color: appColors.darkText,
    fontFamily: appFonts.NunitoSemiBold,
    fontSize: windowWidth(3.6),
  },
  rate: {
    color: appColors.darkText,
    fontFamily: appFonts.NunitoSemiBold,
    fontSize: windowWidth(3.6),
    marginHorizontal: windowWidth(1),
  },
  titleStyle: {
    color: appColors.primary,
    fontFamily: appFonts.NunitoMedium,
    fontSize: fontSizes.FONT3HALF,
  },
});
