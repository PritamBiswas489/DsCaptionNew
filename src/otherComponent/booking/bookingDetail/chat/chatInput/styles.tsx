import appColors from '@theme/appColors';
import {fontSizes, windowHeight, windowWidth} from '@theme/appConstant';
import appFonts from '@theme/appFonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 0,
    backgroundColor: appColors.boxBg,
    paddingVertical: windowWidth(1),
    width: '100%',
    borderRadius: windowHeight(1),
    paddingHorizontal: windowWidth(3),
  },
  input: {
    paddingHorizontal: windowWidth(2),
    borderRadius: windowHeight(12),
    backgroundColor: appColors.boxBg,
    width: windowWidth(60),
    fontFamily: appFonts.NunitoMedium,
    fontSize: fontSizes.FONT4,
    color: appColors.darkText,
  },
  buttonView: {
    backgroundColor: appColors.primary,
    borderRadius: windowHeight(1),
    paddingHorizontal: windowWidth(2),
    paddingVertical: windowWidth(2),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: windowWidth(2),
  },
});
