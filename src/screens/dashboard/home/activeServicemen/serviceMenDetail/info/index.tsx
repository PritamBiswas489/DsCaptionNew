import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {Email, Call} from '@utils/icons';
import appColors from '@theme/appColors';
import {windowWidth} from '@theme/appConstant';
import {useValues} from '../../../../../../../App';
export default function Info() {
  const {t, isDark} = useValues();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? appColors.darkCard : appColors.boxBg,
          borderColor: isDark ? appColors.darkBorder : appColors.border,
        },
      ]}>
      <Text
        style={[
          styles.heading,
          {color: isDark ? appColors.white : appColors.darkText},
        ]}>
        {t('providerDetail.personalInfo')} :
      </Text>
      <View style={styles.row}>
        <Email
          strokeWidth={'1.4'}
          height={'20'}
          color={isDark ? appColors.white : appColors.darkText}
        />
        <Text
          style={[
            styles.titleStyle,
            {color: isDark ? appColors.white : appColors.darkText},
          ]}>
          {t('providerDetail.mail')}
        </Text>
        <View style={[styles.verticalLine, {right: windowWidth(2)}]}></View>
        <Text style={styles.content}>{t('serviceManDetails.email')}</Text>
      </View>
      <View style={styles.row}>
        <Call
          height={'20'}
          width={'19'}
          color={isDark ? appColors.white : appColors.darkText}
        />
        <Text
          style={[
            styles.titleStyle,
            {color: isDark ? appColors.white : appColors.darkText},
          ]}>
          {t('providerDetail.call')}
        </Text>
        <View style={styles.verticalLine}></View>
        <Text style={styles.content}>+1 236 236 5653</Text>
      </View>
    </View>
  );
}
