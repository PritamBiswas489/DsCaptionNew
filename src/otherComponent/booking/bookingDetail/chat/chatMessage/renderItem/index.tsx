import { View, Text, Image } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { messageType } from '../../data/types';
import { chatProfile } from '@utils/images';
import { DoubleTick } from '@utils/icons';
import appColors from '@theme/appColors';
import { windowWidth } from '@theme/appConstant';
import { useValues } from '../../../../../../../App';
import { ChatMessageInterface } from '@src/interfaces/chatMessegesInterface';
import { datetimeArr } from '@src/config/utility';
import { getMediaUrl } from '@src/config/utility';
import { userPlaceHolder } from '@utils/images';

export default function RenderItem({ item }: {
  item: {
    date: string,
    messages: ChatMessageInterface[]
  }
}) {
  const { isDark, t } = useValues();
  const dateSplit = item.date.split('_')
  return (
    <>
    
      {item.messages.map((messgeData: ChatMessageInterface, messageIndex: number) => {
        const isSender = messgeData.user.user_type === 'provider-admin'
        let profileImage = ''
        if (messgeData?.user?.profile_image && messgeData?.user?.profile_image!=='default.png' && messgeData.user.user_type === 'customer') {
             profileImage = `${getMediaUrl()}/user/profile_image/${messgeData?.user?.profile_image}`
        }
        if (messgeData?.user?.profile_image && messgeData?.user?.profile_image!=='default.png' && messgeData.user.user_type === 'provider-serviceman') {
          profileImage = `${getMediaUrl()}/serviceman/profile/${messgeData?.user?.profile_image}`
        }
        const { hours,
          minutes,
          ampm } = datetimeArr(messgeData.created_at);
        return (<View
          style={[
            styles.row,
            { alignSelf: isSender ? 'flex-end' : 'flex-start' },
          ]}>
          {!isSender  && (
            profileImage ? <Image source={{uri:profileImage}} style={styles.imageStyle} /> : <Image source={userPlaceHolder} style={styles.imageStyle} />
          )}
          <View
            style={[
              styles.myMessageContainer,
              {
                alignSelf: isSender ? 'flex-end' : 'flex-start',
                backgroundColor:
                  isSender
                    ? appColors.primary
                    : isDark
                      ? appColors.darkCard
                      : appColors.boxBg,

                borderBottomLeftRadius:
                  isSender ? windowWidth(6) : 0,

                borderBottomRightRadius:
                  isSender ? 0 : windowWidth(6),
              },
            ]}>
            <View>
              <Text
                style={[
                  styles.message,
                  {
                    color:
                      isSender
                        ? appColors.white
                        : isDark
                          ? appColors.white
                          : appColors.darkText,
                  },
                ]}>
                {messgeData.message}
              </Text>
              <View
                style={[
                  styles.row,
                  {
                    justifyContent:
                      isSender ? 'flex-end' : 'flex-start',
                  },
                ]}>
                {isSender && <DoubleTick />}
                <Text
                  style={[
                    styles.dateTime,
                    {
                      color:
                        isSender
                          ? appColors.white
                          : appColors.lightText,
                    },
                  ]}>
                  {`${hours}:${minutes} ${ampm}`}
                </Text>
              </View>
            </View>
          </View>
        </View>)

      })}
       <View style={[
        styles.timeView,
      ]}>
        <Text>{`${dateSplit?.[0]} ${dateSplit?.[1]} ${dateSplit?.[2]}`}</Text>
      </View>
     
    </>
  );
}
