import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {serviceMenData} from '../data';
import {CardContainer} from '../../cardContainer';
import appColors from '@theme/appColors';
import appFonts from '@theme/appFonts';
import {fontSizes, windowHeight, windowWidth} from '@theme/appConstant';
import {propsType} from './types';
import {useValues} from '../../../../../../App';

export function ServiceMenDetail({item, contactOptions}: propsType) {
  const {isDark,t} = useValues();
  return (
    <View>
      <Text
        style={[
          styles.titleStyle,
          {
            marginTop: item?.customers ? windowHeight(2) : windowWidth(1),
            color: isDark ? appColors.white : appColors.darkText,
          },
        ]}>
        {t('serviceManDetails.servicemenDetails')} :{' '}
      </Text>
      <CardContainer data={serviceMenData} contactOptions={contactOptions} />
    </View>
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    color: appColors.darkText,
    fontFamily: appFonts.NunitoSemiBold,
    fontSize: fontSizes.FONT4,
    marginTop: windowHeight(1),
    marginHorizontal: windowWidth(2),
  },
});
