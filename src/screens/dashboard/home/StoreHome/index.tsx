import { Alert, RefreshControl, ScrollView, View, StyleSheet } from 'react-native';
import React, { useState, useEffect, useReducer } from 'react';
import { GlobalStyle } from '@style/styles';
import Header from '@commonComponents/header';
import { windowHeight, windowWidth } from '@theme/appConstant';
import { useValues } from '../../../../../App';
import appColors from '@theme/appColors';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/navigation/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import StoreStatus from './storeStatus';
import OrderStatusList from './statusList';
import OrderList from './orderList';
import CampaignFilter from './campaignFilter';
import { storeProfileDataActions } from '@src/store/redux/store/store-profile-redux';
import { getAuthUserService as storeAuthService } from '@src/services/store/auth.service';
import { updateStoreStatusProcess } from '@src/services/store/profile.service';
import { getCurrentOrders } from '@src/services/store/order.service';
import { CurrentOrderInterface } from '@src/interfaces/store/currentOrder.interface';

interface Response {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

interface Tab {
  tabid: string;
  label: string;
  count: number;
  active: boolean;
}
//Orders state
interface OrdersState {
  pendingOrders: CurrentOrderInterface[];
  confirmOrders: CurrentOrderInterface[];
  processingOrders: CurrentOrderInterface[];
  handOverOrders: CurrentOrderInterface[];
  pickupOrders: CurrentOrderInterface[];
}
//Initial State
const initialState: OrdersState = {
  pendingOrders: [],
  confirmOrders: [],
  processingOrders: [],
  handOverOrders: [],
  pickupOrders: [],
}
//REDUCER ACTION TYPE
type Action =
  | { type: 'SET_PENDING_ORDERS'; payload: typeof initialState.pendingOrders }
  | { type: 'SET_CONFIRM_ORDERS'; payload: typeof initialState.confirmOrders }
  | { type: 'SET_PROCESSING_ORDERS'; payload: typeof initialState.processingOrders }
  | { type: 'SET_HANDOVER_ORDERS'; payload: typeof initialState.handOverOrders }
  | { type: 'SET_PICKUP_ORDERS'; payload: typeof initialState.pickupOrders }
   
  | { type: 'RESET_ALL' };
;

//REDUCER
const reducer = (state: OrdersState, action: Action): OrdersState => {
  switch (action.type) {
    case 'SET_PENDING_ORDERS':
      return { ...state, pendingOrders: action.payload };
    case 'SET_CONFIRM_ORDERS':
      return { ...state, confirmOrders: action.payload };
    case 'SET_PROCESSING_ORDERS':
      return { ...state, processingOrders: action.payload };
    case 'SET_HANDOVER_ORDERS':
      return { ...state, handOverOrders: action.payload };
    case 'SET_PICKUP_ORDERS':
      return { ...state, pickupOrders: action.payload };
    case 'RESET_ALL':
      return {
        ...initialState
      };
    default:
      return state;
  }
}


//Add new banner
type ItemsProps = NativeStackNavigationProp<RootStackParamList>;
type EditCouponRouteProp = RouteProp<RootStackParamList, 'EditVendorCoupon'>;
// Store wallet
export default function StoreHome() {
  const navigation = useNavigation<ItemsProps>();
  const route = useRoute<EditCouponRouteProp>();
  const { isDark, t } = useValues();
  const dispatch = useDispatch()
  const [processingLoader, setProcessingLoader] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);
  const [ORDER_STATE, ORDER_DISPATCH] = useReducer(reducer, initialState);
  const [activeTabId, setActiveTabId] = useState<string>('pending')
  const [statusMenuList, setStatusMenuList] = useState<Tab[]>([
    { tabid: "pending", label: t("newDeveloper.Pending"), count: 0, active: false },
    { tabid: "confirmed", label: t("newDeveloper.Confirmed"), count: 0, active: false },
    { tabid: "processing", label: t("newDeveloper.Processing"), count: 0, active: false },
    { tabid: "handover", label: t("newDeveloper.Handover"), count: 0, active: false },
    { tabid: "picked_up", label: t("newDeveloper.Pickup"), count: 0, active: false },
  ])

  const [tabOrders,setTabOrders] =  useState<CurrentOrderInterface[]>([])





  const profileReset = async () => {
    const responseuser = await storeAuthService()
    if (responseuser?.data?.id) {
      dispatch(storeProfileDataActions.setData(responseuser?.data))
    }
  }
  //load home data current order
  const loadHomeDataCurrentOrder = async () => {

    const response: Response = await getCurrentOrders()
    const setPendingOrders: CurrentOrderInterface[] = []
    const setConfirmsOrders: CurrentOrderInterface[] = []
    const setProcessingOrders: CurrentOrderInterface[] = []
    const setHandOverOrders: CurrentOrderInterface[] = []
    const setPickupOrders: CurrentOrderInterface[] = []

    if (response?.data && response.data.length > 0) {
      const currentOrderData: CurrentOrderInterface[] = response.data
      for (let i = 0; i < currentOrderData.length; i++) {
        if (currentOrderData[i].order_status === 'pending') { //pending
          setPendingOrders.push(currentOrderData[i])
        } else if (currentOrderData[i].order_status === 'confirmed') { //confirmed
          setConfirmsOrders.push(currentOrderData[i])
        } else if (currentOrderData[i].order_status === 'processing') { //processing
          setProcessingOrders.push(currentOrderData[i])
        } else if (currentOrderData[i].order_status === 'handover') { //handover
          setHandOverOrders.push(currentOrderData[i])
        } else if (currentOrderData[i].order_status === 'picked_up') { //picker up
         
          setPickupOrders.push(currentOrderData[i])
        }
      }
    }
    ORDER_DISPATCH({ type: 'SET_PENDING_ORDERS', payload: setPendingOrders })
    ORDER_DISPATCH({ type: 'SET_CONFIRM_ORDERS', payload: setConfirmsOrders })
    ORDER_DISPATCH({ type: 'SET_PROCESSING_ORDERS', payload: setProcessingOrders })
    ORDER_DISPATCH({ type: 'SET_HANDOVER_ORDERS', payload: setHandOverOrders })
    ORDER_DISPATCH({ type: 'SET_PICKUP_ORDERS', payload: setPickupOrders })
  }

  useEffect(() => {
    loadHomeDataCurrentOrder()
  }, [])


  useEffect(() => {
    setStatusMenuList([
        { tabid: "pending", label: t("newDeveloper.Pending"), count: ORDER_STATE.pendingOrders.length, active: (activeTabId === 'pending') ?  true : false },
        { tabid: "confirmed", label: t("newDeveloper.Confirmed"), count: ORDER_STATE.confirmOrders.length, active:  (activeTabId === 'confirmed') ?  true : false },
        { tabid: "processing", label: t("newDeveloper.Processing"), count: ORDER_STATE.processingOrders.length, active:  (activeTabId === 'processing') ?  true : false },
        { tabid: "handover", label: t("newDeveloper.Handover"), count: ORDER_STATE.handOverOrders.length, active:  (activeTabId === 'handover') ?  true : false },
        { tabid: "picked_up", label: t("newDeveloper.Pickup"), count: ORDER_STATE.pickupOrders.length, active:  (activeTabId === 'pickup') ?  true : false },
    ])
    console.log(activeTabId)
    if (activeTabId === 'pending') { //pending
      setTabOrders( ORDER_STATE.pendingOrders)
    } else if (activeTabId === 'confirmed') { //confirmed
      setTabOrders( ORDER_STATE.confirmOrders)
    } else if (activeTabId === 'processing') { //processing
      setTabOrders( ORDER_STATE.processingOrders)
    } else if (activeTabId === 'handover') { //handover
      setTabOrders(  ORDER_STATE.handOverOrders)
    } else if (activeTabId === 'picked_up') { //picker up
      setTabOrders(  ORDER_STATE.pickupOrders)
    }
    
  }, [ORDER_STATE, activeTabId])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    profileReset()
    loadHomeDataCurrentOrder()
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const updateStoreStatus = async () => {
    await updateStoreStatusProcess()
    profileReset()
  }
 

  //set tab status
  const setTabStatus = (tabid:string)=>{
    setActiveTabId(tabid)
  } 

  useEffect(()=>{
    console.log("============== tabOrders =================")
      console.log(tabOrders)
  },[tabOrders])

  return (
    <>
      <View style={[styles.container, { backgroundColor: isDark ? appColors.darkCardBg : appColors.white }]}>
        <Header showBackArrow={true} title={'newDeveloper.StoreHome'} />
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
          <View><StoreStatus updateStoreStatus={updateStoreStatus} /></View>
          <View><OrderStatusList statusMenuList={statusMenuList} setTabStatus={setTabStatus}/></View>
          <View><CampaignFilter /></View>
          {/* <View><OrderList /></View> */}
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
