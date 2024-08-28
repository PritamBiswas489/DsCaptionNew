import { ScrollView } from 'react-native-virtualized-view';
import React, { useEffect, useState } from 'react';
import { Chat, Notification } from '@utils/icons';
import Header from '@commonComponents/header';
import { GlobalStyle } from '@style/styles';
import { TotalBalance } from '@otherComponent/home';
import { DashBoard } from '../dashBoard';
import HeadingRow from '@commonComponents/headingRow';
import { BookingData } from '../data';
import BookingList from '@screens/booking/allBooking/bookingList';
import BlogView from '../blogList';
import StaticsDetail from '../staticsDetail';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'src/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CommonModal from '@commonComponents/commonModal';
import WalletModal from '@otherComponent/wallet/walletModal';
import CancelBooking from '@otherComponent/booking/cancelBooking';
import { windowHeight } from '@theme/appConstant';
import ModalComponent from '@commonComponents/modal';
import { acceptBooking } from '@utils/images';
import appColors from '@theme/appColors';
import { useValues } from '../../../../../App';
import { Provider } from '@screens/dashboard/serviceMan/home';
import { ServiceMenDashBoard } from '@screens/dashboard/serviceMan/home';
import { ServiceMen } from './serviceMen';
import { ProviderLogin } from './provider';
import { Alert, RefreshControl } from 'react-native';
import SkeletonLoader from '@src/commonComponents/SkeletonLoader';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';

import { homeloadServiceMenData } from '@src/services/load.servicemen';
import { loadMySubscriptionFunc } from '@src/services/load.mysubscription';

import HomeNoFataFound from '@src/commonComponents/homeNoDataFound';
import { homeBookingList } from '@src/services/load.booking.service';
import HomeBookingList from '@src/commonComponents/homeBookingList';

type navigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Response {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

export function Home() {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [cancelBookingModal, setCancelBookingModal] = useState(false);
  const [acceptBookingModal, setAcceptBookingModal] = useState(false);
  const { navigate } = useNavigation<navigationProp>();
  const { isDark, isServiceManLogin, t } = useValues();
  const [showSkeletonLoader, setSkeletonLoader] = useState(true)
 
  const [refreshing, setRefreshing] = React.useState(false);
  const [servicemenNeedFresh, setServicemenNeedFresh] = useState(true)
  const [subscriptionFresh, setSubscriptionFresh] = useState(true)
  const [recentBookingFresh, setRecentBookingFresh] = useState(true)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setServicemenNeedFresh(true)
    setSubscriptionFresh(true)
    setSkeletonLoader(true)
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const {
    serviceMenLimit,
    bookingList
  } = useSelector((state: RootState) => state['homeData'])

  const dispatch = useDispatch()

  const loadData = async () => {
    const queryParams = `?offset=1&limit=${serviceMenLimit}&status=active`
    await homeloadServiceMenData(queryParams, dispatch)
    setServicemenNeedFresh(false)
  }
  useEffect(() => {
    if (servicemenNeedFresh) {
      loadData()
    }
  }, [servicemenNeedFresh])

  const loadmySubscriptionData = async () => {
    await loadMySubscriptionFunc(dispatch, '?limit=200&offset=1')
    setSubscriptionFresh(false)
  }
  useEffect(() => {
    if (subscriptionFresh) {
      loadmySubscriptionData()
    }
  }, [subscriptionFresh])


  const loadRecentBooking = async () => {
    await homeBookingList(dispatch)
    setRecentBookingFresh(false)
  }

  useEffect(() => {
    if (recentBookingFresh) {
      loadRecentBooking()
    }

  }, [recentBookingFresh])

  const filterModalVisible = () => {
    setShowWalletModal(true);
  };

  useEffect(() => {
    // console.log({ servicemenNeedFresh, subscriptionFresh })
    if (!servicemenNeedFresh && !subscriptionFresh && !recentBookingFresh) {
      setSkeletonLoader(false)
    }
  }, [servicemenNeedFresh, subscriptionFresh, recentBookingFresh])




  return (
    <ScrollView
      style={[
        GlobalStyle.mainView,
        { backgroundColor: isDark ? appColors.darkTheme : appColors.white },
      ]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      showsVerticalScrollIndicator={false}>
      {showSkeletonLoader && <SkeletonLoader />}
      {!showSkeletonLoader && <>
        <Header
          showBackArrow={false}
          title={'bottomTab.home'}
          trailIcon={
            <Chat color={isDark ? appColors.white : appColors.darkText} />
          }
          gotoScreen={() => navigate('ChatHistory')}
          trailIcon1={
            <Notification color={isDark ? appColors.white : appColors.darkText} />
          }
          onTrailIcon={() => navigate('EmptyNotification')}
        />
        {isServiceManLogin && <Provider />}
        <TotalBalance onPress={() => setShowWalletModal(true)} />
        {isServiceManLogin ? <ServiceMenDashBoard /> : <DashBoard />}
        <HeadingRow
          title={
            isServiceManLogin
              ? 'serviceMenLogin.assignedServices'
              : 'home.recentBooking'
          }
          content={'home.viewAll'}
          gotoScreen={() => navigate('Booking')}
        />
        {bookingList.length === 0 && <HomeNoFataFound message={t('newDeveloper.homeNoBookingFoundMessage')} />}
        <HomeBookingList data={bookingList} />
        <StaticsDetail />
        {isServiceManLogin ? <ServiceMen /> : <ProviderLogin />}
        <BlogView />
        <CommonModal
          modal={<WalletModal setShowWalletModal={setShowWalletModal} />}
          showModal={showWalletModal}
          visibleModal={filterModalVisible}
        />
        <CommonModal
          modal={
            <CancelBooking
              placeHolder={'booking.refuseBooking'}
              title={'booking.refuseBookingPlaceholder'}
              setShowModal={setCancelBookingModal}
              textInputContainer={{ height: windowHeight(18) }}
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
            // navigate('AcceptedBooking')
          }}
          onButton1Click={() => setAcceptBookingModal(false)}
        />
      </>}

    </ScrollView>
  );
}
