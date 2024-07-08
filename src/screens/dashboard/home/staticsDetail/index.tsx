import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import LineChartView from './lineChart';
import WeeklySection from './weeklySection';
import {useValues} from '../../../../../App';
import appColors from '@theme/appColors';
export default function StaticsDetail() {
  const [activeItem, setActiveItem] = useState(0);
  const {isDark,t} = useValues();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? appColors.darkTheme : appColors.boxBg,
          borderColor: isDark ? appColors.darkBorder : appColors.border,
        },
      ]}>
      <View style={styles.innerContainer}>
        <Text
          style={[
            styles.title,
            {color: isDark ? appColors.white : appColors.darkText},
          ]}>
          {t('home.staticsDetail')}
        </Text>
        <View
          style={[
            styles.chartContainer,
            {
              backgroundColor: isDark ? appColors.darkTheme : appColors.boxBg,
              borderColor: isDark ? appColors.darkBorder : appColors.border,
            },
          ]}>
          <WeeklySection
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <LineChartView activeItem={activeItem} />
        </View>
      </View>
    </View>
  );
}
