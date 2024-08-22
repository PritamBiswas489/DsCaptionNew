import { Text, View, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import React, { useEffect, useState } from 'react';
import { GlobalStyle } from '@style/styles';
import CancelHeader from '@commonComponents/cancelHeader';
import { Plus, Search } from '@utils/icons';
import { styles } from './styles';

import appColors from '@theme/appColors';

import { ServiceListing } from '@screens/dashboard/home';
import { serviceListData } from './data/data';
import { useValues } from '../../../App';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'src/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';

import SkeletonLoader from '@src/commonComponents/SkeletonLoader';
import { mySubscriptionsAction } from '@src/store/redux/my-subscriptions-redux';

import NoDataFound from '@src/commonComponents/noDataFound';
import SubscriptionsSubCategory from '@src/otherComponent/home/SubscriptionsSubCategory';
import { noValue, wifi, notification } from '@utils/images';
import GradientBtn from '@commonComponents/gradientBtn';
import { windowHeight } from '@theme/appConstant';

import { loadMySubscriptionFunc } from '@src/services/load.mysubscription';
import { FormServiceListing } from './ServiceListing';
import { getServices } from '@src/services/services-service';
import { serviceFormActions } from '@src/store/redux/service-form-redux';
import { ServiceInterface } from '@src/interfaces/serviceInterface';


//?limit=10&offset=1&id=20abbb9f-af1c-489e-968f-e9b0a8c4ea3b
//?limit=200&offset=1

interface Response {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

type routeProps = NativeStackNavigationProp<RootStackParamList>;


export function FormAddServicePanel({ setShowAddServiceModal }: { setShowAddServiceModal: (value: boolean) => void }) {
  const [popularService, setPopularService] = useState(serviceListData);
  const { isDark, t } = useValues();

  const { navigate, goBack: goBackToPreviousScreen } = useNavigation<routeProps>();
  const dispatch = useDispatch()
  const [selectedSubCategory,setSubCategory]  = useState('ac2879b0-684b-400b-931e-954febbcf3fc')

  const [loadingSkeleton, setLoadingSkeleton] = useState(false)

    const {
    data:Services
  } = useSelector((state: RootState) => state['servicesFormData'])
   

  const loadingServices = async () =>{
    const queryParam = `?limit=200&offset=1&sub_category_id=${selectedSubCategory}`
    const response:Response = await getServices(queryParam)
    if (response?.data?.content?.data) {
     //console.log(response?.data?.content?.data)
     const services = response?.data?.content?.data
     if (services.length > 0) {
             const formattedData: ServiceInterface[] = response.data.content.data.map((serviceData: any) => ({
               id: serviceData?.id,
               name: serviceData?.name,
               short_description: serviceData?.short_description,
               description: serviceData?.description,
               cover_image: serviceData?.cover_image,
               thumbnail: serviceData?.thumbnail,
               order_count: serviceData?.order_count,
               avg_rating: serviceData?.avg_rating,
               min_bidding_price: serviceData?.variations?.[0]?.price,
               category:serviceData?.category?.name,
             }))

             console.log("=============== checking formatted data =========")
            console.log(formattedData)
             if(selectedSubCategory){
               dispatch(serviceFormActions.addServices({id:selectedSubCategory,services:formattedData}))
               dispatch(serviceFormActions.setData({
                 field:'selected',data:{
                   subCategoryId:selectedSubCategory,
                   services:formattedData}}))
             } 
     }
   }
   dispatch(serviceFormActions.setData({field:'loading',data:false}))
   //setLoadingSkeleton(false)
 }
 useEffect(()=>{
   if(selectedSubCategory){
     dispatch(serviceFormActions.setData({field:'loading',data:true}))
      const checkExisting = Services.find(elementDet => elementDet.subCategoryId === selectedSubCategory);  
      if(!checkExisting){
         loadingServices()   
      } else{
       dispatch(serviceFormActions.setData({field:'selected',data:{
         subCategoryId:selectedSubCategory,
         services:checkExisting.services}}))
         dispatch(serviceFormActions.setData({field:'loading',data:false}))
      }  
      //setLoadingSkeleton(false) 
   }
 },[selectedSubCategory])

  return (
    <>
      <ScrollView
        style={[
          GlobalStyle.mainView,
          { backgroundColor: isDark ? appColors.darkCard : appColors.white },
        ]}>
          <View style={{ paddingTop: 20 }}>
              <CancelHeader
                title={t('newDeveloper.AddServiceInCart')}
                gotoScreen={() => {
                  setShowAddServiceModal(false);
                }}
          />
        </View>
        <View style={styles.blankView} />
            <FormServiceListing
              data={popularService}
              setData={setPopularService}
              providerImageStyle={styles.providerImageStyle}
              itemSeparator={styles.itemSeparator}
            />
      </ScrollView>

    </>
  );
}
