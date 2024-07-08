import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {activeTypes, data} from './data/data';
import appColors from '@theme/appColors';
import {useValues} from '../../../../../../App';

export default function WeeklySection({
  activeItem,
  setActiveItem,
}: activeTypes) {
  const {isDark,t} = useValues();

  return (
    <View style={styles.row}>
      <View style={styles.rowContainer}>
        <Text
          style={[
            styles.textStyle,
            {color: isDark ? appColors.white : appColors.darkText},
          ]}>
          {t('home.weeklyEarning')} :{' '}
        </Text>

        <Text style={styles.content}>250k</Text>
      </View>
      {data.map((item, index) => (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setActiveItem(index)}
          style={[
            styles.activeStyle,
            {
              backgroundColor:
                activeItem === index
                  ? isDark
                    ? appColors.darkTheme
                    : appColors.white
                  : isDark
                  ? appColors.darkTheme
                  : appColors.border,
              borderWidth: activeItem === index ? 1 : 0,
            },
          ]}>
          <Text
            style={[
              styles.itemStyle,
              {color: isDark ? appColors.white : appColors.lightText},
            ]}>
            {t(item.item)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
