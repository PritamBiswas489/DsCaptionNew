import { View, Text } from 'react-native';
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
import { windowHeight, windowWidth } from '@theme/appConstant';
import { useValues } from '../../../../../../App';
import { ImageLibraryOptions } from 'react-native-image-picker';
import { handleImagePicker } from '@utils/functions';
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


interface DataItem {
  label: string;
  value: string;
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
    setTags
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
    selectedAttrbutes:number[],
    setSelectedAttributes:(value:number[])=>void,
    maximumOrderQty: string,
    setMaximumOrderQty: (value: string) => void,
    errorMaximumOrderQty: string,
    tags:string[],
    setTags:(value: string[]) => void,
  }
) {
  const { t } = useValues();
  const openImageFront = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    handleImagePicker(options, (imageUri: string) => {
      // setBannerImage(imageUri);
    });
  };
  const [discountTypeList,setDiscountTypeList] = useState<DataItem[]>([]);
  useEffect(()=>{
    setDiscountTypeList([
      {label:t('newDeveloper.percent'),value:'percent'},
      {label:t('newDeveloper.amount'),value:'amount'},
     ])     
  },[])
 
  //categories
  const [categoryList,setCategoryList] =  useState<DataItem[]>([])
  const {
    data: categoriesData,
  } = useSelector(
    (state: RootState) => state['vendorCategories']
  );
  useEffect(()=>{
    
     if(categoriesData.length > 0){
        const catData:DataItem[] =  categoriesData.map((dd:CategoryInterface,_:number)=>{
            return {value:dd.id.toString(),label:dd.name}
        })
        setCategoryList(catData)
     }
  },[categoriesData])


  const [subCategoryList,setSubCategoryList] =  useState<DataItem[]>([])

  //Sub categories
  const {
    selected: subCategoriesData,
  } = useSelector(
    (state: RootState) => state['vendorSubCategories']
  );
  
  useEffect(()=>{
    if(subCategoriesData.subcategories.length > 0){
        const catData:DataItem[] =  subCategoriesData.subcategories.map((dd:SubCategoriesInterface,_:number)=>{
          return {value:dd.id.toString(),label:dd.name}
      })
      setSubCategoryList(catData)  
    }else{
      setSubCategoryList([])
    }

  },[subCategoriesData])

  const {
    data:Attributes
  } = useSelector((state: RootState) => state['vendorAttribute'])

 
  return (
    <>
    <View style={{ flex: 1 }}>
      {/* item title */}
      <TextInputComponent
        placeholder={t('newDeveloper.itemTitle')}
        Icon={<ServiceName />}
        value={itemTitle}
        onChangeText={value => {
          setItemTitle(value);
        }}
        error={errorItemTitle}
      />
      {/* item description */}
      <TextInputComponent
        placeholder={t('newDeveloper.itemDescription')}
        value={itemDesciption}
        onChangeText={value => {
          setItemDescription(value);
        }}
        containerStyle={{ marginBottom: windowHeight(0) }}
        multiline={true}
        inputStyle={styles.inputStyle}
        error={errorItemDescription}
      />
       {/* item price  */}
      <TextInputComponent
        placeholder={t('newDeveloper.itemPrice')}
        value={itemPrice}
        keyboardType='number-pad'
        onChangeText={value => {
          setItemPrice(value);
        }}
        Icon={<Amount />}
        error={errorItemPrice}
      />
     {/* item discount */}
      <TextInputComponent
        placeholder={t('newDeveloper.discount')}
        value={discountAmount}
        keyboardType='number-pad'
        onChangeText={value => {
          setDiscountAmount(value);
        }}
        Icon={<Amount />}
        error={errorDiscountAmount}
      />
      {/* item discount types */}
      <SelectionDropdown
        data={discountTypeList}
        value={discountTypes}
        setValue={(value: string) => {
          setDiscountTypes(value)
        }}
        label={t('newDeveloper.discountTypes')}
        error={errorDiscountTypes}
      />
      {/*  item category list */}
      <SelectionDropdown
        data={categoryList}
        value={category}
        setValue={(value: string) => {
          setCategory(value)
        }}
        label={t('newDeveloper.categories')}
        error={errorCategory}
      />

      {/* item sub category */}

      <SelectionDropdown
        data={subCategoryList}
        value={subCategory}
        setValue={(value: string) => {
          setSubCategory(value)
        }}
        label={t('newDeveloper.subCategories')}
        error={errorSubCategory}
      />
      <TagInput placeholderText={t('newDeveloper.addTag') } tags={tags} onTagsChange={setTags} />

     <StoreAttributes selectedAttrbutes={selectedAttrbutes} setSelectedAttributes={setSelectedAttributes}/>

    
     {selectedAttrbutes.length > 0 && selectedAttrbutes.map((attribute:number,_:number)=>{
        const findAttr = Attributes.findIndex(ele=>ele.id === attribute)
        const attributeName = Attributes[findAttr]?.name
        return  <View  style={{  marginTop:10, }}>
           <Text style={{fontSize:windowHeight(2),marginLeft:windowWidth(5),marginBottom:windowHeight(1),color:appColors.primary}}>Add variant for {attributeName}</Text>
              <VariantInput placeholderText={t('newDeveloper.addVariant') } variants={tags} onVariantsChange={setTags} />
          </View>
     })}

     
    

   
   
     {/* Maximum order quantity */}
     
     <TextInputComponent
        placeholder={t('newDeveloper.maximumOrderqty')}
        value={maximumOrderQty}
        keyboardType='number-pad'
        onChangeText={value => {
          setMaximumOrderQty(value);
        }}
        error={errorMaximumOrderQty}
      />

    
     <UploadContainerView
        title={'newDeveloper.uploadThumbnail'}
        onPress={openImageFront}
        image={''}
        setImage={()=>{}}
        error={''}
      />
      
      
     
    </View>
    <View style={{ flex: 1, marginLeft:20,marginTop:10, }}>
        <Text style={{fontSize:windowHeight(2),color:appColors.primary}}>Upload Images</Text>
    </View>

    <UploadContainerView
        title={'newDeveloper.uploadImages'}
        onPress={openImageFront}
        image={''}
        setImage={()=>{}} 
        error={''}
      />
  </>
  );
}
