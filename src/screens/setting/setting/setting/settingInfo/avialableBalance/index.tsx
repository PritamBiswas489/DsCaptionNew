import { View, Text } from 'react-native';
import React from 'react';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import appColors from '@theme/appColors';
import { GlobalStyle } from '@style/styles';
import { useValues } from '../../../../../../../App';

export function AvailableBalance() {
  const { isServiceManLogin, t } = useValues();

  return (
    <View style={styles.containerStyle}>
      <LinearGradient
        colors={[appColors.gradientBtn, appColors.primary]}
        style={styles.linearGradient}  
        start={{ x: 1, y: 0.2 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.itemContainer}>
          <Text style={styles.title}>Total Subscriptions</Text>
          
          <Text style={styles.textStyle}>10</Text>
        </View>
        
        <View style={[GlobalStyle.verticalLine, styles.verticalLine]} />

        <View style={styles.itemContainer}>
          <Text style={styles.title}>Booking Served</Text>
          <View style={styles.row}>
            <Text style={styles.price}>50</Text>
          </View>
        </View>

        <View style={[GlobalStyle.verticalLine, styles.verticalLine]} />

        <View style={styles.itemContainer}>
          <Text style={styles.title}>Days Since Joined</Text>
          <View style={styles.row}>
            <Text style={styles.price}>50</Text>
          </View>
        </View>

      </LinearGradient>
    </View>
  );
}
