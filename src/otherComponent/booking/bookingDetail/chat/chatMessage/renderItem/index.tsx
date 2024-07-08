import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {messageType} from '../../data/types';
import {chatProfile} from '@utils/images';
import {DoubleTick} from '@utils/icons';
import appColors from '@theme/appColors';
import {windowWidth} from '@theme/appConstant';
import {useValues} from '../../../../../../../App';

export default function RenderItem({item}: {item: messageType}) {
  const {isDark,t} = useValues();
  return (
    <View
      style={[
        styles.row,
        {alignSelf: item.sender === 'Sender' ? 'flex-end' : 'flex-start'},
      ]}>
      {item.sender !== 'Sender' && (
        <Image source={chatProfile} style={styles.imageStyle} />
      )}
      <View
        style={[
          styles.myMessageContainer,
          {
            alignSelf: item.sender === 'Sender' ? 'flex-end' : 'flex-start',
            backgroundColor:
              item.sender === 'Sender'
                ? appColors.primary
                : isDark
                ? appColors.darkCard
                : appColors.boxBg,

            borderBottomLeftRadius:
              item.sender === 'Sender' ? windowWidth(6) : 0,

            borderBottomRightRadius:
              item.sender === 'Sender' ? 0 : windowWidth(6),
          },
        ]}>
        <View>
          <Text
            style={[
              styles.message,
              {
                color:
                  item.sender === 'Sender'
                    ? appColors.white
                    : isDark
                    ? appColors.white
                    : appColors.darkText,
              },
            ]}>
            {t(item.message)}
          </Text>
          <View
            style={[
              styles.row,
              {
                justifyContent:
                  item.sender === 'Sender' ? 'flex-end' : 'flex-start',
              },
            ]}>
            {item.sender == 'Sender' && <DoubleTick />}
            <Text
              style={[
                styles.dateTime,
                {
                  color:
                    item.sender === 'Sender'
                      ? appColors.white
                      : appColors.lightText,
                },
              ]}>
              {item.date} {t('chat.am')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
