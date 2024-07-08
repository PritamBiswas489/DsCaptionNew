import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {styles} from '../styles';
import {notificationList} from './data';
import appColors from '@theme/appColors';
import appFonts from '@theme/appFonts';
import {GlobalStyle} from '@style/styles';
import {useValues} from '../../../../App';

export default function NotificationList() {
  const {isDark,t} = useValues();
  return (
    <View>
      <FlatList
        data={notificationList}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View>
            <View style={styles.containerStyle}>
              <View>
                <View style={styles.row}>
                  <Text
                    style={[
                      styles.title,
                      {
                        color: item.notificationStatus
                          ? isDark
                            ? appColors.white
                            : appColors.lightText
                          : isDark
                          ? appColors.white
                          : appColors.darkText,
                        fontFamily: item.notificationStatus
                          ? appFonts.NunitoSemiBold
                          : appFonts.NunitoBold,
                      },
                    ]}>
                    {t(item.title)}
                  </Text>
                  <View
                    style={[
                      styles.dot,
                      {
                        backgroundColor: item.notificationStatus
                          ? appColors.lightText
                          : isDark
                          ? appColors.white
                          : appColors.darkText,
                      },
                    ]}></View>
                  <Text
                    style={[
                      styles.time,
                      {
                        color: item.notificationStatus
                          ? appColors.lightText
                          : isDark
                          ? appColors.white
                          : appColors.darkText,
                      },
                    ]}>
                    {t(item.time)}
                  </Text>
                </View>

                <View>
                  <Text
                    style={[
                      styles.content,
                      {
                        color: item.notificationStatus
                          ? appColors.lightText
                          : isDark
                          ? appColors.white
                          : appColors.darkText,
                      },
                    ]}>
                    {t(item.content)}
                  </Text>
                  {item.image && (
                    <Image source={item.image} style={styles.image} />
                  )}
                </View>
              </View>

              {item.person ? (
                <Image source={item.person} style={styles.person} />
              ) : (
                <View
                  style={[
                    styles.circleView,
                    {
                      backgroundColor: isDark
                        ? appColors.darkCardBg
                        : appColors.white,
                    },
                  ]}>
                  {item.icon}
                </View>
              )}
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View
            style={[
              GlobalStyle.horizontalLine,
              {borderColor: isDark ? appColors.darkBorder : appColors.border},
            ]}></View>
        )}
      />
    </View>
  );
}
