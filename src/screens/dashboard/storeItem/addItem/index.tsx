import { Alert, ScrollView, View } from 'react-native';
import React, { useState, useEffect, useReducer } from 'react';
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
import { createVendorItems } from '@src/services/store/item.service';

interface Response {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

interface State {
  itemTitle: string;
  errorItemTitle: string;
  itemDesciption: string;
  errorItemDescription: string;
  itemPrice: string;
  errorItemPrice: string;
  discountAmount: string;
  errorDiscountAmount: string;
  discountTypes: string;
  errorDiscountTypes: string;
  category: string;
  errorCategory: string;
  subCategory: string;
  errorSubCategory: string;
  selectedAttrbutes: number[];
  maximumOrderQty: string;
  errorMaximumOrderQty: string;
  tags: string[];
  attributeVariants: { attrbuteId: number, attributeName: string, variants: string[] }[];
  variantionsDetails: { type: string, price: number, stock: number }[];
  thumbnailImage: string;
  errorThumbnailImage: string;
  itemImages: string[];
  totalStocks: string;
  stockUnit: string;
  errorStockUnit: string;
  itemType: string;
  foodVars: foodVariations[];
  selectedAddonsList: string[],
  fromTime: string,
  toTime: string,
}

const initialState: State = {
  itemTitle: '',
  errorItemTitle: '',
  itemDesciption: '',
  errorItemDescription: '',
  itemPrice: '',
  errorItemPrice: '',
  discountAmount: '',
  errorDiscountAmount: '',
  discountTypes: 'percent',
  errorDiscountTypes: '',
  category: '',
  errorCategory: '',
  subCategory: '',
  errorSubCategory: '',
  selectedAttrbutes: [],
  maximumOrderQty: '',
  errorMaximumOrderQty: '',
  tags: [],
  attributeVariants: [],
  variantionsDetails: [],
  thumbnailImage: '',
  errorThumbnailImage: '',
  itemImages: [],
  totalStocks: '',
  stockUnit: '',
  errorStockUnit: '',
  itemType: 'noveg',
  foodVars: [],
  selectedAddonsList: [],
  fromTime: '',
  toTime: '',
}

type Action =
  | { type: 'SET_ITEM_TITLE'; payload: typeof initialState.itemTitle }
  | { type: 'SET_ERROR_ITEM_TITLE'; payload: typeof initialState.errorItemTitle }
  | { type: 'SET_ITEM_DESCRIPTION'; payload: typeof initialState.itemDesciption }
  | { type: 'SET_ERROR_ITEM_DESCRIPTION'; payload: typeof initialState.errorItemDescription }
  | { type: 'SET_ITEM_PRICE'; payload: typeof initialState.itemPrice }
  | { type: 'SET_ERROR_ITEM_PRICE'; payload: typeof initialState.errorItemPrice }
  | { type: 'SET_DISCOUNT_AMOUNT'; payload: typeof initialState.discountAmount }
  | { type: 'SET_ERROR_DISCOUNT_AMOUNT'; payload: typeof initialState.errorDiscountAmount }
  | { type: 'SET_DISCOUNT_TYPES'; payload: typeof initialState.discountTypes }
  | { type: 'SET_ERROR_DISCOUNT_TYPES'; payload: typeof initialState.errorDiscountTypes }
  | { type: 'SET_CATEGORY'; payload: typeof initialState.category }
  | { type: 'SET_ERROR_CATEGORY'; payload: typeof initialState.errorCategory }
  | { type: 'SET_SUB_CATEGORY'; payload: typeof initialState.subCategory }
  | { type: 'SET_ERROR_SUB_CATEGORY'; payload: typeof initialState.errorSubCategory }
  | { type: 'SET_SELECTED_ATTRIBUTES'; payload: typeof initialState.selectedAttrbutes }
  | { type: 'SET_MAXIMUM_ORDER_QTY'; payload: typeof initialState.maximumOrderQty }
  | { type: 'SET_ERROR_MAXIMUM_ORDER_QTY'; payload: typeof initialState.errorMaximumOrderQty }
  | { type: 'SET_TAGS'; payload: typeof initialState.tags }
  | { type: 'SET_ATTRIBUTE_VARIANTS'; payload: typeof initialState.attributeVariants }
  | { type: 'SET_VARIATIONS_DETAILS'; payload: typeof initialState.variantionsDetails }
  | { type: 'SET_THUMBNAIL_IMAGE'; payload: typeof initialState.thumbnailImage }
  | { type: 'SET_ERROR_THUMBNAIL_IMAGE'; payload: typeof initialState.errorThumbnailImage }
  | { type: 'SET_ITEM_IMAGES'; payload: typeof initialState.itemImages }
  | { type: 'SET_TOTAL_STOCKS'; payload: typeof initialState.totalStocks }
  | { type: 'SET_STOCK_UNIT'; payload: typeof initialState.stockUnit }
  | { type: 'SET_ERROR_STOCK_UNIT'; payload: typeof initialState.errorStockUnit }
  | { type: 'SET_ITEM_TYPE'; payload: typeof initialState.itemType }
  | { type: 'SET_FOOD_VARS'; payload: typeof initialState.foodVars }
  | { type: 'SET_SELECTED_ADDONS_LIST'; payload: typeof initialState.selectedAddonsList }
  | { type: 'SET_FROM_TIME'; payload: typeof initialState.fromTime }
  | { type: 'SET_TO_TIME'; payload: typeof initialState.toTime }
  | { type: 'RESET_ERRORS' }
  | { type: 'RESET_ALL' };


function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_ITEM_TITLE':
      return { ...state, itemTitle: action.payload };
    case 'SET_ERROR_ITEM_TITLE':
      return { ...state, errorItemTitle: action.payload };
    case 'SET_ITEM_DESCRIPTION':
      return { ...state, itemDesciption: action.payload };
    case 'SET_ERROR_ITEM_DESCRIPTION':
      return { ...state, errorItemDescription: action.payload };
    case 'SET_ITEM_PRICE':
      return { ...state, itemPrice: action.payload };
    case 'SET_ERROR_ITEM_PRICE':
      return { ...state, errorItemPrice: action.payload };
    case 'SET_DISCOUNT_AMOUNT':
      return { ...state, discountAmount: action.payload };
    case 'SET_ERROR_DISCOUNT_AMOUNT':
      return { ...state, errorDiscountAmount: action.payload };
    case 'SET_DISCOUNT_TYPES':
      return { ...state, discountTypes: action.payload };
    case 'SET_ERROR_DISCOUNT_TYPES':
      return { ...state, errorDiscountTypes: action.payload };
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    case 'SET_ERROR_CATEGORY':
      return { ...state, errorCategory: action.payload };
    case 'SET_SUB_CATEGORY':
      return { ...state, subCategory: action.payload };
    case 'SET_ERROR_SUB_CATEGORY':
      return { ...state, errorSubCategory: action.payload };
    case 'SET_SELECTED_ATTRIBUTES':
      return { ...state, selectedAttrbutes: action.payload };
    case 'SET_MAXIMUM_ORDER_QTY':
      return { ...state, maximumOrderQty: action.payload };
    case 'SET_TAGS':
      return { ...state, tags: action.payload };
    case 'SET_ATTRIBUTE_VARIANTS':
      return { ...state, attributeVariants: action.payload };
    case 'SET_VARIATIONS_DETAILS':
      return { ...state, variantionsDetails: action.payload };
    case 'SET_THUMBNAIL_IMAGE':
      return { ...state, thumbnailImage: action.payload };
    case 'SET_ERROR_THUMBNAIL_IMAGE':
      return { ...state, errorThumbnailImage: action.payload };
    case 'SET_ITEM_IMAGES':
      return { ...state, itemImages: action.payload };
    case 'SET_TOTAL_STOCKS':
      return { ...state, totalStocks: action.payload };
    case 'SET_STOCK_UNIT':
      return { ...state, stockUnit: action.payload };
    case 'SET_ERROR_STOCK_UNIT':
      return { ...state, errorStockUnit: action.payload };
    case 'SET_ITEM_TYPE':
      return { ...state, itemType: action.payload };
    case 'SET_FOOD_VARS':
      return { ...state, foodVars: action.payload };
    case 'SET_SELECTED_ADDONS_LIST':
      return { ...state, selectedAddonsList: action.payload };
    case 'SET_FROM_TIME':
      return { ...state, fromTime: action.payload };
    case 'SET_TO_TIME':
      return { ...state, toTime: action.payload };
    case 'RESET_ERRORS':
      return {
        ...state,
        errorItemTitle: '',
        errorItemDescription: '',
        errorItemPrice: '',
        errorDiscountAmount: '',
        errorDiscountTypes: '',
        errorCategory: '',
        errorSubCategory: '',
        errorMaximumOrderQty: '',
        errorThumbnailImage: '',
        errorStockUnit: '',
      };
    case 'RESET_ALL':
      return initialState;
    default:
      return state;
  }

}

//Add new banner
type ItemsProps = NativeStackNavigationProp<RootStackParamList>;
export function VendorAddItem() {
  const navigation = useNavigation<ItemsProps>();
  const [FORM_STATE, FORM_DISPATCH] = useReducer(reducer, initialState);

  const { isDark, t } = useValues();
  const dispatch = useDispatch()
  const [processingLoader, setProcessingLoader] = useState(false)

  const {
    isFirstTimeLoading: selectedFirstTimeLoading,
  } = useSelector(
    (state: RootState) => state['vendorCategories']
  );

  const {
    isFirstTimeLoading: selectedFirstTimeAddonsLoading,
  } = useSelector(
    (state: RootState) => state['vendorAddons']
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
  const loadCategories = async () => {
    setProcessingLoader(true)
    const response: Response = await getVendorCategories();
    if (response?.data?.errors) {
      await authAuthorizeRedirect(response, navigation)
    }
    dispatch(vendorCategoriesActions.setData({ field: 'data', data: response?.data }))
    dispatch(vendorCategoriesActions.setData({ field: 'isFirstTimeLoading', data: false }))
    setProcessingLoader(false)
  }

  useEffect(() => {
    if (selectedFirstTimeLoading) {
      loadCategories()
    }
  }, [selectedFirstTimeLoading])

  //load addons

  const loadAddons = async () => {
    setProcessingLoader(true)
    const response: Response = await getVendorAddons();
    if (response?.data?.errors) {
      await authAuthorizeRedirect(response, navigation)
    }
    dispatch(vendorAddonsActions.setData({ field: 'data', data: response?.data }))
    dispatch(vendorAddonsActions.setData({ field: 'isFirstTimeLoading', data: false }))
    setProcessingLoader(false)

  }

  useEffect(() => {
    if (selectedFirstTimeAddonsLoading) {
      loadAddons()
    }
  }, [selectedFirstTimeAddonsLoading])



  //load units
  const loadUnits = async () => {
    setProcessingLoader(true)
    const response: Response = await getVendorUnits();
    if (response?.data?.errors) {
      await authAuthorizeRedirect(response, navigation)
    }
    dispatch(vendorUnitsActions.setData({ field: 'data', data: response?.data }))
    dispatch(vendorUnitsActions.setData({ field: 'isFirstTimeLoading', data: false }))
    setProcessingLoader(false)

  }
  useEffect(() => {
    if (selectedUnitFirstTimeLoading) {
      loadUnits()
    }
  }, [selectedUnitFirstTimeLoading])


  //load attributes
  const loadAttributes = async () => {
    // setProcessingLoader(true)
    const response: Response = await getAttributesService();
    if (response?.data?.errors) {
      await authAuthorizeRedirect(response, navigation)
    }
    dispatch(vendorAttributeActions.setData({ field: 'data', data: response?.data }))
    dispatch(vendorAttributeActions.setData({ field: 'isFirstTimeLoading', data: false }))
    // setProcessingLoader(false)
  }

  useEffect(() => {
    if (attributeSelectedFirstTimeLoading) {
      loadAttributes()
    }
  }, [attributeSelectedFirstTimeLoading])

  // load sub categories
  const loadSubCategories = async () => {
    setProcessingLoader(true)
    dispatch(vendorSubCategoriesActions.setData({ field: 'selected', data: { categoryId: '', subcategories: [] } }))
    const response: Response = await getVendorSubCategories(FORM_STATE.category);
    if (response?.data?.errors) {
      await authAuthorizeRedirect(response, navigation)
    }
    dispatch(vendorSubCategoriesActions.addServiceSubCategories({ id: FORM_STATE.category, subcategories: response?.data }))
    dispatch(vendorSubCategoriesActions.setData({ field: 'selected', data: { categoryId: FORM_STATE.category, subcategories: response?.data } }))
    dispatch(vendorSubCategoriesActions.setData({ field: 'loading', data: false }))
    setProcessingLoader(false)
  }
  /**** getting subcateories based on category *****/
  useEffect(() => {
    FORM_DISPATCH({ type: 'SET_SUB_CATEGORY', payload: '' });
    if (FORM_STATE.category) {
      const checkExisting = SubCategories.find(elementDet => elementDet.categoryId === FORM_STATE.category);
      if (!checkExisting) {
        loadSubCategories();
      } else {
        dispatch(vendorSubCategoriesActions.setData({ field: 'selected', data: { categoryId: FORM_STATE.category, subcategories: checkExisting.subcategories } }))
      }
    }
  }, [FORM_STATE.category])


  //handle add item function
  const handleAddItem = async () => {
    console.log(FORM_STATE.selectedAttrbutes) //	attributes
    console.log(FORM_STATE.variantionsDetails) //variations
    const reqUpdateAttributeVariants = FORM_STATE.attributeVariants.map((dUpdatedAttr, dUpdatedindex) => {
      return {
        name: `choice_${dUpdatedAttr.attrbuteId}`,
        title: dUpdatedAttr.attributeName,
        options: dUpdatedAttr.variants
      }
    }) //choice_options
    console.log(reqUpdateAttributeVariants)
    console.log(JSON.stringify(FORM_STATE.foodVars)) //food_variations
    
    //================= Item Insertion process here ====================================//
    const formData = new FormData()
    formData.append('category_id', FORM_STATE.category)
    formData.append('sub_category_id', FORM_STATE.subCategory)
    formData.append('translations', JSON.stringify([
      {
        locale: "en",
        key: 'name',
        value: FORM_STATE.itemTitle
      },
      {
        locale: "en",
        key: 'name',
        value: FORM_STATE.itemDesciption
      }
    ]))
    
    formData.append('price', parseFloat(FORM_STATE.itemPrice))
    formData.append('discount', FORM_STATE.discountAmount ? parseFloat(FORM_STATE.discountAmount) : 0)
    formData.append('discount_type', FORM_STATE.discountTypes)
    formData.append('addon_ids',FORM_STATE.selectedAddonsList.join(','))
    formData.append('tags',FORM_STATE.tags.join(','))
    formData.append('current_stock',FORM_STATE.totalStocks ? parseFloat(FORM_STATE.totalStocks) : 0)
    formData.append('unit_id', FORM_STATE.stockUnit)
    formData.append('maximum_cart_quantity',FORM_STATE.maximumOrderQty ? parseFloat(FORM_STATE.maximumOrderQty) : 0)
    formData.append('available_time_starts',FORM_STATE.fromTime)
    formData.append('available_time_ends',FORM_STATE.toTime)
    //thumbnail image
    if(FORM_STATE.thumbnailImage){
      formData.append('image', {
        uri: FORM_STATE.thumbnailImage,
        name: 'banner.jpg',
        type: 'image/jpeg',
      });
    }

     
     //item images
    if(FORM_STATE.itemImages.length > 0){
      FORM_STATE.itemImages.forEach((itemimage,itemindex)=>{
        formData.append('item_images[]', {
          uri: itemimage,
          name: `itemImage${itemindex}.jpg`,
          type: 'image/jpeg',
        });
      })
       
    }
    

    if (FORM_STATE.itemType === 'noveg') {
      formData.append('veg', 0)
    } else {
      formData.append('veg', 1)
    }
    const response: Response = await createVendorItems(formData)
    console.log(response?.data)
    //========================== End Item Insertion Process here ==============================//
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
          itemTitle={FORM_STATE.itemTitle}
          setItemTitle={(value) => {
            FORM_DISPATCH({ type: 'SET_ITEM_TITLE', payload: value })
            FORM_DISPATCH({ type: 'SET_ERROR_ITEM_TITLE', payload: '' })
          }}
          errorItemTitle={FORM_STATE.errorItemTitle}
          itemDesciption={FORM_STATE.itemDesciption}
          setItemDescription={(value) => {
            FORM_DISPATCH({ type: 'SET_ITEM_DESCRIPTION', payload: value })
            FORM_DISPATCH({ type: 'SET_ERROR_ITEM_DESCRIPTION', payload: '' })
          }}
          errorItemDescription={FORM_STATE.errorItemDescription}
          itemPrice={FORM_STATE.itemPrice}
          setItemPrice={(value) => {
            FORM_DISPATCH({ type: 'SET_ITEM_PRICE', payload: value })
            FORM_DISPATCH({ type: 'SET_ERROR_ITEM_PRICE', payload: '' })
          }}
          errorItemPrice={FORM_STATE.errorItemPrice}
          discountAmount={FORM_STATE.discountAmount}
          setDiscountAmount={(value) => {
            FORM_DISPATCH({ type: 'SET_DISCOUNT_AMOUNT', payload: value })
            FORM_DISPATCH({ type: 'SET_ERROR_DISCOUNT_AMOUNT', payload: '' })
          }}
          errorDiscountAmount={FORM_STATE.errorDiscountAmount}
          discountTypes={FORM_STATE.discountTypes}
          setDiscountTypes={(value) => {
            FORM_DISPATCH({ type: 'SET_DISCOUNT_TYPES', payload: value })
            FORM_DISPATCH({ type: 'SET_ERROR_DISCOUNT_TYPES', payload: '' })
          }}
          errorDiscountTypes={FORM_STATE.errorDiscountTypes}
          category={FORM_STATE.category}
          setCategory={(value) => {
            FORM_DISPATCH({ type: 'SET_CATEGORY', payload: value })
            FORM_DISPATCH({ type: 'SET_ERROR_CATEGORY', payload: '' })
          }}
          errorCategory={FORM_STATE.errorCategory}
          subCategory={FORM_STATE.subCategory}
          setSubCategory={(value) => {
            FORM_DISPATCH({ type: 'SET_SUB_CATEGORY', payload: value })
            FORM_DISPATCH({ type: 'SET_ERROR_SUB_CATEGORY', payload: '' })
          }}
          errorSubCategory={FORM_STATE.errorSubCategory}
          selectedAttrbutes={FORM_STATE.selectedAttrbutes}
          setSelectedAttributes={(value: number[]) => {
            FORM_DISPATCH({ type: 'SET_SELECTED_ATTRIBUTES', payload: value })
          }}
          maximumOrderQty={FORM_STATE.maximumOrderQty}
          setMaximumOrderQty={(value) => {
            FORM_DISPATCH({ type: 'SET_MAXIMUM_ORDER_QTY', payload: value })
            FORM_DISPATCH({ type: 'SET_ERROR_MAXIMUM_ORDER_QTY', payload: '' })
          }}
          errorMaximumOrderQty={FORM_STATE.errorMaximumOrderQty}
          tags={FORM_STATE.tags}
          setTags={(value: string[]) => {
            FORM_DISPATCH({ type: 'SET_TAGS', payload: value })
          }}
          attributeVariants={FORM_STATE.attributeVariants}
          setAttributeVariants={(value) => {
            FORM_DISPATCH({ type: 'SET_ATTRIBUTE_VARIANTS', payload: value })
          }}
          variantionsDetails={FORM_STATE.variantionsDetails}
          setVariationDetails={(value) => {
            FORM_DISPATCH({ type: 'SET_VARIATIONS_DETAILS', payload: value })
          }}
          thumbanailImage={FORM_STATE.thumbnailImage}
          setThumbnailImage={(value) => {
            FORM_DISPATCH({ type: 'SET_THUMBNAIL_IMAGE', payload: value })
          }}
          errorThumbnailImage={FORM_STATE.errorThumbnailImage}
          itemImages={FORM_STATE.itemImages}
          setItemImages={(value) => {
            FORM_DISPATCH({ type: 'SET_ITEM_IMAGES', payload: value })
          }}
          totalStocks={FORM_STATE.totalStocks}
          setTotalStocks={(value) => {
            FORM_DISPATCH({ type: 'SET_TOTAL_STOCKS', payload: value })
          }}
          stockUnit={FORM_STATE.stockUnit}
          setStockUnit={(value) => {
            FORM_DISPATCH({ type: 'SET_STOCK_UNIT', payload: value })
          }}
          errorStockUnit={FORM_STATE.errorStockUnit}
          itemType={FORM_STATE.itemType}
          setItemType={(value) => {
            FORM_DISPATCH({ type: 'SET_ITEM_TYPE', payload: value })
          }}
          foodVars={FORM_STATE.foodVars}
          setFoodVars={(value) => {
            FORM_DISPATCH({ type: 'SET_FOOD_VARS', payload: value })
          }}
          selectedAddonsList={FORM_STATE.selectedAddonsList}
          setSelectedAddOns={(value) => {
            FORM_DISPATCH({ type: 'SET_SELECTED_ADDONS_LIST', payload: value })
          }}
          fromTime={FORM_STATE.fromTime}
          toTime={FORM_STATE.toTime}
          setFromTime={(value: string) => {
            FORM_DISPATCH({ type: 'SET_FROM_TIME', payload: value })
          }}
          setToTime={(value: string) => {
            FORM_DISPATCH({ type: 'SET_TO_TIME', payload: value })
          }}
        />
        <GradientBtn
          label="newDeveloper.CreateItem"
          onPress={handleAddItem}
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
