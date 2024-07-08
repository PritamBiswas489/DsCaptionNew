import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import appColors from '@theme/appColors';
import {GlobalStyle} from '@style/styles';
import {useValues} from '../../../../../../../App';

export function AvailableBalance() {
  const {isServiceManLogin,t} = useValues();
  return (
    <View style={styles.containerStyle}>
      <LinearGradient
        colors={[appColors.gradientBtn, appColors.primary]}
        style={styles.container}
        start={{x: 1, y: 0.2}}
        end={{x: 1, y: 1}}>
        <View>
          <Text style={styles.title}>
            {t(
              isServiceManLogin
                ? 'serviceMenLogin.servicemen'
                : 'profileSetting.providerType',
            )}
          </Text>
          <Text style={styles.textStyle}>
            {t(
              isServiceManLogin
                ? 'blogArr.designation'
                : 'profileSetting.company',
            )}
          </Text>
        </View>
        <View style={[GlobalStyle.verticalLine, styles.verticalLine]} />
        <View>
          <Text style={styles.title}>
            {t(
              isServiceManLogin
                ? 'providerDetail.serviceDelivered'
                : 'profileSetting.numberServiceMen',
            )}
          </Text>
          <View style={styles.row}>
            <Text style={styles.price}>
              {isServiceManLogin ? 250 + ' ' + t('wallet.service') : 20}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
