import {Text, ScrollView} from 'react-native';
import React from 'react';
import {GlobalStyle} from '@style/styles';
import Header from '@commonComponents/header';
import ProfileSection from './profileSection';
import InputView from './inputView';
import GradientBtn from '@commonComponents/gradientBtn';
import {windowHeight} from '@theme/appConstant';
import {RootStackParamList} from 'src/navigation/types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { useValues } from '../../../../../App';
import appColors from '@theme/appColors';

export function AddNewServiceMen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
   const {isDark,t} = useValues()
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[GlobalStyle.mainView,{backgroundColor : isDark ? appColors.darkCard : appColors.white}]}
      contentContainerStyle={{paddingBottom: windowHeight(3)}}>
      <Header showBackArrow={true} title="servicemen.addServiceMen" />
      <ProfileSection />
      <InputView />
      <GradientBtn
        label={'servicemen.addServiceMen'}
        onPress={() => navigation.goBack()}
      />
    </ScrollView>
  );
}
