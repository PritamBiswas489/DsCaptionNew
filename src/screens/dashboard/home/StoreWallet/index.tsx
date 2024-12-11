import { Alert, RefreshControl, ScrollView, View, StyleSheet } from 'react-native';
import React, { useState, useEffect, useReducer } from 'react';
import { GlobalStyle } from '@style/styles';
import Header from '@commonComponents/header';
import { windowHeight, windowWidth } from '@theme/appConstant';

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
import Toast from 'react-native-toast-message';
import { createCoupon, getCouponDetails, updateCoupon } from '@src/services/store/coupon.service';
import { RouteProp, useRoute } from '@react-navigation/native';
import { couponActions } from '@src/store/redux/store/coupon-redux';
import WithdrawBalance from './withdrawBalance';
import BalanceInfo from './balanceInfo';
import EarningsCard from './earningsCard';

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
type EditCouponRouteProp = RouteProp<RootStackParamList, 'EditVendorCoupon'>;
// Store wallet
export default function StoreWallet() {
  const navigation = useNavigation<ItemsProps>();
  const route = useRoute<EditCouponRouteProp>();
  const { isDark, t } = useValues();
  const dispatch = useDispatch()
  const [processingLoader, setProcessingLoader] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <>
      <View style={[styles.container, { backgroundColor: isDark ? appColors.darkCardBg : appColors.white }]}>
        <Header showBackArrow={true} title={'newDeveloper.StoreWallet'} />
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            GlobalStyle.contentContainerStyle,
          ]}
          style={[
            GlobalStyle.mainView,
            {
              backgroundColor: isDark ? appColors.darkTheme : appColors.white,
              marginTop: 10
            },
          ]}
        >
          <View><WithdrawBalance /></View>
          <View><BalanceInfo /></View>
          <View><EarningsCard/></View>
          <Spinner
            visible={processingLoader}
            textContent={'Processing.....'}
            textStyle={{ color: '#FFF' }}
          />
        </ScrollView>
      </View>



    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
