import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import appColors from '@theme/appColors';
import {itemType} from './types';
import {useValues} from '../../../../../App';

export default function RenderItem({
  selectedCategory,
  setCategory,
  item,
  index,
  scrollIndex,
}: itemType) {
  const {isDark,t} = useValues();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        setCategory(index), scrollIndex;
      }}
      style={[
        styles.textContainer,
        {
          backgroundColor:
            selectedCategory === index
              ? appColors.selectedCategory
              : isDark
              ? appColors.darkTheme
              : appColors.boxBg,
        },
      ]}>
      <Text
        style={[
          styles.textStyle,
          {
            color:
              selectedCategory === index
                ? appColors.primary
                : appColors.lightText,
          },
        ]}>
        {t(item.name)}
      </Text>
    </TouchableOpacity>
  );
}
