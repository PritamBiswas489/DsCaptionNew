import { Alert, ScrollView, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GlobalStyle } from '@style/styles';
import Header from '@commonComponents/header';
import SliderContainer from '@otherComponent/sliderContainer';
import AddNewImageSection from './addNewImage';
import { windowHeight, windowWidth } from '@theme/appConstant';
import InputView from './inputView';
import StatusSection from './statusSection';
import GradientBtn from '@commonComponents/gradientBtn';
import { useValues } from '../../../../../App';
import appColors from '@theme/appColors';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';
import { CategoriesInterface } from '@src/interfaces/categoriesInterface';
import { serviceCategoriesDataActions } from '@src/store/redux/service-category-redux';
import { getCategories } from '@src/services/services-service';
import SkeletonLoader from '@src/commonComponents/SkeletonLoader';
import { addServiceSubCategory } from '@src/services/services-service';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/navigation/types';
import { getVendorCategories, getVendorSubCategories } from '@src/services/store/category.service';
import { authAuthorizeRedirect } from '@src/utils/functions';
import { vendorCategoriesActions } from '@src/store/redux/store/categories.redux';
import { vendorSubCategoriesActions } from '@src/store/redux/store/subcategories-redux';
import { vendorAttributeActions } from '@src/store/redux/store/attributes-redux';
import { getAttributesService } from '@src/services/store/attribute.service';
import { getVendorUnits } from '@src/services/store/units.service';
import { vendorUnitsActions } from '@src/store/redux/store/units.redux';
import { foodVariations } from '@src/interfaces/store/foodVariations.interface';

import { vendorAddonsActions } from '@src/store/redux/store/addons-redux';
import { getVendorAddons } from '@src/services/store/addons.service';

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
export function VendorCreateAddons() {
  const navigation = useNavigation<ItemsProps>();
  const [itemTitle, setItemTitle] = useState<string>('')
  const [errorItemTitle, setErrorItemTitle] = useState<string>('')
   

  const [itemPrice, setItemPrice] = useState<string>('')
  const [errorItemPrice, setErrorItemPrice] = useState<string>('')

   

   

   
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
        <Header showBackArrow={true} title={'newDeveloper.AddNewAddOns'} />

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
        <InputView
          itemTitle={itemTitle}
          setItemTitle={setItemTitle}
          errorItemTitle={errorItemTitle}
          itemPrice={itemPrice}
          setItemPrice={setItemPrice}
          errorItemPrice={errorItemPrice}
        />
        <Spinner
          visible={processingLoader}
          textContent={'Processing.....'}
          textStyle={{ color: '#FFF' }}
        />
         <GradientBtn
        label="newDeveloper.Add"
        onPress={handleCreateBanner}
        additionalStyle={{
          marginHorizontal: windowWidth(5),
          marginTop: windowHeight(3),
        }}
      />
      </ScrollView>
     
    </>
  );
}
