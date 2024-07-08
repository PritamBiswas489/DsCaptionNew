import {View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {GlobalStyle} from '@style/styles';
import {BookingDetail, BookingStatus, Description} from '@otherComponent/index';
import CommonModal from '@commonComponents/commonModal';
import {ServiceOptions} from '@otherComponent/index';
import appColors from '@theme/appColors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/types';
import {StatusView} from '../pendingApproval/statusView';
import {useValues} from '../../../../App';

export function OngoingBooking({route}: any) {
  const [bookStatusModal, setBookStatusModal] = useState(false);
  const isServiceProgress = route?.params?.bookingData?.isServiceProgress;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {isDark} = useValues();
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
        ]}
        contentContainerStyle={styles.contentContainerStyle}>
        <BookingDetail title="booking.ongoingBooking" />
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
              extraCharges={route?.params?.extraCharges}
              showChargesDetail={true}
            />
          </View>
        </View>
        <CommonModal
          modal={<BookingStatus setShowModal={setBookStatusModal} />}
          showModal={bookStatusModal}
          visibleModal={() => setBookStatusModal(true)}
        />
      </ScrollView>
      {isServiceProgress ? (
        <StatusView
          statusNote="addExtraCharges.statusNote"
          containerStyle={styles.statusContainer}
          textStyle={{color: appColors.success}}
        />
      ) : (
        <ServiceOptions
          label1="booking.complete"
          label="booking.addCharges"
          onButtonClick={() => navigation.navigate('AddExtraCharges')}
          onButton1Click={() => navigation.navigate('CompletedBooking')}
          btnColor={appColors.success}
          buttonStyle={{color: appColors.white}}
        />
      )}
    </View>
  );
}
