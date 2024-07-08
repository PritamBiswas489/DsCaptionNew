import appColors from '@theme/appColors';
import {fontSizes, windowHeight, windowWidth} from '@theme/appConstant';
import appFonts from '@theme/appFonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  myMessageContainer: {
    backgroundColor: appColors.boxBg,
    paddingHorizontal: windowHeight(2),
    maxWidth: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: windowHeight(2),
    borderTopEndRadius: windowWidth(6),
    borderTopLeftRadius: windowWidth(6),
    paddingVertical: windowWidth(2),
  },
  message: {
    color: appColors.white,
    fontFamily: appFonts.NunitoSemiBold,
    opacity: 0.9,
    fontSize: fontSizes.FONT4,
  },
  dateTime: {
    fontFamily: appFonts.NunitoRegular,
    color: appColors.white,
    marginHorizontal: windowWidth(1),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: windowWidth(2),
  },
  imageStyle: {
    height: windowHeight(9),
    width: windowWidth(16),
    resizeMode: 'contain',
    marginTop: windowHeight(2),
  },
});
