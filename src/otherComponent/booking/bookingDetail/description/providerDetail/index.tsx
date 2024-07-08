import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {CardContainer} from '../../cardContainer';
import {serviceMenData} from '../data';
import {GlobalStyle} from '@style/styles';
import {Call, Email, Location} from '@utils/icons';
import {InfoRow} from './info';
import {windowHeight, windowWidth} from '@theme/appConstant';
import {useValues} from '../../../../../../App';
import appColors from '@theme/appColors';

export function ProviderDetail() {
  const {isDark,t} = useValues();
  return (
    <View>
      <Text
        style={[
          styles.titleStyle,
          {color: isDark ? appColors.white : appColors.darkText},
        ]}>
        {t('providerDetail.providerDetail')} :{' '}
      </Text>
      <View
        style={[
          styles.innerContainer,
          {
            backgroundColor: isDark ? appColors.darkTheme : appColors.white,
            borderColor: isDark ? appColors.darkBorder : appColors.border,
          },
        ]}>
        <CardContainer
          containerStyle={styles.containerStyle}
          data={serviceMenData}
        />
        <View
          style={[
            GlobalStyle.horizontalLine,
            {
              marginHorizontal: windowHeight(2),
              marginTop: windowWidth(2),
              marginBottom: 0.5,
              borderColor: isDark ? appColors.darkBorder : appColors.border,
            },
          ]}></View>
        <InfoRow
          icon={
            <Email color={isDark ? appColors.white : appColors.lightText} />
          }
          title={'providerDetail.mail'}
          subHeading={'providerDetail.email'}
        />
        <InfoRow
          icon={<Call color={isDark ? appColors.white : appColors.lightText} />}
          title={'providerDetail.call'}
          subHeading={'+1 236 236 5653'}
        />
        <InfoRow
          icon={
            <Location color={isDark ? appColors.white : appColors.lightText} />
          }
          title={'customTime.location'}
          subHeading={'bookingDetail.locationAddress'}
        />
      </View>
    </View>
  );
}
