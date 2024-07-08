import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {windowHeight, windowWidth} from '@theme/appConstant';
import {BookingType} from '@screens/booking/data/types';
import {useValues} from '../../../../../../App';
import appColors from '@theme/appColors';

export default function LocationView({item}: {item: BookingType}) {
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
        <Text style={styles.title}>{t('customTime.location')}</Text>
        <View style={styles.row}>
          {item.location && (
            <Text
              style={[
                styles.textStyle,
                {color: isDark ? appColors.white : appColors.darkText},
              ]}>
              {t(item.location)}
            </Text>
          )}
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
        <Text style={styles.title}>{t('booking.payment')}</Text>
        {item.isPartialPaid ? (
          <Text style={styles.text}>{t('booking.partialPaid')}</Text>
        ) : item.isAdvance ? (
          <Text style={styles.text}>{t('booking.paidAdvance')}</Text>
        ) : item.isPaid ? (
          <Text style={styles.text}>{t('wallet.paid')}</Text>
        ) : (
          <Text style={styles.text}>{t('booking.notPaid')}</Text>
        )}
      </View>
    </View>
  );
}
