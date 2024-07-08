import {Alert, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import UploadContainerView from '@otherComponent/auth/uploadContainer';
import TextInputComponent from '@otherComponent/auth/textInput';
import {Company, Experience} from '@utils/icons';
import PhoneTextInput from '@otherComponent/auth/phoneTextInput';
import {windowHeight, windowWidth} from '@theme/appConstant';
import {Notes, Email, Location} from '@utils/icons';
import {experienceData} from '../data/data';
import {ImageLibraryOptions} from 'react-native-image-picker';
import {handleImagePicker} from '@utils/functions';
import {DropdownWithIcon} from '@commonComponents/dropdownWithIcon';
import {GlobalStyle} from '@style/styles';
import {dropDownType} from './types';
import {useValues} from '../../../../../../../App';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';
import { registerFieldActions } from '@src/store/redux/register-field-redux';
export default function InputField() {
  const dispatch = useDispatch()
  const company = useSelector((state: RootState)=>state['registerProviderField'].company_name)
  const setCompany = (value:string)=>{
     dispatch(registerFieldActions.setData({
      field: 'company_name',
      data: value,
     }))
  }

  const email = useSelector((state: RootState)=>state['registerProviderField'].company_email)
  const setEmail = (value:string)=>{
     dispatch(registerFieldActions.setData({
      field: 'company_email',
      data: value,
     }))
  }
  
  const phoneCountryCode = useSelector((state: RootState)=>state['registerProviderField'].company_phone_country)
  const setPhoneCountryCode = (value:string)=>{
    dispatch(registerFieldActions.setData({
      field: 'company_phone_country',
      data: value,
    }))
 }

 const phoneCountryDialCode = useSelector((state: RootState)=>state['registerProviderField'].company_phone_dial_code)
 const  setPhoneCountryDialCode = (value:string)=>{
    dispatch(registerFieldActions.setData({
      field: 'company_phone_dial_code',
      data: value,
    }))
 }

 const phoneNo = useSelector((state: RootState)=>state['registerProviderField'].company_phone)
 const  setPhoneNo = (value:string)=>{
    dispatch(registerFieldActions.setData({
      field: 'company_phone',
      data: value,
    }))
}



   
   
  
  const {t} = useValues();
  const [image, setImage] = useState<string | null>('');

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

  return (

    
    <View style={styles.container}>



     {/* Company/Individual Name */}
     <TextInputComponent
        placeholder={t('newDeveloper.CompanyIndividualName')}
        Icon={<Company />}
        value={company}
        onChangeText={value => {
          setCompany(value);
        }}
        containerStyle={{marginBottom: windowHeight(1)}}
      />

     <PhoneTextInput
        phoneCountryCode= {phoneCountryCode}
        setPhoneCountryCode = {setPhoneCountryCode}
        phoneDialCode={phoneCountryDialCode}
        setPhoneDialCode={setPhoneCountryDialCode}
        phoneContent={
          <>
            <TextInputComponent
              containerStyle={{marginTop: windowWidth(3)}}
              textContainerStyle={{width: windowWidth(45)}}
              placeholder={t('auth.phoneNumber')}
              keyboardType="number-pad"
              value={phoneNo}
              onChangeText={value => {
                setPhoneNo(value);
              }}
            />
          </>
        }
      />
   <TouchableOpacity onPress={()=>Alert.alert('Open Select')}>
    <TextInputComponent
        placeholder={t('newDeveloper.AddYourAddress')}
        Icon={<Location />}
        value={''}
        editable={false}
        onFocus={()=>Alert.alert('Open Select')}
        onChangeText={value => {
           
        }}
        containerStyle={{
          marginBottom: windowWidth(1),
          marginTop: windowWidth(1),
        }}
        
      />
      </TouchableOpacity>

     <TextInputComponent
        placeholder={t('auth.companyMail')}
        Icon={<Email />}
        value={email}
        onChangeText={value => {
          setEmail(value);
        }}
        containerStyle={{
          marginBottom: windowWidth(1),
          marginTop: windowWidth(1),
        }}
      />




      <UploadContainerView
        title={'auth.uploadLogo'}
        onPress={() => openImage()}
        image={image}
        setImage={setImage}
      />

      
      
     

       
    </View>
  );
}
