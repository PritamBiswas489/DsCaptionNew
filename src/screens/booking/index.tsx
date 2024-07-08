import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '@style/styles';
import {Notification, Search, BookingFilterIcon} from '@utils/icons';
import Header from '@commonComponents/header';
import {SearchBar} from '@otherComponent/home';
import BookingList from './allBooking/bookingList';
import {allBookingsData, BookingData} from './data/data';
import AllBookingFilter from './allBooking/allBookingFilter';
import CommonModal from '@commonComponents/commonModal';
import CancelBooking from '@otherComponent/booking/cancelBooking';
import {windowHeight} from '@theme/appConstant';
import ModalComponent from '@commonComponents/modal';
import {acceptBooking} from '@utils/images';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'src/navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BookingFilter from './bookingFilter';
import {CalenderModal} from '@otherComponent/calenderModal';
import {CategoriesModal} from '@otherComponent/index';
import appColors from '@theme/appColors';
import {useValues} from '../../../App';

type routeProps = NativeStackNavigationProp<RootStackParamList>;
export function Booking() {
  const [cancelBookingModal, setCancelBookingModal] = useState(false);
  const [acceptBookingModal, setAcceptBookingModal] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSearchModal, setSearchModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<number[]>([]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isStartDate, setIsStartDate] = useState(true);
  const [showDatePicker, setDatePicker] = useState(false);

  const {isDark, isServiceManLogin} = useValues();

  const filterModalVisible = () => {
    setShowModal(true);
  };

  const searchModalVisible = () => {
    setSearchModal(true);
  };

  const {navigate} = useNavigation<routeProps>();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={GlobalStyle.contentContainerStyle}
      style={[
        GlobalStyle.mainView,
        {backgroundColor: isDark ? appColors.darkTheme : appColors.white},
      ]}>
      <Header
        showBackArrow={false}
        title={'booking.booking'}
        trailIcon={
          <BookingFilterIcon
            color={isDark ? appColors.white : appColors.darkText}
          />
        }
        trailIcon1={
          <Notification color={isDark ? appColors.white : appColors.darkText} />
        }
        gotoScreen={() => setShowModal(true)}
        onTrailIcon={() => navigate('EmptyNotification')}
        content={
          <TouchableOpacity activeOpacity={0.9} onPress={() => {}}>
            <SearchBar searchIcon={<Search />} />
          </TouchableOpacity>
        }
      />
      {!isServiceManLogin ? (
        <AllBookingFilter />
      ) : (
        <View style={GlobalStyle.blankView} />
      )}
      <BookingList
        setAcceptBookingModal={setAcceptBookingModal}
        setCancelBookingModal={setCancelBookingModal}
        containerStyle={{marginVertical: 0}}
        data={isServiceManLogin ? allBookingsData : BookingData}
      />
      {showModal && (
        <CommonModal
          modal={
            <BookingFilter
              setSearchModal={setSearchModal}
              setShowModal={setShowModal}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setDatePicker={setDatePicker}
              setIsStartDate={setIsStartDate}
              startDate={startDate}
              endDate={endDate}
            />
          }
          showModal={showModal}
          visibleModal={filterModalVisible}
        />
      )}

      {showSearchModal && (
        <CommonModal
          modal={
            <CategoriesModal
              setSearchModal={setSearchModal}
              setShowModal={setShowModal}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          }
          showModal={showSearchModal}
          visibleModal={searchModalVisible}
        />
      )}

      <CommonModal
        modal={
          <CalenderModal
            setDatePicker={setDatePicker}
            setShowModal={setShowModal}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            isStartDate={isStartDate}
          />
        }
        showModal={showDatePicker}
        visibleModal={() => setDatePicker(true)}
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
          setAcceptBookingModal(false);
          navigate('AcceptedBooking');
        }}
        onButton1Click={() => setAcceptBookingModal(false)}
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
    </ScrollView>
  );
}
