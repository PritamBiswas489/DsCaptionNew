import { View, Text } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { windowHeight, windowWidth } from '@theme/appConstant';
import { BookingType } from '@screens/booking/data/types';
import { useValues } from '../../../../../../App';
import appColors from '@theme/appColors';
import { WithDrawListInterface } from '@src/interfaces/withdrawListInterface';
const statusColor: Record<'pending' | 'approved' | 'denied', string> = {
  pending: appColors.pending,
  approved: appColors.accepted,
  denied: appColors.error,
};
function isValidBookingStatus(status: string): status is keyof typeof statusColor {
  return status in statusColor;
}
export default function LocationView({ item }: { item: WithDrawListInterface }) {
  let backgroundColor = appColors.primary;

  if (isValidBookingStatus(item.request_status)) {
    backgroundColor = statusColor[item.request_status];
  }
  const { isDark, t } = useValues();
  return (
    <View style={styles.dateContainer}>

      {(item.request_status === 'denied' || item.request_status === 'approved')
        && <View
          style={[
            styles.innerContainer,
            {
              width: windowWidth(49),
              backgroundColor: isDark ? appColors.darkCard : appColors.boxBg,
              borderColor: isDark ? appColors.darkBorder : appColors.border,
            },
          ]}>
          <Text style={styles.title}>{
            item.request_status === 'denied' ?
              t('newDeveloper.Deniedby')
              :
              t('newDeveloper.Approvedby')

          }</Text>
          <View style={styles.row}>

            <Text
              style={[
                styles.textStyle,
                { color: isDark ? appColors.white : appColors.darkText },
              ]}>
              {item.request_updater.first_name + ' ' + item.request_updater.last_name}
            </Text>

          </View>
        </View>

      }




      <View
        style={[
          styles.innerContainer,
          {
            marginHorizontal: windowHeight(1.2),
            backgroundColor: isDark ? appColors.darkCard : appColors.boxBg,
            borderColor: isDark ? appColors.darkBorder : appColors.border,
          },
        ]}>
        <Text style={styles.title}>{t('newDeveloper.WithDrawStatus')}</Text>
        <Text style={[styles.text, { color: backgroundColor }]}>{item.request_status}</Text>
      </View>
    </View>
  );
}
