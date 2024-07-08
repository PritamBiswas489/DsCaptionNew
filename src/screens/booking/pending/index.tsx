import {View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '@style/styles';
import {BookingDetail} from '@otherComponent/index';
import {styles} from './styles';
import {
  Description,
  ServiceOptions,
  BookingStatus,
} from '@otherComponent/index';
import CommonModal from '@commonComponents/commonModal';
import CancelBooking from '@otherComponent/booking/cancelBooking';
import {windowHeight} from '@theme/appConstant';
import ModalComponent from '@commonComponents/modal';
import {acceptBooking} from '@utils/images';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/types';
import {useValues} from '../../../../App';
import appColors from '@theme/appColors';

export function PendingBooking({route}: any) {
  const [bookStatusModal, setBookStatusModal] = useState(false);
  const [cancelBookingModal, setCancelBookingModal] = useState(false);
  const [acceptBookingModal, setAcceptBookingModal] = useState(false);

  const {isDark} = useValues();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          GlobalStyle.mainView,
          {backgroundColor: isDark ? appColors.darkCardBg : appColors.white},
        ]}>
        <BookingDetail title="bookingDetail.pendingBooking" />
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
              bookingStatus="PendingBooking"
              setBookingStatus={setBookStatusModal}
              item={route?.params?.bookingData}
            />
          </View>
        </View>
        <CommonModal
          modal={<BookingStatus setShowModal={setBookStatusModal} />}
          showModal={bookStatusModal}
          visibleModal={() => setBookStatusModal(true)}
        />
        <CommonModal
          modal={
            <CancelBooking
              placeHolder={'booking.refuseBooking'}
              title={'booking.refuseBookingPlaceholder'}
              setShowModal={setCancelBookingModal}
              textInputContainer={{height: windowHeight(18)}}
              onSubmitClick={() => setCancelBookingModal(false)}
            />
          }
          showModal={cancelBookingModal}
          visibleModal={() => setCancelBookingModal(true)}
        />
        <ModalComponent
          showImage={true}
          image={acceptBooking}
          visible={acceptBookingModal}
          onClose={() => setAcceptBookingModal(false)}
          success={false}
          title="booking.acceptBooking"
          content="booking.acceptBookingContent"
          showGridButton={true}
          buttonLabel={'booking.doLater'}
          button1Label={'booking.yes'}
          onButtonClick={() => {
            setAcceptBookingModal(false)
            navigation.navigate('AcceptedBooking')
          }}
          onButton1Click={() => setAcceptBookingModal(false)}
        />
      </ScrollView>
      <ServiceOptions
        onButton1Click={() => setCancelBookingModal(true)}
        onButtonClick={() => {
          setAcceptBookingModal(true);
        }}
      />
    </>
  );
}
