import React from 'react';
import {View} from 'react-native';
import appColors from '@theme/appColors';
import styles from './styles';
import {Switch} from 'react-native-switch';
import {switchType} from './types';
import { useValues } from '../../../App';

export default function SwitchContainer({
  switchOn,
  toggleDarkSwitch,
  containerStyle,
}: switchType) {
  const {isDark} = useValues()
  return (
    <View>
      <Switch
        containerStyle={[styles.containerStyle, containerStyle]}
        renderActiveText={false}
        renderInActiveText={false}
        value={switchOn}
        onValueChange={toggleDarkSwitch}
        switchWidthMultiplier={1.9}
        barHeight={22}
        backgroundActive={ appColors.primary}
        backgroundInactive={isDark ? appColors.darkBorder : appColors.border}
        circleSize={22}
        innerCircleStyle={[
          styles.switch,
          {
            backgroundColor: switchOn ? appColors.white : appColors.lightText,
            borderWidth: 0,
            left: switchOn ? null : 3,
            right: switchOn ? 2 : null,
          },
        ]}
      />
    </View>
  );
}
