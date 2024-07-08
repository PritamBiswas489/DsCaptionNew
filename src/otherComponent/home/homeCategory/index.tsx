import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {category} from './data/data';
import {styles} from './styles';
import {useValues} from '../../../../App';
import appColors from '@theme/appColors';
export default function HomeCategory() {
  const {isDark,t} = useValues();
  const [selectedCategory, setSelectedCategory] = useState(0);
  return (
    <View style={styles.container}>
      <FlatList
        data={category}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setSelectedCategory(index)}
              style={styles.textContainer}>
              <View
                style={[
                  styles.categoryView,
                  {
                    backgroundColor: isDark
                      ? appColors.darkTheme
                      : selectedCategory === index
                      ? appColors.border
                      : appColors.white,
                    borderColor: isDark
                      ? appColors.darkBorder
                      : selectedCategory === index
                      ? appColors.darkText
                      : appColors.border,
                  },
                ]}>
                {item.icon}
              </View>
              <Text
                style={[
                  styles.textStyle,
                  {color: isDark ? appColors.white : appColors.darkText},
                ]}>
                {t(item.title)}
              </Text>
            </TouchableOpacity>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
