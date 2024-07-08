import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {useValues} from '../../../../App';
import {ServiceItemsProps} from './types';
import appColors from '@theme/appColors';

export function ServiceItems({
  item,
  imageStyle,
  priceStyle,
  textStyle,
}: ServiceItemsProps) {
  const {currSymbol, currValue, isDark,t} = useValues();

  return (
    <View style={styles.rowContainer}>
      <View style={styles.row}>
        <Image
          source={item.serviceImage}
          style={[styles.serviceImage, imageStyle]}
        />
        <View>
          <View style={styles.containerStyle}>
            {item.bookingId && (
              <View style={styles.row}>
                <Text style={styles.bookId}>{t(item.bookingId)}</Text>
                {item.isPackageService && (
                  <View style={styles.packageView}>
                    <Text style={styles.text}>{t('booking.package')}</Text>
                  </View>
                )}
              </View>
            )}
            <Text
              style={[
                styles.textStyle,
                textStyle,
                {color: isDark ? appColors.white : appColors.darkText},
              ]}>
              {t(item.serviceName)}
            </Text>
            {item.price && (
              <View style={[styles.row, {alignItems: 'flex-end'}]}>
                <Text style={[styles.price, priceStyle]}>
                  {currSymbol}
                  {(currValue * item.price).toFixed(2)}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={[styles.container, {backgroundColor: item.statusBgColor}]}>
        <Text style={styles.status}>{t(item.status)}</Text>
      </View>
    </View>
  );
}
