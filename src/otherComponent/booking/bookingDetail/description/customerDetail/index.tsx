import { View, Text, TouchableOpacity, Alert, Linking } from 'react-native';
import React from 'react';
import { CardContainer } from '../../cardContainer';
import { customerData } from '../data';
import appColors from '@theme/appColors';
import { styles } from './styles';
import { propsType } from './types';
import { useValues } from '../../../../../../App';
import { BookingDetailsInterface } from '@src/interfaces/bookingDetailsInterface';
import { InfoRow } from '../providerDetail/info';
import { windowHeight, windowWidth } from '@theme/appConstant';
import { Call, Email, Location } from '@utils/icons';
import { GlobalStyle } from '@style/styles';
import { getMediaUrl } from '@src/config/utility';
import { maleDefault, femaleDefault } from '@src/utils/images';


export function CustomerDetail({ bookingDetails }: { bookingDetails: BookingDetailsInterface }) {
  const { isDark, t } = useValues();
  let profileImage = ''
  if (bookingDetails.customerInfo.profileImage && bookingDetails.customerInfo.profileImage !== 'default.png') {
    profileImage = `${getMediaUrl()}/user/profile_image/${bookingDetails.customerInfo.profileImage}`
  }
  const defaultImageValue = bookingDetails.customerInfo.gender !== 'female' ? femaleDefault : maleDefault
  return (
    <View>
      <Text
        style={[
          styles.titleStyle,
          { color: isDark ? appColors.white : appColors.darkText },
        ]}>
        {t('bookingDetail.CustomerDetails')} :{' '}
      </Text>

      <CardContainer data={[
        {
          name: bookingDetails.customerInfo.firstName + ' ' + (bookingDetails?.customerInfo?.lastName ?? ''),
          image: profileImage,
          defaultImageValue
        }
      ]} />
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
      <TouchableOpacity onPress={() => {
        let phoneNumberURI = `tel:${bookingDetails.customerInfo.phone}`;
        Linking.canOpenURL(phoneNumberURI)
          .then((supported) => {
            if (!supported) {
              Alert.alert('Phone number is not available');
            } else {
              return Linking.openURL(phoneNumberURI);
            }
          })
          .catch((err: any) => console.error('Error opening dialer', err));

      }}>
        <InfoRow
          icon={<Call color={isDark ? appColors.white : appColors.lightText} />}
          title={'providerDetail.call'}
          subHeading={bookingDetails.customerInfo.phone}
        />
      </TouchableOpacity>


      {/* {item?.isAssigned && (
        <Text
          style={[
            styles.note,
            {color: isDark ? appColors.lightText : appColors.darkText},
          ]}>
          {t('subscription.note')}:{' '}
          <Text
            style={[
              styles.note,
              {color: isDark ? appColors.lightText : appColors.darkText},
            ]}>
            {t('booking.serviceManNote')}
          </Text>
        </Text>
      )} */}
      {/* {item?.isAssigned == false && (
        <Text style={[styles.note, {color: appColors.error}]}>
          {t('subscription.note')}:{' '}
          <Text style={[styles.note, {color: appColors.error}]}>
            {t('booking.detail')}
          </Text>
        </Text>
      )} */}
    </View>
  );
}
