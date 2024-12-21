import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import React from 'react';
import { styles } from './styles';
import { historyData } from '../data';
import { userPlaceHolder } from '@src/utils/images';
import { RootStackParamList } from 'src/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { useValues } from '../../../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import appColors from '@theme/appColors';
import { loadCustomerChannels, loadServiceManChannels } from '@src/services/load.channel.service';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@src/store'
import { useEffect, useState } from 'react';
import { DashLine } from '@src/commonComponents';
import { timeformatting } from '@src/config/utility';
import { getMediaUrl } from '@src/config/utility';
import { Attachment } from '@src/utils/icons';
import { limitWords } from '@src/config/utility';

export function CustomerChannels({handleScrollCustomerProcessing}:{
  handleScrollCustomerProcessing:()=>void
}) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch()
  const { isDark, t } = useValues();
  const {
    channels: customerChannels,
  } = useSelector((state: RootState) => state['conversationChannel'])

   

  const gotToChatScreen = (id: string,userName:string) => {
    navigation.navigate('Chat',{id:id,toUserName:userName})
  }

  return (
    <View style={{flex:1}}>
      <FlatList
        onEndReached={handleScrollCustomerProcessing}
        data={customerChannels}
        keyExtractor={item=>String(item.id)}
        renderItem={({ item }) => {
          let profileimage:string | null = ''
          let fullName:string | null = ''
          let receivertype:string | null = ''

          if(!item.sender.vendor_id){
            profileimage = item.sender.image_full_url
            fullName = item.sender.f_name + ' '+item.sender.l_name
           
          }else if(!item.receiver.vendor_id){
            profileimage = item.receiver.image_full_url
            fullName = item.receiver.f_name + ' '+item.receiver.l_name
          }

         
          
          let bgColor =  isDark ? appColors.darkCard : appColors.boxBg
          let colortext = isDark ? appColors.white : appColors.darkText
           
          
          return <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>()=>{}}
            style={[
              styles.container,
              { backgroundColor: bgColor },
            ]}>
            <View style={styles.rowContainer}>
              {profileimage ? <Image source={{uri:profileimage}} style={styles.imageStyle} /> : <Image source={userPlaceHolder} style={styles.imageStyle} />} 
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.person,
                    { color: colortext },
                  ]}>
                  {limitWords(fullName,2)} 
                </Text>
                <Text
                  style={[
                    styles.person,
                    { color: colortext },
                  ]}>
                  {receivertype} 
                </Text>
              </View>
            </View>
            <Text style={styles.time}>{timeformatting(item?.updated_at)}</Text>
          </TouchableOpacity>
        }

        }
      />
    </View>
  );
}
