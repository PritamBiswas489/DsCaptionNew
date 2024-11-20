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
export function StoreAddCoupon() {
   
  const navigation = useNavigation<ItemsProps>();
  //store name
  const [couponTitle, setCouponTitle] = useState<string>('')
  const [errorCoupontitle, setErrorCouponTitle] = useState<string>('')
  
  const [couponCode,setCouponCode] = useState<string>('')
  const [errorCouponCode,setErrorCouponCode] = useState<string>('')
  
  const [limitSameUser,setLimitSameUser] = useState<number>(0)
  const [errorLimitSameUser,setErrorLimitSameUser] = useState<string>('')

  const [minPurchase,setMinPurchase] = useState<number>(0)
  const [errorMinPurchase,setErrorMinPurchase]  = useState<string>('')

  const [startDate,setStartDate] = useState<string>('')
  const [errorStartDate,setErrorStartDate] = useState<string>('')

  const [expireDate,setExpireDate] = useState<string>('')
  const [errorExpireDate,setErrorExpireDate] = useState<string>('')

  const [discount,setDiscount] = useState<number>(0)
  const [discountType,setDiscounType] = useState<string>('')

  const [maxDiscount,setMaxDiscount] =  useState<number>(0) //will show when discount type is percent
    

  
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
         
        />
        <DashLine />
        <Spinner
          visible={processingLoader}
          textContent={'Processing.....'}
          textStyle={{ color: '#FFF' }}
        />
      </ScrollView>
        <GradientBtn
          label="newDeveloper.UpdateSettings"
          onPress={handleCreateBanner}
          additionalStyle={{
            marginHorizontal: windowWidth(5),
            marginTop: windowHeight(3),
             
          }}
        />
       

    </>
  );
}
