import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {serviceMenListData} from './data';
import {Call, Email} from '@utils/icons';
import appColors from '@theme/appColors';
import {windowHeight} from '@theme/appConstant';
import {serviceMenType} from './data/types';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'src/navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useValues} from '../../../../../App';

export function ActiveServiceMen({data}: {data?: serviceMenType[]}) {
  const {isDark,t} = useValues();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View>
      <FlatList
        contentContainerStyle={{paddingBottom: windowHeight(2)}}
        data={data ? data : serviceMenListData}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ServiceMenDetail')}
            activeOpacity={0.9}
            style={[
              styles.container,
              {
                backgroundColor: isDark ? appColors.darkTheme : appColors.white,
                borderColor: isDark ? appColors.darkBorder : appColors.border,
              },
            ]}>
            <View style={styles.rowContainer}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.name,
                    {color: isDark ? appColors.white : appColors.darkText},
                  ]}>
                  {t(item.name)}
                </Text>
                {item.service && (
                  <Text style={styles.service}>{t(item.service)}</Text>
                )}
                {item.sinceYear && (
                  <Text style={styles.member}>
                    {t('serviceMen.memberSince')} :{' '}
                    <Text>{item.sinceYear}</Text>
                  </Text>
                )}
                {item.experience && (
                  <Text style={[styles.member, {marginTop: windowHeight(3)}]}>
                    {t('servicemen.experience')}:{' '}
                    <Text>
                      {item.experience} {t('auth.year')}
                    </Text>
                  </Text>
                )}
              </View>
            </View>
            <View>
              <View style={styles.containerView}>
                <View
                  style={[
                    styles.mainView,
                    {
                      backgroundColor: isDark
                        ? appColors.darkCard
                        : appColors.border,
                    },
                  ]}>
                  <Call
                    strokewidth={'7'}
                    color={isDark ? appColors.white : appColors.darkText}
                    height={'15'}
                    width={'17'}
                  />
                </View>
                <View
                  style={[
                    styles.mainView,
                    {
                      backgroundColor: isDark
                        ? appColors.darkCard
                        : appColors.border,
                    },
                  ]}>
                  <Email
                    height={'18'}
                    width={'18'}
                    color={isDark ? appColors.white : appColors.darkText}
                  />
                </View>
              </View>
              <View style={styles.messageContainer}>
                <Text style={styles.message}>{t('serviceMen.message')}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}
