import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {GlobalStyle} from '@style/styles';
import appColors from '@theme/appColors';
import {CustomerTypes} from './types';
import {useValues} from '../../../../App';

export function CustomerItems({item}: {item: CustomerTypes}) {
  const {isDark,t} = useValues();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={item.customerImage} style={styles.serviceImage} />
        <Text
          style={[
            styles.name,
            {color: isDark ? appColors.lightText : appColors.darkText},
          ]}>
          {t(item.customerName)}
        </Text>
      </View>
      <View style={styles.row}>
        <View style={[GlobalStyle.dot, {backgroundColor: appColors.primary}]} />
        <Text style={styles.titleStyle}>{t('wallet.customer')}</Text>
      </View>
    </View>
  );
}
