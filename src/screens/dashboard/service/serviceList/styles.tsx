import {StyleSheet} from 'react-native';
import {fontSizes, windowHeight, windowWidth} from '@theme/appConstant';
import appColors from '@theme/appColors';
import appFonts from '@theme/appFonts';

export const styles = StyleSheet.create({
  contentView: {
    marginTop: windowHeight(1),
  },
  titleStyle: {
    color: appColors.darkText,
    fontSize: fontSizes.FONT4HALF,
    textAlign: 'justify',
    fontFamily: appFonts.NunitoBold,
    marginTop: windowHeight(2),
    marginHorizontal: windowWidth(2),
  },
  providerImageStyle: {
    width: windowWidth(82),
  },
  itemSeparator: {
    paddingTop: windowWidth(6),
  },
  blankView: {
    height: windowHeight(3),
  },
  searchContainer: {
    width: windowWidth(48),
    marginLeft: windowWidth(2),
  },
});
