import {View, Image, Text} from 'react-native';
import React from 'react';
import {customer1} from '@utils/images';
import {styles} from './styles';
import {Email} from '@utils/icons';
import appColors from '@theme/appColors';
import {GlobalStyle} from '@style/styles';
import {AvailableBalance} from './avialableBalance';
import {useValues} from '../../../../../../App';

export function SettingInfo() {
  const {isDark, t} = useValues();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View
          style={[
            styles.imageView,
            {backgroundColor: isDark ? appColors.darkCardBg : appColors.white},
          ]}>
          <Image source={customer1} style={styles.imageStyle} />
        </View>
        <View style={styles.textView}>
          <Text
            style={[
              styles.name,
              {color: isDark ? appColors.white : appColors.darkText},
            ]}>
            {t('profileSetting.profileName')}
          </Text>
          <View style={[styles.row, {marginTop: 6}]}>
            <Email width={'20'} height={'20'} color={appColors.lightText} />
            <Text style={styles.email}>{t('profileSetting.email')}</Text>
          </View>
        </View>
      </View>
      <View
        style={[
          GlobalStyle.horizontalLine,
          {
            marginTop: 0,
            borderColor: isDark ? appColors.darkBorder : appColors.border,
          },
        ]}></View>
      <AvailableBalance />
    </View>
  );
}
