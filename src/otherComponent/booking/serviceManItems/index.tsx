import {View, Image, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {ServiceManTypes} from './types';
import {GlobalStyle} from '@style/styles';
import {Star} from '@utils/icons';
import appColors from '@theme/appColors';
import {windowWidth} from '@theme/appConstant';
import {useValues} from '../../../../App';

export function ServiceManItems({
  item,
  index,
  length,
  showMore,
}: {
  item: ServiceManTypes;
  index: number;
  length: number | undefined;
  showMore: boolean;
}) {
  const {isDark,t} = useValues();

  return (
    <View>
      {index < 1 || showMore ? (
        <View style={styles.container}>
          <View style={styles.row}>
            <Image source={item.serviceManImage} style={styles.serviceImage} />
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.title,
                  {color: isDark ? appColors.lightText : appColors.darkText},
                ]}>
                {t(item.serviceManName)}
              </Text>
              <View
                style={[
                  styles.verticalLine,
                  {
                    borderColor: isDark
                      ? appColors.darkBorder
                      : appColors.border,
                  },
                ]}></View>
              <Star height={'18'} />
              <Text
                style={[
                  styles.rate,
                  {color: isDark ? appColors.lightText : appColors.darkText},
                ]}>
                {item.serviceManRating}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View
              style={[
                GlobalStyle.dot,
                {backgroundColor: appColors.primary},
              ]}></View>
            <Text style={styles.titleStyle}>
              {t('serviceManDetails.serviceMan')}
            </Text>
          </View>
        </View>
      ) : null}
      {index < 1 || showMore
        ? length &&
          index < length - 1 && (
            <View
              style={[
                GlobalStyle.dashLine,
                {
                  width: '96%',
                  marginHorizontal: windowWidth(3),
                  borderColor: isDark ? appColors.darkBorder : appColors.border,
                },
              ]}></View>
          )
        : null}
    </View>
  );
}
