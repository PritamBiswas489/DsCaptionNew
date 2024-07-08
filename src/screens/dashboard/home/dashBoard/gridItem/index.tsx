import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {dashBoardType} from '../data/types';
import {styles} from './styles';
import {Arrow} from '@utils/icons';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'src/navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useValues} from '../../../../../../App';
import appColors from '@theme/appColors';

type navigation = NativeStackNavigationProp<RootStackParamList>;

export default function GridItem({item}: {item: dashBoardType}) {
  const {navigate} = useNavigation<navigation>();
  const {isDark,t} = useValues();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigate(item.gotoScreen as keyof RootStackParamList)}
      style={[
        styles.gridItem,
        {
          backgroundColor: isDark ? appColors.darkCard : appColors.boxBg,
          borderColor: isDark ? appColors.darkBorder : appColors.border,
        },
      ]}>
      <View
        style={[
          styles.iconContainer,
          {backgroundColor: isDark ? appColors.darkTheme : appColors.border},
        ]}>
        {isDark ? item.darkIcon : item.icon}
      </View>
      <Text style={styles.name}>{t(item.name)}</Text>
      <View style={styles.row}>
        <Text
          style={[
            styles.text,
            {color: isDark ? appColors.primary : appColors.darkText},
          ]}>
          {item.count}
        </Text>
        <Arrow />
      </View>
    </TouchableOpacity>
  );
}
