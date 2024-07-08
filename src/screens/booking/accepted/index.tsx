import {ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '@style/styles';
import {
  BookingDetail,
  BookingStatus,
  Description,
  ServiceMenModal,
  ServiceOptions,
} from '@otherComponent/index';
import {styles} from './styles';
import CommonModal from '@commonComponents/commonModal';
import {SelectedServiceMen, otherServiceMen} from '@utils/images';
import {SelectServiceMenModal} from '@otherComponent/index';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'src/navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import GradientBtn from '@commonComponents/gradientBtn';
import {useValues} from '../../../../App';
import appColors from '@theme/appColors';
import ModalComponent from '@commonComponents/modal';
import {Service} from '@utils/icons';
import CancelBooking from '@otherComponent/booking/cancelBooking';
import {windowHeight} from '@theme/appConstant';

type routeProps = NativeStackNavigationProp<RootStackParamList>;

export function AcceptedBooking({route}: any) {
  const [bookStatusModal, setBookStatusModal] = useState(false);
  const [selectServiceMenModal, setSelectServiceMenModal] = useState(false);
  const [serviceMenModal, setServiceMenModal] = useState(false);
  const [serviceMenOptions, setSelectedOptions] = useState(0);
  const {navigate} = useNavigation<routeProps>();
  const {isDark, isServiceManLogin} = useValues();
  const [startService, setStartService] = useState(false);
  const [cancelService, setCancelService] = useState(false);
  const [cancelBookingModal, setCancelBookingModal] = useState(false);

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
        <BookingDetail title="booking.acceptedBooking" />
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
            />
          </View>
        </View>
        <CommonModal
          modal={<BookingStatus setShowModal={setBookStatusModal} />}
          showModal={bookStatusModal}
          visibleModal={() => setBookStatusModal(!bookStatusModal)}
        />
        <CommonModal
          modal={
            <SelectServiceMenModal
              setSelectServiceMenModal={setSelectServiceMenModal}
              serviceMenOptions={serviceMenOptions}
              setSelectedOptions={setSelectedOptions}
              gotoScreen={() =>
                serviceMenOptions == 0
                  ? (setSelectServiceMenModal(false), setServiceMenModal(true))
                  : (setSelectServiceMenModal(false),
                    navigate('MultipleServiceMenList'))
              }
            />
          }
          showModal={selectServiceMenModal}
          visibleModal={() => setSelectServiceMenModal(!selectServiceMenModal)}
        />
        <CommonModal
          modal={
            <ServiceMenModal
              setSelectServiceMenModal={setSelectServiceMenModal}
              onButton1Click={() => {
                setServiceMenModal(false);
                setSelectServiceMenModal(false);
              }}
              onButtonClick={() => {
                setServiceMenModal(false);
                navigate('AssignedBooking');
              }}
              image={
                serviceMenOptions == 0 ? SelectedServiceMen : otherServiceMen
              }
              headerTitle={
                serviceMenOptions == 0
                  ? 'bookingDetail.selectServiceMen'
                  : 'booking.assignedServiceMen'
              }
              content={
                serviceMenOptions == 0
                  ? 'bookingDetail.selectServiceMenNote'
                  : 'booking.assignedServiceMenNote'
              }
            />
          }
          showModal={serviceMenModal}
          visibleModal={() => setServiceMenModal(!serviceMenModal)}
        />
        <ModalComponent
          icon={<Service />}
          visible={startService}
          onClose={() => setStartService(false)}
          title="booking.startService"
          content="booking.serviceConfirmation"
          btnTitle="booking.startService"
          gotoScreen={() => navigate('OngoingBooking')}
          backgroundColor={appColors.serviceBG}
          success={false}
        />
        <ModalComponent
          visible={cancelService}
          onClose={() => setCancelService(false)}
          title="booking.refuseService"
          content="booking.refuseConfirmation"
          btnTitle="booking.cancel"
          gotoScreen={() => {
            setCancelService(false);
            setCancelBookingModal(true);
          }}
          success={false}
        />
        <CommonModal
          modal={
            <CancelBooking
              placeHolder={'booking.refuseBooking'}
              title={'booking.refuseBookingPlaceholder'}
              setShowModal={setCancelBookingModal}
              textInputContainer={{height: windowHeight(18)}}
              onSubmitClick={() => {
                setCancelBookingModal(false);
                navigate('CancelledBooking');
              }}
            />
          }
          showModal={cancelBookingModal}
          visibleModal={() => setCancelBookingModal(!cancelBookingModal)}
        />
      </ScrollView>
      {isServiceManLogin && (
        <ServiceOptions
          label1={'booking.refuse'}
          label={'booking.startService'}
          onButtonClick={() => setStartService(true)}
          onButton1Click={() => setCancelService(true)}
        />
      )}

      {route?.params?.bookingData?.isAssigned == true && (
        <View style={styles.buttonContainer}>
          <GradientBtn
            label="booking.assignedNow"
            onPress={() => setSelectServiceMenModal(true)}
          />
        </View>
      )}
    </View>
  );
}
