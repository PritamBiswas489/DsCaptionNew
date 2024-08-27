//export {default as SplashScreen} from './SplashScreen';

import React, {useEffect, useRef, useState} from 'react';
import {Alert, Animated, Easing, View} from 'react-native';
import {splashLogo2} from '@utils/images';
import appColors from '@theme/appColors';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/types';
import {getValue, setValue} from '@utils/localstorage';
import {useTranslation} from 'react-i18next';
import {useValues} from '../../../App';
import {getServiceMenCredentials} from '@utils/functions';
import Spinner from 'react-native-loading-spinner-overlay';
import { getAuthUserService } from '@src/services/auth.service';
import { serviceProviderAccountDataActions } from '@src/store/redux/service-provider-account-data.redux';
import { useDispatch } from 'react-redux';
import { getProviderConfig } from '@src/services/settings.service';
import { configAppActions } from '@src/store/redux/config-redux';

type navigation = NativeStackNavigationProp<RootStackParamList>;

const SplashScreen = () => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const images = [splashLogo2, splashLogo2];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState(appColors.darkText);
  const animations = new Animated.Value(0);
  const data = [appColors.darkText, appColors.primary, appColors.darkText];
  const {replace} = useNavigation<navigation>();
  const {i18n} = useTranslation();
  const {setCurrSymbol, setCurrValue, setIsServiceManLogin, setIsDark} =
    useValues();

  const [checkingLoader,setCheckingLoader] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    getLanguageCode();
    getTheme();
    checkServiceMenCredential();
    getSelectedCurrency();
  }, []);

  const getTheme = async () => {
    getValue('darkTheme')
      .then(res => {
        if (res !== null) {
          return JSON.parse(res);
        } else {
          return false;
        }
      })
      .then(val => {
        setIsDark(val);
        setValue('darkTheme', val.toString());
      });
  };

  const getLanguageCode = async () => {
    const languageCode = await getValue('languageCode');

    if (languageCode !== null) {
      i18n.changeLanguage(languageCode);
      setValue('languageCode', languageCode);
    }
  };

  const checkServiceMenCredential = async () => {
    const hasServiceMenCredentials = await getServiceMenCredentials();
    if (hasServiceMenCredentials) {
      setIsServiceManLogin(true);
    }
  };

  const getSelectedCurrency = async () => {
    const currencyVal = await getValue('currencyVal');
    const currencySymbol = await getValue('currencySymbol');

    if (currencyVal !== null && currencySymbol !== null) {
      setCurrSymbol(currencySymbol);
      setCurrValue(parseFloat(currencyVal));
    }
  };

  var opacities = [];
  const zoomIn = () => {
    return Animated.timing(scaleValue, {
      toValue: 0.1,
      duration: 1500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    });
  };

  const zoomOut = () => {
    return Animated.timing(scaleValue, {
      toValue: 0.4,
      duration: 1500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    });
  };

  const interpolatedValue = scaleValue.interpolate({
    inputRange: [0.5, 0.5],
    outputRange: ['50deg', '0deg'],
  });

  const checkuser = async () =>{
    setCheckingLoader(true)
    const responseProviderConfig = await getProviderConfig();
    if(responseProviderConfig?.data?.content?.base_url){
        dispatch(configAppActions.setData(responseProviderConfig?.data?.content))
    }else{
        Alert.alert('Unable to load app.restart the app')
        setCheckingLoader(false)
        return
    }

    const response = await getAuthUserService()
    if(response?.data?.response_code === 'default_200' && response?.data?.content?.id){
       dispatch(serviceProviderAccountDataActions.setData(response?.data?.content))
       replace('BottomTab');
    } else{
       replace('IntroSlider');
    }
    setCheckingLoader(false)
  }

  const animate = () => {
    setTimeout(() => {
      setBackgroundColor(appColors.darkText);
      setCurrentIndex(0);
      setTimeout(() => {
        zoomIn().start(() => {
          zoomOut().start(() => {
           // replace('IntroSlider');
           //Alert.alert('Can Checking Here which page to redirect')
           
           checkuser()
          });
        });
      }, 10);
    }, 10);
  };
  useEffect(() => {
    data.map((item, index) => {
      opacities.push(
        animations.interpolate({
          inputRange: [index, index + 1],
          outputRange: [1, 0],
        }),
      );
    });

    animate();
  }, [1000]);

  let transformArray = [{scale: scaleValue}];

  if (currentIndex === 1) {
    transformArray.push({rotate: interpolatedValue});
  }

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <Animated.Image
        source={images[currentIndex]}
        style={[
          styles.image,
          {
            transform: transformArray,
          },
        ]}
        resizeMode={'contain'}
      />
      <Spinner
            visible={checkingLoader}
            textContent={''}
            
            indicatorStyle={styles.spinnerStyle}
            textStyle={{ color: '#FFF' }}
          />
    </View>
  );
}
export default SplashScreen;

