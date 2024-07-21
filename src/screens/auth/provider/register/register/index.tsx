import { View, Animated, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GlobalStyle } from '@style/styles';
import AuthBg from '@otherComponent/auth/authBg';
import HeaderComponent from '@otherComponent/auth/header';
import { ProgressStepsSlider } from '@otherComponent/auth/stepperSlider';
import appColors from '@theme/appColors';
import { useValues } from '../../../../../../App';
import { styles } from './styles';
import { getValue } from '@utils/localstorage';
import { RootStackParamList } from 'src/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getZoneList } from '@src/services/settings.service';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';
import { zoneDataActions } from '@src/store/redux/zone-list-redux';
import Spinner from 'react-native-loading-spinner-overlay';

interface Response {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

const Register = ({ route }: any) => {
  const dispatch = useDispatch()
  const [locationData, setLocationData] = useState();
  const [currentStep, setCurrentStep] = useState(1);
  const progress = useState(new Animated.Value(0))[0];
  const [isFreelancerLogin, setIsFreelancerLogin] = useState<boolean>();
  const [isSkeletonLoaderView, setSkeletionLoaderView] = useState<boolean>(true);

  const {zones} = useSelector((state: RootState)=>state['zoneList'])
  let zoneList = []; 
  if(zones!=''){
    zoneList = JSON.parse(zones)
  }
  const [isZoneLoaded,setZoneLoaded] = useState<boolean>(zoneList && false);

   
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

   useEffect(()=>{
     if(isZoneLoaded){
        setSkeletionLoaderView(false)
     }
   },[isZoneLoaded])

   useEffect(()=>{
   
      const getzones = async()=>{
        const response:Response = await getZoneList();
        //console.log("================ called ended ==========================")
        setZoneLoaded(true);
        if(response?.data?.content?.data){
          
          dispatch(zoneDataActions.setData({
            field: 'zones',
            data: JSON.stringify(response?.data?.content?.data),
           }))
        }
      }
      if(!isZoneLoaded){
        //console.log("================ called ==========================")
        getzones()
      }
     
   },[isZoneLoaded ])

    

  useEffect(() => {
    checkFreelancerLogin();
  }, []);

  const checkFreelancerLogin = async () => {
    const freelancerLogin = await getValue('freelancerLogin');
    freelancerLogin && setIsFreelancerLogin(true);
  };

  const stepCount = isFreelancerLogin ? 2 : 3;
  const { isDark } = useValues();
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      Animated.timing(progress, {
        toValue: (currentStep - 2) / stepCount,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }else{
      navigation.goBack();
    }
    //navigation.goBack();
  };
  const handleInitalStep = ()=>{
    navigation.goBack();
  }
  useEffect(() => {
    if (route?.params?.data) {
      setLocationData(route?.params?.data);
    }
  });


  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        GlobalStyle.mainView,
        {
          backgroundColor: isDark ? appColors.darkTheme : appColors.white,
        },
      ]}
      contentContainerStyle={styles.contentContainerStyle}>
      <View
        style={[
          styles.innerContainer,
          {
            backgroundColor: isDark ? appColors.darkCardBg : appColors.white,
            borderColor: isDark ? appColors.darkBorder : appColors.border,
          },
        ]}>
         

        
          <>
            <AuthBg
              containerStyle={{ borderWidth: 0 }}
              authContent={
                <View>
                  <HeaderComponent
                    showBack={true}
                    authTitle={'auth.register'}
                    content={'auth.registerContent'}
                    gotoScreen={() => handlePrevStep()}
                    containerStyle={styles.containerStyle}
                  />
                </View>
              }
            />
            <ProgressStepsSlider
              data={locationData}
              currentStep={currentStep}
              handlePrevStep={() => handlePrevStep()}
              stepCount={stepCount}
              setCurrentStep={setCurrentStep}
              progress={progress}
            />
          </> 
          <Spinner
            visible={isSkeletonLoaderView}
            textContent={'Loading.....'}
            textStyle={{ color: '#FFF' }}
          />

      </View>
    </ScrollView>

  );
}
export default Register;
