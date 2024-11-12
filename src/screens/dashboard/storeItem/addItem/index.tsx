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
export function VendorAddItem() {
  const navigation = useNavigation<ItemsProps>();
  const [itemTitle, setItemTitle] = useState<string>('')
  const [errorItemTitle, setErrorItemTitle] = useState<string>('')
  const [itemDesciption, setItemDescription] = useState<string>('')
  const [errorItemDescription, setErrorItemDescription] = useState<string>('')

  const [itemPrice, setItemPrice] = useState<string>('')
  const [errorItemPrice, setErrorItemPrice] = useState<string>('')

  const [discountAmount, setDiscountAmount] = useState<string>('')
  const [errorDiscountAmount, setErrorDiscountAmount] = useState<string>('')

  const [discountTypes, setDiscountTypes] = useState<string>('')
  const [errorDiscountTypes, setErrorDiscountTypes] = useState<string>('')

  const [category,setCategory] = useState<string>('')
  const [errorCategory,setErrorCategory] = useState<string>('')

  const [subCategory,setSubCategory] = useState<string>('')
  const [errorSubCategory,setErrorSubCategory] = useState<string>('')

  const [selectedAttrbutes,setSelectedAttributes] = useState<number[]>([])

  const [maximumOrderQty,setMaximumOrderQty] = useState<string>('');
  const [errorMaximumOrderQty,setErrorMaximumOrderQty] = useState<string>('')

  const [tags, setTags] = useState<string[]>([]);
  const [attributeVariants,setAttributeVariants] = useState<{attrbuteId:number,variants:string[]}[]>([])
  
  const [variantionsDetails,setVariationDetails] = useState<{type:string,price:number,stock:number}[]>([])

  const [thumbnailImage,setThumbnailImage] = useState<string>('')

  const [errorThumbnailImage,setErrorThumbnailImage] = useState<string>('')

  const [itemImages,setItemImages] = useState<string[]>([])

  const { isDark, t } = useValues();
  const dispatch = useDispatch()
  const [processingLoader, setProcessingLoader] = useState(false)

  const {
    isFirstTimeLoading: selectedFirstTimeLoading,
  } = useSelector(
    (state: RootState) => state['vendorCategories']
  );

  const {
    isFirstTimeLoading: attributeSelectedFirstTimeLoading,
  } = useSelector(
    (state: RootState) => state['vendorAttribute']
  );

  const {
    data: SubCategories,
  } = useSelector(
    (state: RootState) => state['vendorSubCategories']
  );


  const {
    isFirstTimeLoading: selectedUnitFirstTimeLoading,
  } = useSelector(
    (state: RootState) => state['vendorUnits']
  );

  //load categories
  const loadCategories = async () =>{
    setProcessingLoader(true)
    const response: Response = await getVendorCategories();
    if (response?.data?.errors) {
      await authAuthorizeRedirect(response,navigation)
    }
    dispatch(vendorCategoriesActions.setData({field:'data',data:response?.data}))
    dispatch(vendorCategoriesActions.setData({field:'isFirstTimeLoading',data:false}))
    setProcessingLoader(false)
  }

  useEffect(()=>{
    if(selectedFirstTimeLoading){
       loadCategories()
    }
  },[selectedFirstTimeLoading])


  //load units
  const loadUnits = async () =>{
    setProcessingLoader(true)
    const response: Response = await getVendorUnits();
    if (response?.data?.errors) {
      await authAuthorizeRedirect(response,navigation)
    }
    dispatch(vendorUnitsActions.setData({field:'data',data:response?.data}))
    dispatch(vendorUnitsActions.setData({field:'isFirstTimeLoading',data:false}))
    setProcessingLoader(false)

  }
  useEffect(()=>{
    if(selectedUnitFirstTimeLoading){
       loadUnits()
    }
  },[selectedUnitFirstTimeLoading])


  //load attributes
  const loadAttributes = async ()=>{
    // setProcessingLoader(true)
    const response: Response = await getAttributesService();
    if (response?.data?.errors) {
      await authAuthorizeRedirect(response,navigation)
    }
    dispatch(vendorAttributeActions.setData({field:'data',data:response?.data}))
    dispatch(vendorAttributeActions.setData({field:'isFirstTimeLoading',data:false}))
    // setProcessingLoader(false)
  }

  useEffect(()=>{
    if(attributeSelectedFirstTimeLoading){
       loadAttributes()
    }
  },[attributeSelectedFirstTimeLoading])

  //load sub categories
  const loadSubCategories = async () =>{
    setProcessingLoader(true)
    dispatch(vendorSubCategoriesActions.setData({ field: 'selected', data: { categoryId: '', subcategories: []  } }))
    const response: Response = await getVendorSubCategories(category);
    if (response?.data?.errors) {
      await authAuthorizeRedirect(response,navigation)
    }
    
    dispatch(vendorSubCategoriesActions.addServiceSubCategories({ id: category, subcategories: response?.data }))
    dispatch(vendorSubCategoriesActions.setData({ field: 'selected', data: { categoryId: category, subcategories: response?.data  } }))
    dispatch(vendorSubCategoriesActions.setData({ field: 'loading', data: false }))
    setProcessingLoader(false)
  }

  //getting subcateories based on category
  useEffect(()=>{
    setSubCategory('')
    if(category){
        const checkExisting = SubCategories.find(elementDet => elementDet.categoryId === category);
        if (!checkExisting) {
          loadSubCategories();
        } else {
          dispatch(vendorSubCategoriesActions.setData({ field: 'selected', data: { categoryId: category, subcategories: checkExisting.subcategories } })) 
        }
    }
  },[category])

  

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
          itemTitle={itemTitle}
          setItemTitle={setItemTitle}
          errorItemTitle={errorItemTitle}
          itemDesciption={itemDesciption}
          setItemDescription={setItemDescription}
          errorItemDescription={errorItemDescription}
          itemPrice={itemPrice}
          setItemPrice={setItemPrice}
          errorItemPrice={errorItemPrice}
          discountAmount={discountAmount}
          setDiscountAmount={setDiscountAmount}
          errorDiscountAmount={errorDiscountAmount}
          discountTypes={discountTypes}
          setDiscountTypes={setDiscountTypes}
          errorDiscountTypes={errorDiscountTypes}
          category={category}
          setCategory={setCategory}
          errorCategory={errorCategory}
          subCategory={subCategory}
          setSubCategory={setSubCategory}
          errorSubCategory={errorSubCategory}
          selectedAttrbutes={selectedAttrbutes}
          setSelectedAttributes={setSelectedAttributes}
          maximumOrderQty={maximumOrderQty}
          setMaximumOrderQty={setMaximumOrderQty}
          errorMaximumOrderQty={errorMaximumOrderQty}
          tags={tags}
          setTags={setTags}
          attributeVariants={attributeVariants}
          setAttributeVariants={setAttributeVariants}
          variantionsDetails={variantionsDetails}
          setVariationDetails={setVariationDetails}
          thumbanailImage={thumbnailImage}
          setThumbnailImage={setThumbnailImage}
          errorThumbnailImage={errorThumbnailImage}
          itemImages={itemImages}
          setItemImages={setItemImages}

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
