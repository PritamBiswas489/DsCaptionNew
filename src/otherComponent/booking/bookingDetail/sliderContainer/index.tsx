import {View, ScrollView} from 'react-native';
import React from 'react';
import Header from '@commonComponents/header';
import {styles} from './styles';
import {bookingType} from './types';
import {GlobalStyle} from '@style/styles';
import SliderContainer from '@otherComponent/sliderContainer';
import {sliderData} from './data';
import {useValues} from '../../../../../App';
import appColors from '@theme/appColors';

export function BookingDetail({title}: bookingType) {
  const {isDark} = useValues();
  return (
    <View style={styles.container}>
      <Header showBackArrow={true} title={title} />
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        style={[
          GlobalStyle.mainView,
          {backgroundColor: isDark ? appColors.darkTheme : appColors.white},
        ]}>
        <SliderContainer data={sliderData} />
      </ScrollView>
    </View>
  );
}
