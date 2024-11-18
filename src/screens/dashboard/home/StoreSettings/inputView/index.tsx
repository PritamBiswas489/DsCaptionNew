import { View, Text, Alert, Image, TouchableOpacity, SafeAreaView } from 'react-native';
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
import appColors from '@src/theme/appColors';
import { Checkbox } from 'react-native-paper';
import TimepickerSelectTimeTwentyFourHours from '@src/commonComponents/timepickerSelectTimeTwentyFourHours';

import SwitchContainer from '@src/otherComponent/switchContainer';

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
    storeName,
    setStoreName,
    errorStoreName,
    contactNumber,
    setContactNumber,
    errorContactNumber,
    storeAddress,
    setStoreAddress,
    errorStoreAddress,
    minimumOrderAmount,
    setMinimumOrderAmount,
    errorMinimumOrderAmount,
    metaTitle,
    setMetaTitle,
    errorMetaTitle,
    metaDescription,
    setMetaDescription,
    errorMetaDescription,
    gstStatus,
    setGstStatus,
    gstPercentageValue,
    setGstPercentageValue,
    errorGstPercentageValue,
    scheduleOrderStatus,
    setScheduleOrderStatus,
    deliveryStatus,
    setDeliveryStatus,
    takeawayStatus,
    setTakewayStatus,
    storeLogo,
    setStoreLogo,
    storeCoverPhoto,
    setStoreCoverPhoto,
    approxDeliveryMinimumTime,
    setApproxDeliveryMinimumTime,
    approxDeliveryMaximumTime,
    setApproxDeliveryMaximumTime,
    approxDeliveryType,
    setApproxDeliveryType,
    itemType,
    setItemType,
  }: {
    storeName: string,
    setStoreName: (value: string) => void,
    errorStoreName: string,
    contactNumber: string,
    setContactNumber: (value: string) => void,
    errorContactNumber: string,
    storeAddress: string,
    setStoreAddress: (value: string) => void,
    errorStoreAddress: string,
    minimumOrderAmount: number,
    setMinimumOrderAmount: (value: number) => void,
    errorMinimumOrderAmount: string,
    metaTitle: string,
    setMetaTitle: (value: string) => void,
    errorMetaTitle: string,
    metaDescription: string,
    setMetaDescription: (value: string) => void,
    errorMetaDescription: string,
    gstStatus: boolean,
    setGstStatus: (value: boolean) => void,
    gstPercentageValue: number,
    setGstPercentageValue: (value: number) => void,
    errorGstPercentageValue: string,
    scheduleOrderStatus: boolean,
    setScheduleOrderStatus: (value: boolean) => void,
    deliveryStatus: boolean,
    setDeliveryStatus: (value: boolean) => void,
    takeawayStatus: boolean,
    setTakewayStatus: (value: boolean) => void,
    storeLogo: string,
    setStoreLogo: (value: string) => void,
    storeCoverPhoto: string,
    setStoreCoverPhoto: (value: string) => void,
    approxDeliveryMinimumTime: string,
    setApproxDeliveryMinimumTime: (value: string) => void,
    approxDeliveryMaximumTime: string,
    setApproxDeliveryMaximumTime: (value: string) => void,
    approxDeliveryType: string,
    setApproxDeliveryType: (value: string) => void,
    itemType: string[],
    setItemType: (value: string[]) => void,
  }
) {
  const { t, isDark } = useValues();
  const { stores: storesList } = useSelector(
    (state: RootState) => state['storeProfileData']
  );
  const { module: storeModuleDetails } = storesList[0]
  const { module_type } = storeModuleDetails

  //handle item type
  const handleItemType = (type: string) => {
    if (itemType.includes(type)) {
      setItemType(itemType.filter((value: string) => type !== value))
    } else {
      setItemType([...itemType, type])
    }
  }
 //open cover image
  const openCoverImage = () => {
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
        setStoreCoverPhoto(imageAssets.uri)
      }
    });
  };
 //open store image
  const openStoreImage = () => {
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
        setStoreLogo(imageAssets.uri)
      }
    });
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        {/* Store name */}
        <View style={{ marginTop: 5 }}>
          <Text style={[
            styles.inputLabel,
            { color: isDark ? appColors.white : appColors.darkText }
          ]}> {t('newDeveloper.Store_name_English')}</Text>
          <TextInputComponent
            placeholder={t('newDeveloper.enterStoreName')}
            value={storeName}
            onChangeText={value => {
              setStoreName(value);
            }}
            error={errorStoreName}
            containerStyle={{ marginTop: windowHeight(1) }}
          />
        </View>
        {/* Contact number */}
        <View style={{ marginTop: 5 }}>
          <Text style={[
            styles.inputLabel,
            { color: isDark ? appColors.white : appColors.darkText }
          ]}> {t('newDeveloper.Contact_number')}</Text>
          <TextInputComponent
            placeholder={t('newDeveloper.enterContactNumber')}
            value={contactNumber}
            onChangeText={value => {
              setContactNumber(value);
            }}
            error={errorContactNumber}
            containerStyle={{ marginTop: windowHeight(1) }}
          />
        </View>
        {/* store address */}
        <View style={{ marginTop: 5 }}>
          <Text style={[
            styles.inputLabel,
            { color: isDark ? appColors.white : appColors.darkText }
          ]}> {t('newDeveloper.Store_address')}</Text>
          <TextInputComponent
            placeholder={t('newDeveloper.enterAddress')}
            value={storeAddress}
            onChangeText={value => {
              setStoreAddress(value);
            }}
            error={errorStoreAddress}
            containerStyle={{ marginTop: windowHeight(1) }}
          />
        </View>
        {/* Minimum order amount  */}
        <View style={{ marginTop: 5 }}>
          <Text style={[
            styles.inputLabel,
            { color: isDark ? appColors.white : appColors.darkText }
          ]}> {t('newDeveloper.MinimumOrderAmount')}</Text>
          <TextInputComponent
            keyboardType='number-pad'
            placeholder={t('newDeveloper.EnterAmount')}
            value={minimumOrderAmount.toString()}
            onChangeText={value => {
              setMinimumOrderAmount(parseFloat(value));
            }}
            error={errorMinimumOrderAmount}
            containerStyle={{ marginTop: windowHeight(1) }}
          />
        </View>

        {/* Meta title  */}
        <View style={{ marginTop: 5 }}>
          <Text style={[
            styles.inputLabel,
            { color: isDark ? appColors.white : appColors.darkText }
          ]}> {t('newDeveloper.Meta_title')}</Text>
          <TextInputComponent
            placeholder={t('newDeveloper.enterMetaTitle')}
            value={metaTitle}
            onChangeText={value => {
              setMetaTitle(value);
            }}
            error={errorMetaTitle}
            containerStyle={{ marginTop: windowHeight(1) }}
          />
        </View>

        {/* Meta description  */}
        <View style={{ marginTop: 5 }}>
          <Text style={[
            styles.inputLabel,
            { color: isDark ? appColors.white : appColors.darkText }
          ]}> {t('newDeveloper.MetaDescriptionEnglish')}</Text>
          <TextInputComponent
            placeholder={t('newDeveloper.enterMetaDescription')}
            value={metaDescription}
            onChangeText={value => {
              setMetaDescription(value);
            }}
            containerStyle={{ marginBottom: windowHeight(0) }}
            multiline={true}
            inputStyle={styles.inputStyle}
            error={errorMetaDescription}
          />
        </View>

        {/* gst percentage panel */}
        <View style={{ marginTop: 5 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[
              styles.inputLabel,
              { color: isDark ? appColors.white : appColors.darkText },

            ]}> {t('newDeveloper.Gst')}</Text>
            <SwitchContainer
              toggleDarkSwitch={() => { setGstStatus(!gstStatus) }}
              switchOn={gstStatus}
            />
          </View>
          <TextInputComponent
            keyboardType='number-pad'
            placeholder={t('newDeveloper.enterGst')}
            value={gstPercentageValue.toString()}
            onChangeText={value => {
              setGstPercentageValue(parseFloat(value));
            }}
            error={errorGstPercentageValue}
            containerStyle={{ marginTop: windowHeight(1) }}
          />
        </View>
        {/* schedule order status  */}
        <View style={{ marginTop: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[
              styles.inputLabel,
              { color: isDark ? appColors.white : appColors.darkText },

            ]}> {t('newDeveloper.ScheduleOrderStatus')}</Text>
            <SwitchContainer
              toggleDarkSwitch={() => { setScheduleOrderStatus(!scheduleOrderStatus) }}
              switchOn={scheduleOrderStatus}
            />
          </View>
        </View>
        {/* delivery status */}
        <View style={{ marginTop: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[
              styles.inputLabel,
              { color: isDark ? appColors.white : appColors.darkText },

            ]}> {t('newDeveloper.deliveryStatus')}</Text>
            <SwitchContainer
              toggleDarkSwitch={() => { setDeliveryStatus(!deliveryStatus) }}
              switchOn={deliveryStatus}
            />
          </View>
        </View>

        {/* take away status */}
        <View style={{ marginTop: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[
              styles.inputLabel,
              { color: isDark ? appColors.white : appColors.darkText },

            ]}> {t('newDeveloper.takeAwayStatus')}</Text>
            <SwitchContainer
              toggleDarkSwitch={() => { setTakewayStatus(!takeawayStatus) }}
              switchOn={takeawayStatus}
            />
          </View>
        </View>

        {/* approx delivery time */}


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

        {/* Total Stock */}
        <TextInputComponent
          placeholder={t('Minimum')}
          value={approxDeliveryMinimumTime.toString()}
          keyboardType='number-pad'
          editable={false}
          onChangeText={value => {
            setApproxDeliveryMinimumTime(value);
          }}
          containerStyle={{ flex: 1, marginHorizontal: windowWidth(2) }}
          error={''}
        />

       <TextInputComponent
          placeholder={t('Maximum')}
          value={approxDeliveryMaximumTime.toString()}
          keyboardType='number-pad'
          editable={false}
          onChangeText={value => {
            setApproxDeliveryMaximumTime(value);
          }}
          containerStyle={{ flex: 1, marginHorizontal: windowWidth(2) }}
          error={''}
        />

          
          <SelectionDropdown
            data={[{label:'Minutes',value:'minutes'},{label:'Hours',value:'hours'},{label:'Days',value:'days'}]}
            value={approxDeliveryType}
            setValue={(value: string) => {
              setApproxDeliveryType(value)
            }}
            label={''}
            error={''}

          />

</View>


        {/* item type */}

        <SafeAreaView style={styles.container}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={itemType.includes('nonveg') ? 'checked' : 'unchecked'}
              onPress={() => { handleItemType('nonveg') }}
            />
            <Text style={styles.label}>{t('newDeveloper.nonVeg')}</Text>
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox
              status={itemType.includes('veg') ? 'checked' : 'unchecked'}
              onPress={() => { handleItemType('veg') }}
            />
            <Text style={styles.label}>{t('newDeveloper.veg')}</Text>
          </View>
        </SafeAreaView>


        {/* store logo */}
        <UploadContainerView
          title={'newDeveloper.uploadStoreLogotwoMb'}
          onPress={openStoreImage}
          image={storeLogo}
          setImage={setStoreLogo}
          error={''}
        />
       {/* store cover photo */}
        <UploadContainerView
          title={'newDeveloper.uploadStoreCoverPhototwoMb'}
          onPress={openCoverImage}
          image={storeCoverPhoto}
          setImage={setStoreCoverPhoto}
          error={''}
        />











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
