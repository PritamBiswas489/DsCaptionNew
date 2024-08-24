import { ScrollView, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GlobalStyle } from '@style/styles';
import Header from '@commonComponents/header';
import SliderContainer from '@otherComponent/sliderContainer';
import AddNewImageSection from './addNewImage';
import { windowHeight, windowWidth } from '@theme/appConstant';
import InputView from './inputView';
import StatusSection from './statusSection';
import GradientBtn from '@commonComponents/gradientBtn';
import { useValues } from '../../../../App';
import appColors from '@theme/appColors';
import { RootStackParamList } from 'src/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';
import { BookingDetailsInterface, BookingServiceListInterface } from '@src/interfaces/bookingDetailsInterface';
import Toast from 'react-native-toast-message';
 
type routeProps = NativeStackNavigationProp<RootStackParamList>;

export function EditBooking({ route }: any) {
  const [images, setSelectedImage] = useState<string[]>([]);
  const [detailBookingDetails, setDetailsBookingDetails] = useState<BookingDetailsInterface>()
  const { isDark, t } = useValues();
  const { data: BookingDetailsState, updateData: needExstingUpdateData } = useSelector((state: RootState) => state['bookingDetails'])
  const { id: bookingId } = route?.params
  useEffect(() => {
    const checkExisting = BookingDetailsState.find(elementDet => elementDet.id === bookingId);
    setDetailsBookingDetails(checkExisting?.details)
  }, [bookingId])

  const [paymentStatus, setPaymentStatus] = useState<boolean>(false)
  const [bookingStatus,setBookingStatus] = useState<string>('')
  const [serviceMan,setServiceMan] = 
  useState<{serviceManid:string,serviceManName:string}>({serviceManid:'',serviceManName:''}) 
  const [scheduleDate,setScheduleDate] = useState<string>('')
  const [serviceCartItems,setServiceCartitems] = useState<BookingServiceListInterface[]>([])
  
  useEffect(() => {
    if(detailBookingDetails?.id){
      setPaymentStatus(detailBookingDetails.is_paid === 1 ? true : false )
      setBookingStatus(detailBookingDetails?.booking_status)
      if(detailBookingDetails?.serviceman_id){
        setServiceMan({
          serviceManid:detailBookingDetails?.serviceman_id,
          serviceManName:detailBookingDetails?.serviceMeninfo?.name
        })
      }
      setScheduleDate(detailBookingDetails.service_schedule)
      setServiceCartitems([...detailBookingDetails.servicesList]);
    }
  }, [detailBookingDetails])


  const handleUpdateCartItems = (variants:{
    serviceId:string,
    variantKey:string,
    price:string,
    serviceName:string,
    serviceCoverImage:string,
    serviceThumbnail:string
 }[])=>{
      // console.log(variants)
      
      variants.forEach((variantData,variantIndex)=>{
        const check = serviceCartItems.find(ele=>(ele.serviceId === variantData.serviceId && ele.variantKey === variantData.variantKey))
        if(check?.serviceId){
          Toast.show({
            type: 'error',
            text1: 'ERROR',
            text2: t('newDeveloper.serviceVariantAllReadyExist'),
          });
        } else{
          setServiceCartitems(prev=>[...prev,{
            serviceId:variantData.serviceId,
            variantKey:variantData.variantKey,
            serviceName: variantData.serviceName,
            serviceUnitCost: parseFloat(variantData.price),
            serviceQuantity: 1,
            serviceTotalCost: parseFloat(variantData.price),
            serviceImage: variantData.serviceCoverImage,
            servicethumbnail:variantData.serviceThumbnail,
          }])
        }
      })
      
  }

  useEffect(()=>{
      console.log(serviceCartItems)
   },[serviceCartItems])
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: windowHeight(3) }}
      showsVerticalScrollIndicator={false}
      style={[
        GlobalStyle.mainView,
        { backgroundColor: isDark ? appColors.darkCard : appColors.white },
      ]}>
      <Header showBackArrow={true} title={'newDeveloper.editBooking'} />
      <View
        style={[
          GlobalStyle.horizontalLine,
          {
            marginTop: windowHeight(3),
            marginHorizontal: 20,
            borderColor: isDark ? appColors.darkBorder : appColors.border,
          },
        ]}
      />
      {detailBookingDetails?.id && <>
        <StatusSection paymentStatus={paymentStatus} setPaymentStatus={setPaymentStatus}  />
        <InputView 
        bookingStatus={bookingStatus} 
        setBookingStatus={setBookingStatus}
        serviceMan={serviceMan}
        setServiceMan={setServiceMan}
        scheduleDate={scheduleDate}
        setScheduleDate={setScheduleDate}
        serviceCartItems={serviceCartItems}
        setServiceCartitems={setServiceCartitems}
        subCategoryId={detailBookingDetails.sub_category_id}
        handleUpdateCartItems={handleUpdateCartItems}
        />
        <GradientBtn
          label="newDeveloper.updateBooking"
          onPress={() => { Alert.alert('') }}
          additionalStyle={{
            marginHorizontal: windowWidth(5),
            marginTop: windowHeight(3),
          }}
        />
      </>}

    </ScrollView>
  );
}
