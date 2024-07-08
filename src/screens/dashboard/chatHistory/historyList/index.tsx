import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {historyData} from '../data';
import {RootStackParamList} from 'src/navigation/types';
import {useNavigation} from '@react-navigation/native';
import {useValues} from '../../../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import appColors from '@theme/appColors';

export function HistoryList() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {isDark,t} = useValues();
  return (
    <View>
      <FlatList
        data={historyData}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Chat')}
            style={[
              styles.container,
              {backgroundColor: isDark ? appColors.darkCard : appColors.boxBg},
            ]}>
            <View style={styles.rowContainer}>
              <Image source={item.person} style={styles.imageStyle} />
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.person,
                    {color: isDark ? appColors.white : appColors.darkText},
                  ]}>
                  {t(item.personName)}
                </Text>
                <Text style={styles.msg}>{t(item.msg)}</Text>
              </View>
            </View>
            <Text style={styles.time}>{t(item.time)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
