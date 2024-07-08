import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {LeftArrow} from '@utils/icons';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'src/navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { useValues } from '../../../../../App';
type routeProps = NativeStackNavigationProp<RootStackParamList>;

export function ViewLocation() {
  const {navigate} = useNavigation<routeProps>();
  const {t} = useValues()
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} onPress={() => navigate('MapView')}>
        <Text style={styles.text}>{t('bookingDetail.viewLocation')}</Text>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <LeftArrow height={'30'} width={'18'} />
      </View>
    </View>
  );
}
