import {View, Text, StyleSheet, Linking, Alert, TouchableOpacity} from 'react-native';
import React from 'react';
import {serviceMenData} from '../data';
import {CardContainer} from '../../cardContainer';
import appColors from '@theme/appColors';
import appFonts from '@theme/appFonts';
import {fontSizes, windowHeight, windowWidth} from '@theme/appConstant';
import {propsType} from './types';
import {useValues} from '../../../../../../App';
import { BookingDetailsInterface } from '@src/interfaces/bookingDetailsInterface';
 
import { Call, Email, Location } from '@utils/icons';
import { GlobalStyle } from '@style/styles';
import { InfoRow } from '../providerDetail/info';
import { maleDefault, femaleDefault } from '@src/utils/images';
import { getMediaUrl } from '@src/config/utility'

export function ServiceMenDetail({bookingDetails}: {bookingDetails:BookingDetailsInterface}) {
  const {isDark,t} = useValues();
  const defaultImageValue = bookingDetails.serviceMeninfo.gender !== 'female' ? femaleDefault : maleDefault
  let profileImage = ''
  if (bookingDetails.serviceMeninfo.profileImage && bookingDetails.serviceMeninfo.profileImage !== 'default.png') {
    profileImage = `${getMediaUrl()}/serviceman/profile/${bookingDetails.serviceMeninfo.profileImage}`
  }
  return (
    <View>
      <Text
        style={[
          styles.titleStyle,
          {
            marginTop:  windowHeight(2),
            color: isDark ? appColors.white : appColors.darkText,
          },
        ]}>
        {t('serviceManDetails.servicemenDetails')} :{' '}
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
      data={[
        {
          name:bookingDetails.serviceMeninfo.name,
          image: profileImage,
          defaultImageValue
        }
      ]}  />

      
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
        let phoneNumberURI = `tel:${bookingDetails.serviceMeninfo.phone}`;
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
          subHeading={bookingDetails.serviceMeninfo.phone}
        />
      </TouchableOpacity>
      </View>
      </View>
    
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    color: appColors.darkText,
    fontFamily: appFonts.NunitoSemiBold,
    fontSize: fontSizes.FONT4,
    marginTop: windowHeight(1),
    marginHorizontal: windowWidth(2),
  },
  innerContainer: {
    borderColor: appColors.border,
    borderWidth: 1,
    backgroundColor: appColors.white,
    borderRadius: windowWidth(3),
    marginVertical: windowWidth(3),
    paddingBottom: windowHeight(2),
  },
  containerStyle: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: windowWidth(0),
    paddingTop: windowWidth(1),
  },
});
