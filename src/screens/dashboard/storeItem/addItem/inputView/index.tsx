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
import { windowHeight, windowWidth } from '@theme/appConstant';
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
    setItemImages
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
    setItemImages: (value: string[]) => void
  }
) {
  const { t, isDark } = useValues();
  const openThumbnailImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    
    handleImagePickerAllDetails(options, (imageAssets: any) => {
      if (imageAssets?.uri) {
        const fileSizeInMB = imageAssets.fileSize / (1024 * 1024);
        if (fileSizeInMB > 2) {
          Alert.alert(t('newDeveloper.greaterThantwoMbError'))
          return
        }
        setThumbnailImage(imageAssets.uri)
      }
    });
  };

  const handleSetItemImage = (value: string) => {
    if (value !== '') {
      setItemImages([...itemImages, value])
    }
  }

  const openItemImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    handleImagePickerAllDetails(options, (imageAssets: any) => {
      if (imageAssets?.uri) {
        const fileSizeInMB = imageAssets.fileSize / (1024 * 1024);
        if (fileSizeInMB > 2) {
          Alert.alert(t('newDeveloper.greaterThantwoMbError'))
          return
        }
        handleSetItemImage(imageAssets.uri)
      }
    });
  }
  const [discountTypeList, setDiscountTypeList] = useState<DataItem[]>([]);
  useEffect(() => {
    setDiscountTypeList([
      { label: t('newDeveloper.percent'), value: 'percent' },
      { label: t('newDeveloper.amount'), value: 'amount' },
    ])
  }, [])

  //categories
  const [categoryList, setCategoryList] = useState<DataItem[]>([])
  const {
    data: categoriesData,
  } = useSelector(
    (state: RootState) => state['vendorCategories']
  );
  useEffect(() => {

    if (categoriesData.length > 0) {
      const catData: DataItem[] = categoriesData.map((dd: CategoryInterface, _: number) => {
        return { value: dd.id.toString(), label: dd.name }
      })
      setCategoryList(catData)
    }
  }, [categoriesData])


  const [subCategoryList, setSubCategoryList] = useState<DataItem[]>([])

  //Sub categories
  const {
    selected: subCategoriesData,
  } = useSelector(
    (state: RootState) => state['vendorSubCategories']
  );

  useEffect(() => {
    if (subCategoriesData.subcategories.length > 0) {
      const catData: DataItem[] = subCategoriesData.subcategories.map((dd: SubCategoriesInterface, _: number) => {
        return { value: dd.id.toString(), label: dd.name }
      })
      setSubCategoryList(catData)
    } else {
      setSubCategoryList([])
    }

  }, [subCategoriesData])

  const {
    data: Attributes
  } = useSelector((state: RootState) => state['vendorAttribute'])


  const handleVariantsChange = (variants: string[], attribute: number) => {
    const variantIndex = attributeVariants.findIndex(ele => ele.attrbuteId === attribute)
    if (variantIndex !== -1) {
      const cloneAttributeVariants = [...attributeVariants]
      cloneAttributeVariants[variantIndex] = { ...cloneAttributeVariants[variantIndex], variants }
      setAttributeVariants(cloneAttributeVariants)
    } else {
      setAttributeVariants([...attributeVariants, { attrbuteId: attribute, variants }])
    }
  }
  //generate variant combinations
  function generateCombinations(arr: string[][], prefix: string[] = []): string[][] {
    if (arr.length === 0) return [prefix];
    const [first, ...rest] = arr;

    return first.reduce(
      (acc: string[][], variant: string) => acc.concat(generateCombinations(rest, [...prefix, variant])),
      []
    );
  }

  useEffect(() => {
    if (attributeVariants.length > 0) {
      const variantsArray: string[][] = attributeVariants.map(attr => attr.variants);
      const combinations: string[][] = generateCombinations(variantsArray);
      const variationOutput: Combination[] = combinations.map(combo => ({
        type: combo.join('-'),
        stock: 0,
        price: 0,
      }));

      setVariationDetails(variationOutput)
    } else {
      setVariationDetails([])
    }
  }, [attributeVariants])

  const removeImage = (imageindex:number) =>{
    const d = itemImages.filter((_, imgindex) => imgindex !== imageindex);
    setItemImages(d)
  }


  const [vendorList, setVendorList] = useState<DataItem[]>([])

  const {
    data: vendorUnitList,
  } = useSelector(
    (state: RootState) => state['vendorUnits']
  );


  useEffect(() => {

    if (vendorUnitList.length > 0) {
      const vendorData: DataItem[] = vendorUnitList.map((dd: UnitInterface, _: number) => {
        return { value: dd.id.toString(), label: dd.unit }
      })
      setVendorList(vendorData)
    }
  }, [vendorUnitList])



   



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
        <TagInput placeholderText={t('newDeveloper.addTag')} tags={tags} onTagsChange={setTags} />


        {/* adding attributes panel  */}
        <StoreAttributes selectedAttrbutes={selectedAttrbutes} setSelectedAttributes={setSelectedAttributes} />


        {selectedAttrbutes.length > 0 && selectedAttrbutes.map((attribute: number, _: number) => {
          const findAttr = Attributes.findIndex(ele => ele.id === attribute)
          const attributeName = Attributes[findAttr]?.name

          const variantIndex = attributeVariants.findIndex(ele => ele.attrbuteId === attribute)
          let variants: string[] = []
          if (variantIndex !== -1) {
            variants = attributeVariants[variantIndex].variants
          }
          return <View key={`attribute${attribute}`} style={{ marginTop: 10, }}>
            <Text style={{ fontSize: windowHeight(2), marginLeft: windowWidth(5), marginBottom: windowHeight(1), color: appColors.primary }}>Add variant for {attributeName}</Text>
            <VariantInput placeholderText={t('newDeveloper.addVariant')} variants={variants} onVariantsChange={(variants: string[]) => handleVariantsChange(variants, attribute)} />
          </View>
        })}
        {/* variant pricing and stock panel */}
        {variantionsDetails.length > 0 && variantionsDetails.map((variant: Combination, variantindex: number) => (
          <>
            <View style={{ marginTop: 10, marginLeft: windowWidth(5), marginBottom: windowHeight(1) }}>
              <Text style={{ fontSize: windowHeight(2), color: appColors.primary }}>{t('newDeveloper.Variant')}: <Text style={{ fontSize: windowHeight(2), marginVertical: windowWidth(5), color: isDark ? appColors.white : appColors.darkText }}>{variant.type}</Text></Text>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
              <TextInputComponent
                placeholder={t('newDeveloper.VariantPriceText')}
                value={maximumOrderQty}
                keyboardType='number-pad'
                onChangeText={value => {
                  setMaximumOrderQty(value);
                }}
                containerStyle={{ flex: 1, marginHorizontal: windowWidth(2) }}
                error={errorMaximumOrderQty}
              />
              <TextInputComponent
                placeholder={t('newDeveloper.VariantStockText')}
                value={maximumOrderQty}
                keyboardType='number-pad'
                onChangeText={value => {
                  setMaximumOrderQty(value);
                }}
                containerStyle={{ flex: 1, marginHorizontal: windowWidth(2) }}
                error={errorMaximumOrderQty}
              />
            </View>
          </>))}



        {/* Total Stock and unit for product */}


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
          onPress={openThumbnailImage}
          image={thumbanailImage}
          setImage={setThumbnailImage}
          error={errorThumbnailImage}
        />



      </View>
      <View style={{ flex: 1, marginLeft: 20, marginTop: 10, }}>
        <Text style={{ fontSize: windowHeight(2), color: appColors.primary }}>Upload Images</Text>
      </View>
      {itemImages.length > 0 && itemImages.map((itemImage: string, indexItem: number) => {
        return <TouchableOpacity
          activeOpacity={0.9}
          style={styles.imageContainer}>
          <Image source={{ uri: itemImage }} style={styles.imageStyle} />
          <TouchableOpacity onPress={() => removeImage(indexItem)} style={styles.crossButton}>
            <Icon name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      })}
      <UploadContainerView
        title={'newDeveloper.uploadImages'}
        onPress={openItemImage}
        image={''}
        setImage={handleSetItemImage}
        error={''}
      />
    </>
  );
}
