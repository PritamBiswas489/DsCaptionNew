import {View, Text} from 'react-native';
import React from 'react';
import {CardContainer} from '../../cardContainer';
import {customerData} from '../data';
import appColors from '@theme/appColors';
import {styles} from './styles';
import {propsType} from './types';
import {useValues} from '../../../../../../App';

export function CustomerDetail({item, contactOptions}: propsType) {
  const {isDark,t} = useValues();
  return (
    <View>
      <Text
        style={[
          styles.titleStyle,
          {color: isDark ? appColors.white : appColors.darkText},
        ]}>
        {t('bookingDetail.CustomerDetails')} :{' '}
      </Text>

      <CardContainer data={customerData} contactOptions={contactOptions} />
      {item?.isAssigned && (
        <Text
          style={[
            styles.note,
            {color: isDark ? appColors.lightText : appColors.darkText},
          ]}>
          {t('subscription.note')}:{' '}
          <Text
            style={[
              styles.note,
              {color: isDark ? appColors.lightText : appColors.darkText},
            ]}>
            {t('booking.serviceManNote')}
          </Text>
        </Text>
      )}
      {item?.isAssigned == false && (
        <Text style={[styles.note, {color: appColors.error}]}>
          {t('subscription.note')}:{' '}
          <Text style={[styles.note, {color: appColors.error}]}>
            {t('booking.detail')}
          </Text>
        </Text>
      )}
    </View>
  );
}
