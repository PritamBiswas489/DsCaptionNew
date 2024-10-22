import { Alert, TouchableOpacity, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import UploadContainerView from '@otherComponent/auth-store/uploadContainer';
import TextInputComponent from '@otherComponent/auth-store/textInput';
import { Company, Experience } from '@utils/icons';
import PhoneTextInput from '@otherComponent/auth-store/phoneTextInput';
import { windowHeight, windowWidth } from '@theme/appConstant';
import { Notes, Email, Location, Amount, Clock } from '@utils/icons';

import { ImageLibraryOptions } from 'react-native-image-picker';
import { handleImagePicker } from '@utils/functions';

import { useValues } from '../../../../../../../App';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';
import { registerFieldActions } from '@src/store/redux/register-field-redux';
import { registerFieldErrorActions } from '@src/store/redux/register-error-redux';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/navigation/types';
import SelectionDropdown from '@src/otherComponent/selectionDropdown';
import DeliveryTimePicker from '@commonComponents/deliveryTimePicker';

interface DataItem {
  label: string;
  value: string;
}

type props = NativeStackNavigationProp<RootStackParamList>;
export default function InputField() {
  const dispatch = useDispatch()
  const { navigate } = useNavigation<props>();
  const [showDeliveryTimeModal, setShowDeliveryTimeModal] = useState<boolean>(false)


  const zones = useSelector((state: RootState) => state['zoneList'].zones)
  const [zoneList, setZoneList] = useState<DataItem[]>([]);

  const zone_id = useSelector((state: RootState) => state['registerProviderField'].zone_id)
  const setZoneId = (value: string) => {
    dispatch(registerFieldActions.setData({
      field: 'zone_id',
      data: value,
    }))

    dispatch(registerFieldErrorActions.setData({
      field: 'zone_id',
      data: '',
    }))
  }



  const company = useSelector((state: RootState) => state['registerProviderField'].company_name)
  const setCompany = (value: string) => {
    dispatch(registerFieldActions.setData({
      field: 'company_name',
      data: value,
    }))

    dispatch(registerFieldErrorActions.setData({
      field: 'company_name',
      data: '',
    }))

  }
  const errorCompany = useSelector((state: RootState) => state['registerProviderErrorField'].company_name)

  const email = useSelector((state: RootState) => state['registerProviderField'].company_email)
  const setEmail = (value: string) => {
    dispatch(registerFieldActions.setData({
      field: 'company_email',
      data: value,
    }))

    dispatch(registerFieldErrorActions.setData({
      field: 'company_email',
      data: '',
    }))

  }

  const errorEmail = useSelector((state: RootState) => state['registerProviderErrorField'].company_email)

  const phoneCountryCode = useSelector((state: RootState) => state['registerProviderField'].company_phone_country)
  const setPhoneCountryCode = (value: string) => {
    dispatch(registerFieldActions.setData({
      field: 'company_phone_country',
      data: value,
    }))

  }
  const errorPhoneCountryCode = useSelector((state: RootState) => state['registerProviderErrorField'].company_phone_country)

  const phoneCountryDialCode = useSelector((state: RootState) => state['registerProviderField'].company_phone_dial_code)
  const setPhoneCountryDialCode = (value: string) => {
    dispatch(registerFieldActions.setData({
      field: 'company_phone_dial_code',
      data: value,
    }))
  }

  const errorPhoneCountryDialCode = useSelector((state: RootState) => state['registerProviderErrorField'].company_phone_dial_code)

  const phoneNo = useSelector((state: RootState) => state['registerProviderField'].company_phone)
  const setPhoneNo = (value: string) => {
    dispatch(registerFieldActions.setData({
      field: 'company_phone',
      data: value,
    }))

    dispatch(registerFieldErrorActions.setData({
      field: 'company_phone',
      data: '',
    }))

  }
  const errorPhoneNo = useSelector((state: RootState) => state['registerProviderErrorField'].company_phone)

  const company_address = useSelector((state: RootState) => state['mapField'].address)

  const errorCompanyAddress = useSelector((state: RootState) => state['registerProviderErrorField'].company_address)

  const { t } = useValues();

  const image = useSelector((state: RootState) => state['registerProviderField'].company_logo)
  const setImage = (value: string) => {
    dispatch(registerFieldActions.setData({
      field: 'company_logo',
      data: value,
    }))

    dispatch(registerFieldErrorActions.setData({
      field: 'company_logo',
      data: '',
    }))

  }

  const imageError = useSelector((state: RootState) => state['registerProviderErrorField'].company_logo)

  const openImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    handleImagePicker(options, (imageUri: string) => {
      setImage(imageUri);
    });
  };
  useEffect(() => {
    console.log(image)
  }, [image])

  return (


    <View style={styles.container}>

      {/* Upload store logo  */}
      <UploadContainerView
        title={t('newDeveloper.UploadStorelogo')}
        onPress={() => openImage()}
        image={image}
        setImage={setImage}
        error={imageError}
      />
      {/* Upload store cover photo */}

      <UploadContainerView
        title={t('newDeveloper.Uploadstorecoverphoto')}
        onPress={() => openImage()}
        image={image}
        setImage={setImage}
        error={imageError}
      />






      {/* Store name */}
      <TextInputComponent
        placeholder={t('newDeveloper.Enterstorename')}
        Icon={<Company />}
        error={errorCompany}
        value={company}
        onChangeText={value => {
          setCompany(value);
        }}
        containerStyle={{ marginBottom: windowHeight(1) }}
      />

      <SelectionDropdown
        data={zoneList}
        value={zone_id}
        setValue={(value: string) => {
          setZoneId(value)
        }}
        label={t('newDeveloper.Selectmodule')}
        error={''}
      />
      {/* Company address */}

      <TouchableOpacity onPress={() => navigate('StoreAddressCurrentLocation')}>
        <TextInputComponent
          placeholder={t('newDeveloper.Selectstoreaddress')}
          Icon={<Location />}
          error={''}
          value={''}
          editable={false}
          onFocus={() => navigate('StoreAddressCurrentLocation')}
          onChangeText={value => {

          }}
          containerStyle={{
            marginBottom: windowWidth(1),
            marginTop: windowWidth(1),
          }}
        />
      </TouchableOpacity>


      <TextInputComponent
        placeholder={t('Vat/tax')}
        Icon={<Amount />}
        error={errorCompany}
        keyboardType='number-pad'
        value={company}
        onChangeText={value => {
          setCompany(value);
        }}
        containerStyle={{ marginBottom: windowHeight(1) }}
      />



      <TouchableOpacity onPress={() => setShowDeliveryTimeModal(true)}>
        <TextInputComponent
          placeholder={t('newDeveloper.Selectdeliverytime')}
          Icon={<Clock />}
          error={errorCompanyAddress}
          value={company_address}
          editable={false}
          onFocus={() => setShowDeliveryTimeModal(true)}
          onChangeText={value => {
          }}
          containerStyle={{
            marginBottom: windowWidth(1),
            marginTop: windowWidth(1),
          }}
        />
      </TouchableOpacity>

      {showDeliveryTimeModal && <DeliveryTimePicker showDeliveryTimeModal={showDeliveryTimeModal} setShowDeliveryTimeModal={setShowDeliveryTimeModal} />}

    </View>
  );
}
