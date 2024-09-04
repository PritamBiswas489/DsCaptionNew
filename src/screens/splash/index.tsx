//export {default as SplashScreen} from './SplashScreen';

import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Easing, View, Text } from 'react-native';
import { splashLogo2 } from '@utils/images';
import appColors from '@theme/appColors';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/navigation/types';
import { getValue, setValue } from '@utils/localstorage';
import { useTranslation } from 'react-i18next';
import { useValues } from '../../../App';
import { getServiceMenCredentials } from '@utils/functions';
import Spinner from 'react-native-loading-spinner-overlay';
import { getAuthUserService } from '@src/services/auth.service';
import { serviceProviderAccountDataActions } from '@src/store/redux/service-provider-account-data.redux';
import { serviceProviderBookingReviewActions } from '@src/store/redux/service-provider-booking-review-redux';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';
import { getProviderConfig, getPagesContent } from '@src/services/settings.service';
import { configAppActions } from '@src/store/redux/config-redux';
import { contentPagesActions } from '@src/store/redux/content-pages-redux';
import { serviceProviderPomotionalCostActions } from '@src/store/redux/service-provider-pomotional-cost-redux';
import { loadMySubscriptionFunc } from '@src/services/load.mysubscription';
import { homeDataActions } from '@src/store/redux/home-data-redux';
type navigation = NativeStackNavigationProp<RootStackParamList>;

const SplashScreen = () => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const images = [splashLogo2, splashLogo2];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState(appColors.darkText);
  const animations = new Animated.Value(0);
  const data = [appColors.darkText, appColors.primary, appColors.darkText];
  const { replace } = useNavigation<navigation>();
  const { i18n } = useTranslation();
  const { setCurrSymbol, setCurrValue, setIsServiceManLogin, setIsDark, isDark, t } =
    useValues();

  const [checkingLoader, setCheckingLoader] = useState(false);
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

  const {
   
    loadSubsScriptionList
  } = useSelector((state: RootState) => state['homeData'])

  const interpolatedValue = scaleValue.interpolate({
    inputRange: [0.5, 0.5],
    outputRange: ['50deg', '0deg'],
  });

  const loadmySubscriptionData = async () => {
    await loadMySubscriptionFunc(dispatch, '?limit=200&offset=1')
    dispatch(homeDataActions.setData({field:'loadSubsScriptionList',data:false}))
  }
  const checkuser = async () => {
    setCheckingLoader(true)
    const responseProviderConfig = await getProviderConfig();
    if (responseProviderConfig?.data?.content?.base_url) {
      dispatch(configAppActions.setData(responseProviderConfig?.data?.content))
    } else {
      Alert.alert('Unable to load app.restart the app')
      setCheckingLoader(false)
      return
    }

    const contentConfig = await getPagesContent()

    if (contentConfig?.data?.content) {
      // console.log("================ hello =======================")

      Object.keys(contentConfig?.data?.content).forEach((key: string) => {
        // console.log(contentConfig?.data?.content[key]?.value)
        if (key === 'about_us') {
          dispatch(contentPagesActions.setData({ 'field': 'about_us', data: contentConfig?.data?.content[key]?.value }))
        }
        if (key === 'terms_and_conditions') {
          dispatch(contentPagesActions.setData({ 'field': 'terms_and_conditions', data: contentConfig?.data?.content[key]?.value }))
        }
        if (key === 'refund_policy') {
          dispatch(contentPagesActions.setData({ 'field': 'refund_policy', data: contentConfig?.data?.content[key]?.value }))
        }
        if (key === 'return_policy') {
          dispatch(contentPagesActions.setData({ 'field': 'return_policy', data: contentConfig?.data?.content[key]?.value }))
        }
        if (key === 'cancellation_policy') {
          dispatch(contentPagesActions.setData({ 'field': 'cancellation_policy', data: contentConfig?.data?.content[key]?.value }))
        }
        if (key === 'privacy_policy') {
          dispatch(contentPagesActions.setData({ 'field': 'privacy_policy', data: contentConfig?.data?.content[key]?.value }))
        }
      })

    }
    
    

    const response = await getAuthUserService()
    if (response?.data?.response_code === 'default_200' && response?.data?.content?.provider_info?.id) {
      dispatch(serviceProviderAccountDataActions.setData(response?.data?.content?.provider_info))
      dispatch(serviceProviderBookingReviewActions.setData(response?.data?.content?.booking_overview))
      dispatch(serviceProviderPomotionalCostActions.setData(response?.data?.content?.promotional_cost_percentage))
      if (loadSubsScriptionList) {
        await loadmySubscriptionData()
      }
      replace('BottomTab');
    } else {
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

  let transformArray = [{ scale: scaleValue }];

  if (currentIndex === 1) {
    //@ts-ignore
    transformArray.push({ rotate: interpolatedValue });
  }

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
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
      <Text style={{
        color: isDark ? appColors.white : appColors.darkText, 
        fontSize:24, 
        fontWeight:'bold'
        }}>{t('newDeveloper.ServiceProviderApp')}</Text>
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

