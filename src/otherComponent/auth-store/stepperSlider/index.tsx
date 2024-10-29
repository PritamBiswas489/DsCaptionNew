import React, {useEffect, useState} from 'react';
import {View, Text, Animated, Alert} from 'react-native';
import {styles} from './styles';
import ProgressBar from './progressBar';
import {progressIndicatorProps} from '../header/types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/types';
import CompanyDetails from '@screens/auth-store/provider/register/companyDetails';
import ProviderDetails from '@screens/auth-store/provider/register/providerDetails';
import {getValue} from '@utils/localstorage';
import {  useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';
import {useValues} from '../../../../App';
import { storeRegisterFieldActions } from '@src/store/redux/store/register-field-redux';
import { storeRegisterFieldErrorActions } from '@src/store/redux/store/register-error-redux';
 
 

export function ProgressStepsSlider({
  data,
  currentStep,
  handlePrevStep,
  stepCount,
  setCurrentStep,
  progress,
  processRegistration
}: progressIndicatorProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isFreelancerLogin, setIsFreelancerLogin] = useState<boolean>();

  const dispatch = useDispatch()
 
  const {t} = useValues()
  useEffect(() => {
    checkFreelancerLogin();
  }, []);

  const checkFreelancerLogin = async () => {
    const freelancerLogin = await getValue('freelancerLogin');
    freelancerLogin && setIsFreelancerLogin(true);
  };
  //logo
  const logo = useSelector((state: RootState)=>state['storeRegisterField'].logo) 
  const set_error_logo = (value:string)=>{
    dispatch(storeRegisterFieldErrorActions.setData({
      field: 'logo',
      data: value,
     }))  
  }
  //cover photo
  const cover_photo = useSelector((state: RootState)=>state['storeRegisterField'].cover_photo) 
  const set_error_cover_photo = (value:string)=>{
    dispatch(storeRegisterFieldErrorActions.setData({
      field: 'cover_photo',
      data: value,
     }))  
  }

  //name
  const name = useSelector((state: RootState)=>state['storeRegisterField'].name) 
  const set_error_name = (value:string)=>{
    dispatch(storeRegisterFieldErrorActions.setData({
      field: 'name',
      data: value,
     }))  
  }
  //email
  const email = useSelector((state: RootState)=>state['storeRegisterField'].email) 
  const set_error_email = (value:string)=>{
    dispatch(storeRegisterFieldErrorActions.setData({
      field: 'email',
      data: value,
     }))  
  }
  //phone
  const phone_dial_code = useSelector((state: RootState)=>state['storeRegisterField'].phone_dial_code)
  const phone =  useSelector((state: RootState)=>state['storeRegisterField'].phone) 
  const set_error_phone = (value:string)=>{
      dispatch(storeRegisterFieldErrorActions.setData({
        field: 'phone',
        data: value,
      }))
  }
  //delivery time
  const minimum_delivery_time = useSelector((state: RootState)=>state['storeRegisterField'].minimum_delivery_time)
  const maximum_delivery_time = useSelector((state: RootState)=>state['storeRegisterField'].maximum_delivery_time)
  const delivery_time_type = useSelector((state: RootState)=>state['storeRegisterField'].delivery_time_type)
  const set_error_delivery_time = (value:string)=>{
    dispatch(storeRegisterFieldErrorActions.setData({
      field: 'delivery_time',
      data: value,
    }))
  }
  //password
  const password = useSelector((state: RootState)=>state['storeRegisterField'].password)
  const set_error_password = (value:string)=>{
    dispatch(storeRegisterFieldErrorActions.setData({
      field: 'password',
      data: value,
    }))
  }

  //module id

  const module_id = useSelector((state: RootState)=>state['storeRegisterField'].module_id)
  const set_error_module_id = (value:string)=>{
    dispatch(storeRegisterFieldErrorActions.setData({
      field: 'module_id',
      data: value,
    }))
  }

  //tax
  const tax = useSelector((state: RootState)=>state['storeRegisterField'].tax)
  //set error tax
  const set_error_tax = (value:string)=>{
    dispatch(storeRegisterFieldErrorActions.setData({
      field: 'tax',
      data: value,
    }))
  }
  //Store name
  const store_name = useSelector((state: RootState)=>state['storeRegisterField'].store_name)
  //set error store name
  const set_error_store_name = (value:string)=>{
    dispatch(storeRegisterFieldErrorActions.setData({
      field: 'store_name',
      data: value,
    }))
  }

  
   
  
  
   

 

 
   

 

 

 

 
  

  
   

  

   

   

   

  const handleNextStep = () => {
    const phoneRegex = /^(\+1|1)?\s*\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (currentStep <= stepCount) {
      if(currentStep === 1){
         
          setCurrentStep(currentStep + 1);
          Animated.timing(progress, {
            toValue: currentStep / stepCount,
            duration: 200,
            useNativeDriver: false,
          }).start();
      
    } else if (currentStep === stepCount) {
         console.log({currentStep,stepCount})
          Alert.alert("Last step to finish")
 
      }

       
    }
  };

  const renderProgressIndicator = () => {
    const indicators = [];
    for (let i = 1; i <= stepCount; i++) {
      const isCurrentStep = i <= currentStep;
      const indicatorStyle = isCurrentStep
        ? [styles.indicator, styles.currentIndicator]
        : styles.indicator;
      indicators.push(
        <View key={i} style={indicatorStyle}>
          <Text style={styles.indicatorText}>{i}</Text>
        </View>,
      );
    }
    return indicators;
  };
  const renderScreen = () => {
    switch (currentStep) {
      case 1:
        return <CompanyDetails /> ; //Company details
      case 2:
        return <ProviderDetails />; //Store Login Details
      default:
        return null;
    }
    
  };
  return (
    <ProgressBar
      handleNextStep={handleNextStep}
      renderProgressIndicator={renderProgressIndicator}
      renderScreen={renderScreen}
      currentStep={currentStep}
      handlePrevStep= {handlePrevStep}
      stepCount={stepCount}
    />
    
    
  );
}
