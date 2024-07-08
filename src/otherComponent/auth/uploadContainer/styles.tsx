import appColors from '@theme/appColors';
import {fontSizes, windowHeight, windowWidth} from '@theme/appConstant';
import appFonts from '@theme/appFonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  textView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    fontFamily: appFonts.NunitoSemiBold,
    fontSize: fontSizes.FONT4HALF,
    color: appColors.darkText,
  },
  image: {
    height: windowHeight(3),
    width: windowWidth(7),
    resizeMode: 'contain',
  },
  text: {
    color: appColors.lightText,
    fontFamily: appFonts.NunitoMedium,
    fontSize: fontSizes.FONT3HALF,
    marginTop: windowWidth(1),
  },
  container: {
    marginTop: windowWidth(0.6),
    marginHorizontal: windowWidth(6),
    marginBottom: windowHeight(0.4),
  },
  imageStyle: {
    height: windowWidth(15),
    width: windowWidth(15),
    borderRadius: windowWidth(2),
  },
  imageContainer: {
    marginHorizontal: windowWidth(6),
    marginTop: windowWidth(3),
    marginBottom: windowHeight(1),
  },
  imageView: {
    marginTop: windowWidth(2),
    height: windowHeight(10),
    width: windowWidth(89),
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
