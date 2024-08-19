import { ScrollView } from 'react-native-virtualized-view';
import React, {useEffect, useState} from 'react';
import {Chat, Notification} from '@utils/icons';
import Header from '@commonComponents/header';
import {GlobalStyle} from '@style/styles';
import {TotalBalance} from '@otherComponent/home';
import {DashBoard} from '../dashBoard';
import HeadingRow from '@commonComponents/headingRow';
import {BookingData} from '../data';
import BookingList from '@screens/booking/allBooking/bookingList';
import BlogView from '../blogList';
import StaticsDetail from '../staticsDetail';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'src/navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CommonModal from '@commonComponents/commonModal';
import WalletModal from '@otherComponent/wallet/walletModal';
import CancelBooking from '@otherComponent/booking/cancelBooking';
import {windowHeight} from '@theme/appConstant';
import ModalComponent from '@commonComponents/modal';
import {acceptBooking} from '@utils/images';
import appColors from '@theme/appColors';
import {useValues} from '../../../../../App';
import {Provider} from '@screens/dashboard/serviceMan/home';
import {ServiceMenDashBoard} from '@screens/dashboard/serviceMan/home';
import {ServiceMen} from './serviceMen';
import {ProviderLogin} from './provider';
import { Alert } from 'react-native';
import SkeletonLoader from '@src/commonComponents/SkeletonLoader';
 
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';
 
import { loadServiceMenData } from '@src/services/load.servicemen';
import { loadMySubscriptionFunc } from '@src/services/load.mysubscription';
import { mySubscriptionsAction } from '@src/store/redux/my-subscriptions-redux';

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
  const {navigate} = useNavigation<navigationProp>();
  const {isDark, isServiceManLogin} = useValues();
  const [showSkeletonLoader,setSkeletonLoader] = useState(true)
  const [processLoadServicemen,setProcessLoadeServicemen] = useState(false)
  const [processLoadMySubscription, setProcessLoadMySubscription ] =  useState(false)


  const {
    data: ServiceMenList,
    offsetPageUrl,
    limit,
    isFirstTimeLoading,
    isNoMoreData,
  } = useSelector((state: RootState) => state['serviceMenDataField'])

  const {
     
    needRefresh:needRefreshMySubscriptionData 
  } = useSelector((state: RootState) => state['mysubscriptionsData'])

  const dispatch = useDispatch()
 
  const loadData = async () =>{
     const queryParams = `${offsetPageUrl}&limit=${limit}&status=active`
     await loadServiceMenData(queryParams,dispatch)
     setProcessLoadeServicemen(false)
  }
  useEffect(()=>{
    if(ServiceMenList.length === 0){
        setProcessLoadeServicemen(true)
        loadData()
    }
  },[ServiceMenList])

  const loadmySubscriptionData = async ()=>{
    setProcessLoadMySubscription(true)
    await loadMySubscriptionFunc(dispatch,'?limit=200&offset=1')
    setProcessLoadMySubscription(false)
    dispatch(mySubscriptionsAction.setData({field:'needRefresh',data:false}))
  }
  useEffect(() => {
    if(needRefreshMySubscriptionData){
        loadmySubscriptionData()
    } 
  }, [needRefreshMySubscriptionData])

  const filterModalVisible = () => {
    setShowWalletModal(true);
  };

  useEffect(()=>{
    if(!processLoadServicemen && !processLoadMySubscription){
         setSkeletonLoader(false)
    } 
  },[processLoadServicemen])

   

  return (
    <ScrollView
      style={[
        GlobalStyle.mainView,
        {backgroundColor: isDark ? appColors.darkTheme : appColors.white},
      ]}
      showsVerticalScrollIndicator={false}>
      {showSkeletonLoader && <SkeletonLoader/> }

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
      {/* <BookingList
        setAcceptBookingModal={setAcceptBookingModal}
        setCancelBookingModal={setCancelBookingModal}
        containerStyle={{marginVertical: 0}}
        data={BookingData}
      /> */}
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
          navigate('AcceptedBooking')
        }}
        onButton1Click={() => setAcceptBookingModal(false)}
      />
      </>}
      
    </ScrollView>
  );
}
