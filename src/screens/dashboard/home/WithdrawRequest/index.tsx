import { ScrollView, View, Alert } from 'react-native';
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
import Toast from 'react-native-toast-message';
import { getWithdrawMethodList } from '@src/services/withdraw.service';
import { withdrawMethodActions } from '@src/store/redux/withdraw-method-redux';
interface Variant {
  name: string;
  price: string;
}

interface Response {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}
//======================= Withdraw Request ====================================//
export function WithdrawRequest() {
  const dispatch = useDispatch()
  const [withdrawNote, setWithdrawNote] = useState<string>('I need that amount as soon as possible')
  const [withDrawAmount, setWithDrawAmount] = useState<string>('')
  const [withdrawalMethodId,setWithdrawMethodId] = useState<string>('')
  const { isDark, t, currSymbol } = useValues();
  const [processingSpinner, setProcessingLoader] = useState(false)

  const {
    maximum_withdraw_amount,
    minimum_withdraw_amount
  } = useSelector((state: RootState) => state['providerAppConfig'])

  const withdrawMethod = useSelector((state: RootState) => state['withdrawMethod'])

  const loadWithdrawMethodListing = async ()=>{
      const response:Response = await getWithdrawMethodList()
      if(response?.data?.content?.data){
        
        dispatch(withdrawMethodActions.setWithdrawMethod(response?.data?.content?.data))
      }
  }

  useEffect(()=>{
    if(withdrawMethod.length === 0){
      loadWithdrawMethodListing()
    }
      
  },[withdrawMethod])

  


  const handleProcessWithdrawAmount = () => {
    let amountToWithdraw = withDrawAmount.replace(/[^\d]/g, '');
    const updatedWithdraw = amountToWithdraw ? parseFloat(amountToWithdraw) : 0

    if (updatedWithdraw < minimum_withdraw_amount) {
      Toast.show({
        type: 'error',
        text1: 'ERROR',
        text2: t(`${t('newDeveloper.Minimumwithdrawamount')} ${minimum_withdraw_amount}`),
      });
      return;
    }
    if (updatedWithdraw > maximum_withdraw_amount) {
      Toast.show({
        type: 'error',
        text1: 'ERROR',
        text2: t(`${t('newDeveloper.Maximumwithdrawamount')} ${maximum_withdraw_amount}`),
      });
      return;
    }

    console.log({
      withdrawNote,
      updatedWithdraw,
      maximum_withdraw_amount,
      minimum_withdraw_amount
    })


  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: windowHeight(3) }}
      showsVerticalScrollIndicator={false}
      style={[
        GlobalStyle.mainView,
        { backgroundColor: isDark ? appColors.darkCard : appColors.white },
      ]}>
      <Header showBackArrow={true} title={'newDeveloper.Withdrawrequest'} />

      <InputView
        withdrawNote={withdrawNote}
        setWithdrawNote={setWithdrawNote}
        withDrawAmount={withDrawAmount}
        setWithDrawAmount={setWithDrawAmount}
        withdrawalMethodId={withdrawalMethodId}
        setWithdrawMethodId={setWithdrawMethodId}
      />

      <GradientBtn
        label="newDeveloper.SendWithdrawRequest"
        onPress={handleProcessWithdrawAmount}
        additionalStyle={{
          marginHorizontal: windowWidth(5),
          marginTop: windowHeight(3),
        }}
      />
      <Spinner
        visible={processingSpinner}
        textContent={'Processing.....'}
        textStyle={{ color: '#FFF' }}
      />
    </ScrollView>
  );
}
