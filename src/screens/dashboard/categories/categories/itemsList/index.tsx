import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {GlobalStyle} from '@style/styles';
import {categoriesData} from './data/data';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/types';
import {RightArrow} from '@utils/icons';
import {styles} from './styles';
import {useValues} from '../../../../../../App';
import appColors from '@theme/appColors';

type ItemsProps = NativeStackNavigationProp<RootStackParamList>;

export default function ItemsList({isGrid}: {isGrid: boolean}) {
  const {navigate} = useNavigation<ItemsProps>();
  const {isDark, t} = useValues();
  return (
    <View style={[styles.container, isGrid && styles.mainVIew]}>
      <FlatList
        showsVerticalScrollIndicator={!isGrid && false}
        contentContainerStyle={!isGrid && styles.containerStyle}
        data={categoriesData}
        key={isGrid ? 'h' : 'v'}
        numColumns={isGrid ? 4 : 0}
        renderItem={({item}) =>
          isGrid ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigate('ServiceList')}
              style={[
                !isGrid ? GlobalStyle.mainContainer : null,
                styles.gridStyle,
              ]}>
              <>
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor: isDark
                        ? appColors.darkCard
                        : appColors.boxBg,
                    },
                  ]}>
                  {item.icon}
                </View>
                <Text style={[GlobalStyle.title, styles.textStyle]}>
                  {t(item.title)}
                </Text>
              </>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigate('ServiceList')}>
              <View style={styles.rowContainer}>
                <View style={[styles.row, {alignItems: 'center'}]}>
                  <View
                    style={[
                      styles.iconView,
                      {
                        backgroundColor: isDark
                          ? appColors.darkCard
                          : appColors.boxBg,
                      },
                    ]}>
                    {item.icon}
                  </View>
                  <Text
                    style={[
                      styles.titleStyle,
                      {color: isDark ? appColors.white : appColors.darkText},
                    ]}>
                    {t(item.title)}
                  </Text>
                </View>
                <View>
                  <RightArrow />
                </View>
              </View>
            </TouchableOpacity>
          )
        }
        ItemSeparatorComponent={() =>
          !isGrid && (
            <View
              style={[
                GlobalStyle.horizontalLine,
                styles.separator,
                {borderColor: isDark ? appColors.darkBorder : appColors.border},
              ]}></View>
          )
        }
      />
    </View>
  );
}
