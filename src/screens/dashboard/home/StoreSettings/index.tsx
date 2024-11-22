import { Alert, ScrollView, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GlobalStyle } from '@style/styles';
import Header from '@commonComponents/header';
import { windowHeight, windowWidth } from '@theme/appConstant';
import InputView from './inputView';
import GradientBtn from '@commonComponents/gradientBtn';
import { useValues } from '../../../../../App';
import appColors from '@theme/appColors';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/navigation/types';
import { DashLine } from '@src/commonComponents';

interface Response {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}


//Add new banner
type ItemsProps = NativeStackNavigationProp<RootStackParamList>;
export function StoreSettings() {
   
  const navigation = useNavigation<ItemsProps>();
  //store name
  const [storeName, setStoreName] = useState<string>('')
  const [errorStoreName, setErrorStoreName] = useState<string>('') 

  //contact number
  const [contactNumber,setContactNumber] = useState<string>('')
  const [errorContactNumber, setErrorContactNumber] = useState<string>('')

  //store address
  const [storeAddress,setStoreAddress] = useState<string>('')
  const [errorStoreAddress, setErrorStoreddress] = useState<string>('')

  //order minimum amount
  const [minimumOrderAmount,setMinimumOrderAmount] = useState<number>(0)
  const [errorMinimumOrderAmount,setErrorMinimumOrderAmount] = useState<string>('')
  
  //meta properties
  const [metaTitle,setMetaTitle] =  useState<string>('')
  const [errorMetaTitle,setErrorMetatitle] = useState<string>('')
  const [metaDescription,setMetaDescription] = useState<string>('')
  const [errorMetaDescription,setErrorMetaDescription]  = useState<string>('')

  //gst properties
  const [gstStatus,setGstStatus] = useState<boolean>(false)
  const [gstPercentageValue,setGstPercentageValue] = useState<number>(0)
  const [errorGstPercentageValue,setErrorGstPercentageValue] = useState<string>('')

  //status change
  const [scheduleOrderStatus,setScheduleOrderStatus] = useState<boolean>(false)
  const [deliveryStatus,setDeliveryStatus] = useState<boolean>(false)
  const [takeawayStatus,setTakewayStatus] = useState<boolean>(false)
  const [cutleryStatus,setCutleryStatus] = useState<boolean>(false)

  //logo 
  const [storeLogo,setStoreLogo] =  useState<string>('')
  //cover photo
  const [storeCoverPhoto,setStoreCoverPhoto] = useState<string>('')

  //approx delivey time
  const [approxDeliveryMinimumTime,setApproxDeliveryMinimumTime] = useState<string>('')
  const [approxDeliveryMaximumTime,setApproxDeliveryMaximumTime] = useState<string>('')
  const [approxDeliveryType,setApproxDeliveryType] =  useState<string>('minutes')

  // food type
  const [itemType,setItemType] = useState<string[]>([])




  
  const { isDark, t } = useValues();
  const dispatch = useDispatch()
  const [processingLoader, setProcessingLoader] = useState(false)


  const handleCreateBanner = async () => {
    Alert.alert('Create Item')
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={{ paddingBottom: windowHeight(3) }}
        showsVerticalScrollIndicator={false}
        style={[
          GlobalStyle.mainView,
          { backgroundColor: isDark ? appColors.darkCard : appColors.white },
        ]}>
        <Header showBackArrow={true} title={'newDeveloper.StoreSettings'} />

         
        
        <InputView
          storeName={storeName}
          setStoreName={setStoreName}
          errorStoreName={errorStoreName}
          contactNumber={contactNumber}
          setContactNumber={setContactNumber}
          errorContactNumber={errorContactNumber}
          storeAddress={storeAddress}
          setStoreAddress={setStoreAddress}
          errorStoreAddress={errorStoreAddress}
          minimumOrderAmount={minimumOrderAmount}
          setMinimumOrderAmount={setMinimumOrderAmount}
          errorMinimumOrderAmount={errorMinimumOrderAmount}
          metaTitle={metaTitle}
          setMetaTitle={setMetaTitle}
          errorMetaTitle={errorMetaTitle}
          metaDescription={metaDescription}
          setMetaDescription={setMetaDescription}
          errorMetaDescription={errorMetaDescription}
          gstStatus={gstStatus}
          setGstStatus={setGstStatus}
          gstPercentageValue={gstPercentageValue}
          setGstPercentageValue={setGstPercentageValue}
          errorGstPercentageValue={errorGstPercentageValue}
          scheduleOrderStatus={scheduleOrderStatus}
          setScheduleOrderStatus={setScheduleOrderStatus}
          deliveryStatus={deliveryStatus}
          setDeliveryStatus={setDeliveryStatus}
          takeawayStatus={takeawayStatus}
          setTakewayStatus={setTakewayStatus}
          storeLogo={storeLogo}
          setStoreLogo={setStoreLogo}
          storeCoverPhoto={storeCoverPhoto}
          setStoreCoverPhoto={setStoreCoverPhoto}
          approxDeliveryMinimumTime={approxDeliveryMinimumTime}
          setApproxDeliveryMinimumTime={setApproxDeliveryMinimumTime}
          approxDeliveryMaximumTime={approxDeliveryMaximumTime}
          setApproxDeliveryMaximumTime={setApproxDeliveryMaximumTime}
          approxDeliveryType={approxDeliveryType}
          setApproxDeliveryType={setApproxDeliveryType}
          itemType={itemType}
          setItemType={setItemType}
          cutleryStatus={cutleryStatus}
          setCutleryStatus={setCutleryStatus}
        />
        <DashLine />
        <GradientBtn
          label="newDeveloper.UpdateSettings"
          onPress={handleCreateBanner}
          additionalStyle={{
            marginHorizontal: windowWidth(5),
            marginTop: windowHeight(3),
             
          }}
        />
        <Spinner
          visible={processingLoader}
          textContent={'Processing.....'}
          textStyle={{ color: '#FFF' }}
        />
      </ScrollView>
        
       

    </>
  );
}
