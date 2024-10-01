import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import TextInputComponent from '@otherComponent/auth/textInput';
import {
  Notes,
} from '@utils/icons';
import { windowHeight, windowWidth } from '@theme/appConstant';
import { useValues } from '../../../../../../App';  
import { CategoriesInterface } from '@src/interfaces/categoriesInterface';
import SelectionDropdown from '@src/otherComponent/selectionDropdown';
import appColors from '@src/theme/appColors';
import PriceCategory from '../priceCategory';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';

interface DataItem {
  label: string;
  value: string;
}


  interface Response {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
  }

export default function InputView({
  withdrawNote,
  setWithdrawNote,
  withDrawAmount,
  setWithDrawAmount,
  
}: {
  withdrawNote: string,
  setWithdrawNote: (value: string) => void,
  withDrawAmount: string,
  setWithDrawAmount: (amt: string) => void,
}) {
  const { t, isDark, currSymbol } = useValues();
  const [categoryList, setCategoryList] = useState<DataItem[]>([]);
   
  const {
    maximum_withdraw_amount,
    minimum_withdraw_amount
  } = useSelector((state: RootState) => state['providerAppConfig'])

//serviceProviderAccountData
  const {owner} = useSelector((state: RootState) => state['serviceProviderAccountData'])
  const {account} = owner
  const {account_receivable,account_payable} = account

  const balanceAmount = account_receivable - account_payable;

  
  //min bid amount change function
  const handleMinBidAmtChange = (value: string) => {
    const cleanedValue = value.replace(/[^\d]/g, '');
    setWithDrawAmount(`${currSymbol} ${cleanedValue}`);
  };

   

   
  //=============== Get SubCategory Listing =========================//
  return (
    <View style={{ flex: 1 }}>
      {/* Select category panel */}
      <SelectionDropdown
        data={categoryList}
        value={''}
        setValue={(value: string) => {
        }}
        label={t('newDeveloper.SelectWithDrawMethod')}
        error={''}
      />
      {/* service short description */}
      <TextInputComponent
        placeholder={t('newDeveloper.WriteYourNoteHere')}
        Icon={<Notes />}
        value={withdrawNote}
        onChangeText={value => {
          setWithdrawNote(value);
        }}
        containerStyle={{ marginBottom: windowHeight(0) }}
        multiline={true}
        inputStyle={styles.inputStyle}
      />
      {/* service minimum bid amount */}
      <TextInputComponent
        keyboardType='number-pad'
        placeholder={currSymbol+' '+t('newDeveloper.EnterWithDrawAmount')}
        inputStyle={{
          height:windowHeight(8),
        }}
        textContainerStyle={{fontSize:20,textAlign:'center'}}
        value={withDrawAmount}
        onChangeText={handleMinBidAmtChange}
      />
      {/* Balance information */}
      <View style={[
        styles.balanceContainer,
        {backgroundColor:appColors.lightOrange},
        ]}>
        <Text style={styles.balanceText}>
          {t('newDeveloper.Availablebalance')}: {currSymbol}{balanceAmount}
        </Text>
        <Text style={styles.balanceText}>
        {t('newDeveloper.Minimumwithdrawamount')}: {currSymbol}{minimum_withdraw_amount}
        </Text>
        <Text style={styles.balanceText}>
        {t('newDeveloper.Maximumwithdrawamount')}: {currSymbol}{maximum_withdraw_amount}
        </Text>
      </View>
      
      <PriceCategory 
      minimum_withdraw_amount={minimum_withdraw_amount}
      maximum_withdraw_amount={maximum_withdraw_amount}
      handleMinBidAmtChange={handleMinBidAmtChange}
      />

    </View>
  );
}
