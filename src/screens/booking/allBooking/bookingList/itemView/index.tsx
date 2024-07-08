import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {windowHeight, windowWidth} from '@theme/appConstant';
import {BookingType} from '@screens/booking/data/types';
import {useValues} from '../../../../../../App';
import appColors from '@theme/appColors';

export default function ItemView({item}: {item: BookingType}) {
  const {isDark,t} = useValues();

  return (
    <View style={styles.dateContainer}>
      <View
        style={[
          styles.innerContainer,
          {
            width: windowWidth(49),
            backgroundColor: isDark ? appColors.darkCard : appColors.boxBg,
            borderColor: isDark ? appColors.darkBorder : appColors.border,
          },
        ]}>
        <Text style={styles.title}>{t('customTime.dateTime')}</Text>
        <View style={styles.row}>
          <Text
            style={[
              styles.textStyle,
              {color: isDark ? appColors.white : appColors.darkText},
            ]}>
            {t(item.date)} {t('customTime.at')} {item.time && t(item.time)}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.innerContainer,
          {
            marginHorizontal: windowHeight(1.2),
            backgroundColor: isDark ? appColors.darkCard : appColors.boxBg,
            borderColor: isDark ? appColors.darkBorder : appColors.border,
          },
        ]}>
        <Text style={styles.title}>{t('serviceManDetails.serviceMan')}</Text>
        <Text
          style={[
            styles.textStyle,
            {color: isDark ? appColors.white : appColors.darkText},
          ]}>
          {item.totalServiceMan} {t('customTime.serviceManRequires')}
        </Text>
      </View>
    </View>
  );
}
