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


export function CustomerChannels({handleScrollCustomerProcessing}:{
  handleScrollCustomerProcessing:()=>void
}) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch()
  const { isDark, t } = useValues();
  const {
    channels: customerChannels,
  } = useSelector((state: RootState) => state['customerChannel'])

  const gotToChatScreen = (id: string) => {
    Alert.alert(id)
  }

  return (
    <View style={{flex:1}}>
      <FlatList
        onEndReached={handleScrollCustomerProcessing}
        data={customerChannels}
        keyExtractor={item=>item.id}
        renderItem={({ item }) => {
          const getChannelUserNotMe = item?.channel_users.find(ele=>ele.user.user_type!=='provider-admin')
          let profileImage = ''
          if (getChannelUserNotMe?.user?.profile_image && getChannelUserNotMe?.user?.profile_image!=='default.png') {
             profileImage = `${getMediaUrl()}/user/profile_image/${getChannelUserNotMe?.user?.profile_image}`
          }
          return <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => gotToChatScreen(item?.id)}
            style={[
              styles.container,
              { backgroundColor: isDark ? appColors.darkCard : appColors.boxBg },
            ]}>
            <View style={styles.rowContainer}>
              {profileImage ? <Image source={{uri:profileImage}} style={styles.imageStyle} /> : <Image source={userPlaceHolder} style={styles.imageStyle} />} 
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.person,
                    { color: isDark ? appColors.white : appColors.darkText },
                  ]}>
                  {getChannelUserNotMe?.user?.first_name} {getChannelUserNotMe?.user?.last_name} 
                </Text>
                <Text style={styles.msg}>{item?.last_sent_message}</Text>
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
