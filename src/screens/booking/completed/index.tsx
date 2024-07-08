import {View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import {GlobalStyle} from '@style/styles';
import {BookingDetail, Description} from '@otherComponent/index';
import GradientBtn from '@commonComponents/gradientBtn';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'src/navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useValues} from '../../../../App';
import appColors from '@theme/appColors';

type routeProps = NativeStackNavigationProp<RootStackParamList>;

export function CompletedBooking({route}: any) {
  const [bookStatusModal, setBookStatusModal] = useState(false);
  const extraCharges = [{name: 'Ac repair', amount: '20', noService: 3}];
  const {navigate} = useNavigation<routeProps>();
  const {isDark} = useValues();

  const details = route?.params?.serviceProofData?.details;
  const serviceTitle = route?.params?.serviceProofData?.serviceTitle;
  const image = route?.params?.serviceProofData?.image;

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDark ? appColors.darkTheme : appColors.white},
      ]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          GlobalStyle.mainView,
          {backgroundColor: isDark ? appColors.darkTheme : appColors.white},
        ]}>
        <BookingDetail title="booking.completeBooking" />
        <View
          style={[
            styles.mainContainer,
            {
              backgroundColor: isDark ? appColors.darkCardBg : appColors.boxBg,
              borderBottomColor: isDark
                ? appColors.darkBorder
                : appColors.border,
              borderBottomWidth: isDark ? 0.1 : 1,
            },
          ]}>
          <View
            style={[
              styles.innerContainer,
              {borderColor: isDark ? appColors.darkBorder : appColors.border},
            ]}>
            <Description
              setBookingStatus={setBookStatusModal}
              item={route?.params?.bookingData}
              contactOptions={true}
              bookingStatus="completedBooking"
              extraCharges={extraCharges}
              serviceProof={route?.params?.serviceProofData}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <GradientBtn
          label="booking.serviceProof"
          onPress={() =>
            navigate('ServiceProof', {
              serviceProofData: {
                serviceTitle: serviceTitle,
                details: details,
                image: image,
              },
            })
          }
        />
      </View>
    </View>
  );
}
