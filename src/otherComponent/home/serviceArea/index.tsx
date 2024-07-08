import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'src/navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { useValues } from '../../../../App';
import appColors from '@theme/appColors';
type navigation = NativeStackNavigationProp<RootStackParamList>;

export default function ServiceArea({setAddress}: any) {
  const {navigate} = useNavigation<navigation>();
  const {isDark,t} = useValues()

  const handleGoToAddNewAddress = () => {
    navigate('AddNewAddress', {
      onGoBack: (addressData: number[]) => {
        setAddress(addressData);
      },
    });
  };

  return (
    <View style={styles.row}>
      <Text style={[styles.textStyle,{color: isDark ? appColors.white : appColors.darkText,}]}>{t('reviews.serviceArea')}</Text>
      <TouchableOpacity onPress={handleGoToAddNewAddress} activeOpacity={0.9}>
        <Text style={styles.address}>{t('reviews.addNewAddress')}</Text>
      </TouchableOpacity>
    </View>
  );
}
