import {View} from 'react-native';
import React from 'react';
import ServiceContentView from './serviceContentView';
import {GlobalStyle} from '@style/styles';
import TextRow from './textRow';
import appColors from '@theme/appColors';
import {Clock, Location} from '@utils/icons';
import {windowWidth} from '@theme/appConstant';
import appFonts from '@theme/appFonts';
import {ViewLocation} from './viewLocation';
import {useValues} from '../../../../App';
export function ServiceContent({bookingStatus}: {bookingStatus?: string}) {
  const {isDark,t} = useValues();
  return (
    <View>
      <ServiceContentView isShowPrice={true} />
      <View style={[GlobalStyle.mainContainer, {marginTop: windowWidth(2)}]}>
        <TextRow
          title={'customTime.dateTime'}
          content={
            t('booking.date') + ' ' + t('booking.at') + ' ' + t('booking.time')
          }
          color={appColors.success}
          icon={
            <Clock
              height={'24'}
              color={isDark ? appColors.lightText : appColors.darkText}
            />
          }
          rowStyle={{paddingTop: 0}}
          titleStyle={{fontFamily: appFonts.NunitoSemiBold}}
        />
        <TextRow
          title={'customTime.location'}
          content={'bookingDetail.locationAddress'}
          color={isDark ? appColors.lightText : appColors.darkText}
          icon={
            <Location
              color={isDark ? appColors.lightText : appColors.darkText}
            />
          }
          titleStyle={{
            fontFamily: appFonts.NunitoSemiBold,
            width: windowWidth(60),
          }}
        />
        {bookingStatus === 'PendingBooking' ? <></> : <ViewLocation />}
      </View>
    </View>
  );
}
