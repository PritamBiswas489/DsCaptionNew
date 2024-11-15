import { View, Text, Alert, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import TextInputComponent from '@otherComponent/auth/textInput';
import UploadContainerView from '@src/otherComponent/auth/uploadContainer';
import {
  ServiceName,
  HomeIcon,
  SubCategory,
  Notes,
  Location,
  Experience,
  ServiceMen,
  Amount,
  Discount,
  ReceiptDiscount,
} from '@utils/icons';
import { fontSizes, windowHeight, windowWidth } from '@theme/appConstant';
import { useValues } from '../../../../../../App';
import { ImageLibraryOptions } from 'react-native-image-picker';
import { handleImagePicker, handleImagePickerAllDetails } from '@utils/functions';
import { CategoriesInterface } from '@src/interfaces/categoriesInterface';
import SelectionDropdown from '@src/otherComponent/selectionDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';
import { CategoryInterface } from '@src/interfaces/store/categories.interface';
import { SubCategoriesInterface } from "@src/interfaces/store/subcategories.interface";
import StoreAttributes from '@src/otherComponent/home/storeAttributes';
import appColors from '@src/theme/appColors';
import TagInput from '../tagInput';
import VariantInput from '../variantInput';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UnitInterface } from '@src/interfaces/store/units.interface';
import { RadioButton } from 'react-native-paper';
import TimepickerSelectTimeTwentyFourHours from '@src/commonComponents/timepickerSelectTimeTwentyFourHours';
import { FoodVariation } from '../foodVariation';
import { foodVariations } from '@src/interfaces/store/foodVariations.interface';
import { AddonInterface } from '@src/interfaces/store/addons.interface';
import AddonInput from '../addonInput';
import appFonts from '@src/theme/appFonts';

interface DataItem {
  label: string;
  value: string;
}
interface Combination {
  type: string;
  stock: number;
  price: number;
}

export default function InputView(
  {
    itemTitle,
    setItemTitle,
    errorItemTitle,
    itemDesciption,
    setItemDescription,
    errorItemDescription,
    itemPrice,
    setItemPrice,
    errorItemPrice,
    discountAmount,
    setDiscountAmount,
    errorDiscountAmount,
    discountTypes,
    setDiscountTypes,
    errorDiscountTypes,
    category,
    setCategory,
    errorCategory,
    subCategory,
    setSubCategory,
    errorSubCategory,
    selectedAttrbutes,
    setSelectedAttributes,
    maximumOrderQty,
    setMaximumOrderQty,
    errorMaximumOrderQty,
    tags,
    setTags,
    attributeVariants,
    setAttributeVariants,
    variantionsDetails,
    setVariationDetails,
    thumbanailImage,
    setThumbnailImage,
    errorThumbnailImage,
    itemImages,
    setItemImages,
    totalStocks,
    setTotalStocks,
    stockUnit,
    setStockUnit,
    errorStockUnit,
    itemType,
    setItemType,
    foodVars,
    setFoodVars,
    selectedAddonsList,
    setSelectedAddOns

  }: {
    itemTitle: string,
    setItemTitle: (value: string) => void,
    errorItemTitle: string,
    itemDesciption: string,
    setItemDescription: (value: string) => void,
    errorItemDescription: string,
    itemPrice: string,
    setItemPrice: (value: string) => void,
    errorItemPrice: string,
    discountAmount: string,
    setDiscountAmount: (value: string) => void,
    errorDiscountAmount: string,
    discountTypes: string,
    setDiscountTypes: (value: string) => void,
    errorDiscountTypes: string,
    category: string,
    setCategory: (value: string) => void,
    errorCategory: string,
    subCategory: string,
    setSubCategory: (value: string) => void,
    errorSubCategory: string,
    selectedAttrbutes: number[],
    setSelectedAttributes: (value: number[]) => void,
    maximumOrderQty: string,
    setMaximumOrderQty: (value: string) => void,
    errorMaximumOrderQty: string,
    tags: string[],
    setTags: (value: string[]) => void,
    attributeVariants: { attrbuteId: number, variants: string[] }[],
    setAttributeVariants: (value: { attrbuteId: number, variants: string[] }[]) => void,
    variantionsDetails: Combination[],
    setVariationDetails: (value: Combination[]) => void,
    thumbanailImage: string,
    setThumbnailImage: (value: string) => void,
    errorThumbnailImage: string,
    itemImages: string[],
    setItemImages: (value: string[]) => void,
    totalStocks: string,
    setTotalStocks: (value: string) => void,
    stockUnit: string,
    setStockUnit: (value: string) => void,
    errorStockUnit: string,
    itemType: string,
    setItemType: (value: string) => void,
    foodVars: foodVariations[],
    setFoodVars: (value: foodVariations[]) => void,
    selectedAddonsList:string[]
    setSelectedAddOns:(value:string[])=>void
  }
) {
  const { t, isDark } = useValues();

  const { stores: storesList } = useSelector(
    (state: RootState) => state['storeProfileData']
  );
  const { module: storeModuleDetails } = storesList[0]
  const { module_type } = storeModuleDetails
  
  return (
    <>
      <View style={{ flex: 1 }}>
        {/* item title */}
        <View>
          <Text style={[
            styles.inputLabel,
            {color: isDark ? appColors.white : appColors.darkText}
            ]}>Store name (English)</Text>
          <TextInputComponent
            placeholder={t('newDeveloper.itemTitle')}
            value={itemTitle}
            onChangeText={value => {
              setItemTitle(value);
            }}
            error={errorItemTitle}
            containerStyle={{marginTop:windowHeight(1)}}
          />
        </View>
        
        
        {/* item description */}
        {/* <TextInputComponent
          placeholder={t('newDeveloper.itemDescription')}
          value={itemDesciption}
          onChangeText={value => {
            setItemDescription(value);
          }}
          containerStyle={{ marginBottom: windowHeight(0) }}
          multiline={true}
          inputStyle={styles.inputStyle}
          error={errorItemDescription}
        /> */}

        {/* <RadioButton.Group onValueChange={newValue => setItemType(newValue)} value={itemType}>
          <View style={styles.radioContainer}>
            <View style={styles.radioButton}>
              <RadioButton value="noveg" />
              <Text style={styles.radioLabel}>{t('newDeveloper.Nonveg')}</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton value="veg" />
              <Text style={styles.radioLabel}>{t('newDeveloper.Veg')}</Text>
            </View>

          </View>
        </RadioButton.Group> */}






        {/* item price  */}
        {/* <TextInputComponent
          placeholder={t('newDeveloper.itemPrice')}
          value={itemPrice}
          keyboardType='number-pad'
          onChangeText={value => {
            setItemPrice(value);
          }}
          Icon={<Amount />}
          error={errorItemPrice}
        /> */}
        {/* item discount */}
        {/* <TextInputComponent
          placeholder={t('newDeveloper.discount')}
          value={discountAmount}
          keyboardType='number-pad'
          onChangeText={value => {
            setDiscountAmount(value);
          }}
          Icon={<Amount />}
          error={errorDiscountAmount}
        /> */}
       
      
        {/* Total Stock and unit for product */}
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

        
          <TextInputComponent
            placeholder={t('newDeveloper.totalStock')}
            value={totalStocks}
            keyboardType='number-pad'
            editable={false}
            onChangeText={value => {
              setTotalStocks(value);
            }}
            containerStyle={{ flex: 1, marginHorizontal: windowWidth(2) }}
            error={''}
          />

          
          <SelectionDropdown
            data={vendorUnits}
            value={stockUnit}
            setValue={(value: string) => {
              setStockUnit(value)
            }}
            label={t('newDeveloper.units')}
            error={errorStockUnit}

          />

        </View> */}


        

      
        
         


      


      </View>
      
     
      
     
      
    </>
  );
}
