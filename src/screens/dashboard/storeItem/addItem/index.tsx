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

interface Response {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}
//Add new banner
export function VendorAddItem() {
  
  const [bannerTitle, setBannerTitle] = useState<string>('')
  const [errorBannerTitle, setErrorBannerTitle] = useState<string>('')
  const [bannerUrl,setBannerUrl] = useState<string>('')
  const [errorBannerUrl,setErrorBannerUrl] = useState<string>('')
  const [bannerImage,setBannerImage] = useState<string>('')
  const [bannerImageError,setBannerImageError] = useState<string>('')
 

  const { isDark, t } = useValues();
  const dispatch = useDispatch()
  const [processingLoader, setProcessingLoader] = useState(false)
   

  // const handleAddSubCategory = async () => {
  //   let error = false
  //   if (selectedParentCategory === '') {
  //     error = true
  //     setErrorCategory(t('newDeveloper.Selectparentcategory'))
  //   }
  //   if (categoryName.trim() === '') {
  //     error = true
  //     setErrorCategoryName(t('newDeveloper.Entercategoryname'))
  //   }

  //   if (shortDescription.trim() === '') {
  //     error = true
  //     setErrorShortDescription(t('newDeveloper.Entershortdescription'))
  //   }
  //   if (subcategoryImage === '') {
  //     error = true
  //     setErrorSubCategoryImage(t('newDeveloper.Selectimageforcategory'))
  //   }

  //   if (error === false) {
  //         setProcessingLoader(true)
  //         const formData = new FormData()
  //         formData.append('parent_category_id', selectedParentCategory)
  //         formData.append('name', categoryName)
  //         formData.append('short_description', shortDescription)
  //         formData.append('image', {
  //           uri: subcategoryImage,
  //           name: 'subcategoryImage.jpg',
  //           type: 'image/jpeg',
  //         });
  //         const response: Response = await addServiceSubCategory(formData)
  //         if (response?.data?.response_code === 'category_store_200') {
  //             Toast.show({
  //               type: 'success',
  //               text1: 'SUCCESS',
  //               text2: response?.data?.message,
  //             });
  //             setSubcategoryImage('')
  //             setCategoryName('')
  //             setShortDescription('')
  //             setSelectedParentCategory('')
  //         } else {
  //           Toast.show({
  //             type: 'error',
  //             text1: 'ERROR',
  //             text2: response?.data?.message,
  //           });
  //         }
  //         setProcessingLoader(false)

  //   }

  // }

  const handleCreateBanner = async()=>{
     Alert.alert('Create banner')
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
        <Header showBackArrow={true} title={'newDeveloper.AddNewItem'} />

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
          bannerTitle={bannerTitle}
          setBannerTitle={setBannerTitle}
          errorBannerTitle={errorBannerTitle}
           
          bannerUrl={bannerUrl}
          setBannerUrl={setBannerUrl}
          errorBannerUrl={errorBannerUrl}
          
          bannerImage={bannerImage}
          setBannerImage={setBannerImage}
          bannerImageError={bannerImageError}
           
        />
        <GradientBtn
          label="newDeveloper.CreateItem"
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
