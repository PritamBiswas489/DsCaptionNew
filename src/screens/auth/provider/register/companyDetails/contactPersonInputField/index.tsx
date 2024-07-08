import {View, Text} from 'react-native';
import React, {useState,useEffect} from 'react';
import {styles} from './styles';
import UploadContainerView from '@otherComponent/auth/uploadContainer';
import TextInputComponent from '@otherComponent/auth/textInput';
import {Company, Experience} from '@utils/icons';
import PhoneTextInput from '@otherComponent/auth/phoneTextInput';
import {windowHeight, windowWidth} from '@theme/appConstant';
import {Notes, Email} from '@utils/icons';
import {experienceData} from '../data/data';
import {ImageLibraryOptions} from 'react-native-image-picker';
import {handleImagePicker} from '@utils/functions';
import {DropdownWithIcon} from '@commonComponents/dropdownWithIcon';
import {GlobalStyle} from '@style/styles';
import {dropDownType} from './types';
import {useValues} from '../../../../../../../App';
import { CheckBox } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';
import { registerFieldActions } from '@src/store/redux/register-field-redux';


export default function ContactPersonInputField() {
  const dispatch = useDispatch()
  const company = useSelector((state: RootState)=>state['registerProviderField'].contact_person_name)
  const setCompany = (value:string)=>{
     dispatch(registerFieldActions.setData({
      field: 'contact_person_name',
      data: value,
     }))
  }

  const email = useSelector((state: RootState)=>state['registerProviderField'].contact_person_email)
  const setEmail = (value:string)=>{
     dispatch(registerFieldActions.setData({
      field: 'contact_person_email',
      data: value,
     }))
  }
  
  const phoneCountryCode = useSelector((state: RootState)=>state['registerProviderField'].contact_person_country)
  const setPhoneCountryCode = (value:string)=>{
    dispatch(registerFieldActions.setData({
      field: 'contact_person_country',
      data: value,
    }))
 }

 const phoneCountryDialCode = useSelector((state: RootState)=>state['registerProviderField'].contact_person_dial_code)
 const  setPhoneCountryDialCode = (value:string)=>{
    dispatch(registerFieldActions.setData({
      field: 'contact_person_dial_code',
      data: value,
    }))
 }

 const phoneNo = useSelector((state: RootState)=>state['registerProviderField'].contact_person_phone)
 const  setPhoneNo = (value:string)=>{
    dispatch(registerFieldActions.setData({
      field: 'contact_person_phone',
      data: value,
    }))
}
  const {t} = useValues(); 
  const [sameAsGeneralInfo, setSameAsGeneralInfo] = useState(false);

  const genInfoCompanyName =  useSelector((state: RootState)=>state['registerProviderField'].company_name)
  const genInfoCompanyEmail =  useSelector((state: RootState)=>state['registerProviderField'].company_email)
  const genInfoCompanyPhoneCountry = useSelector((state: RootState)=>state['registerProviderField'].company_phone_country)
  const genInfoCompanyPhonedialCode = useSelector((state: RootState)=>state['registerProviderField'].company_phone_dial_code)
  const genInfoCompanyPhone = useSelector((state: RootState)=>state['registerProviderField'].company_phone)

  useEffect(()=>{
    if(sameAsGeneralInfo){
      setCompany(genInfoCompanyName)
      setEmail(genInfoCompanyEmail)
      setPhoneCountryCode(genInfoCompanyPhoneCountry)
      setPhoneCountryDialCode(genInfoCompanyPhonedialCode)
      setPhoneNo(genInfoCompanyPhone)
    }
  },[sameAsGeneralInfo])

   
  return (
    

    
    <View style={styles.container}>
      <View style={styles.checboxStyle}>
      <CheckBox
        title={t('newDeveloper.SameAsGeneralInfo')}
        checked={sameAsGeneralInfo}
        onPress={() => setSameAsGeneralInfo(!sameAsGeneralInfo)}
      />
    </View>
     {/* Company/Individual Name */}
     <TextInputComponent
        placeholder={t('newDeveloper.ContactPersonName')} 
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




     

      
      
     

      
    </View>
  );
}
