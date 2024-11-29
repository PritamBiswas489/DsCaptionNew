import { Alert, ScrollView, View } from 'react-native';
import React, { useState, useEffect, useReducer } from 'react';
import { GlobalStyle } from '@style/styles';
import Header from '@commonComponents/header';
import SliderContainer from '@otherComponent/sliderContainer';
import AddNewImageSection from './addNewImage';
import { windowHeight, windowWidth } from '@theme/appConstant';
import InputView from './inputView';
import StatusSection from './statusSection';
import GradientBtn from '@commonComponents/gradientBtn';
import { useValues } from '../../../../../App';
import appColors from '@theme/appColors';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';
import { CategoriesInterface } from '@src/interfaces/categoriesInterface';
import { serviceCategoriesDataActions } from '@src/store/redux/service-category-redux';
import { getCategories } from '@src/services/services-service';
import SkeletonLoader from '@src/commonComponents/SkeletonLoader';
import { addServiceSubCategory } from '@src/services/services-service';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';
import { uploadBanner } from '@src/services/store/banner.service';

interface Response {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}
interface State {
  bannerTitle: string;
  errorBannerTitle: string;
  bannerUrl: string;
  errorBannerUrl: string;
  bannerImage: string;
  bannerImageError: string;
}
//initial state
const initialState:State = {
  bannerTitle: '',
  errorBannerTitle: '',
  bannerUrl: '',
  errorBannerUrl: '',
  bannerImage: '',
  bannerImageError: ''
}

type Action =
  | { type: 'SET__BANNER__TITLE'; payload: typeof initialState.bannerTitle }
  | { type: 'SET__ERROR__BANNER__TITLE'; payload: typeof initialState.errorBannerTitle }
  | { type: 'SET__BANNER__URL'; payload: typeof initialState.bannerUrl }
  | { type: 'SET__ERROR__BANNER__URL'; payload: typeof initialState.errorBannerUrl }
  | { type: 'SET__BANNER__IMAGE'; payload: typeof initialState.bannerImage }
  | { type: 'SET__BANNER__IMAGE__ERROR'; payload: typeof initialState.bannerImageError }
  | { type: 'RESET_ERRORS' }
  | { type: 'RESET_ALL' };


function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET__BANNER__TITLE':
      return { ...state, bannerTitle: action.payload };
    case 'SET__ERROR__BANNER__TITLE':
      return { ...state, errorBannerTitle: action.payload };
    case 'SET__BANNER__URL':
      return { ...state, bannerUrl: action.payload };
    case 'SET__ERROR__BANNER__URL':
      return { ...state, errorBannerUrl: action.payload };
    case 'SET__BANNER__IMAGE':
      return { ...state, bannerImage: action.payload };
    case 'SET__BANNER__IMAGE__ERROR':
      return { ...state, bannerImageError: action.payload };

    case 'RESET_ERRORS':
      return {
        ...state,
        errorBannerTitle: '',
        errorBannerUrl: '',
        bannerImageError: '',
      };
    case 'RESET_ALL':
      return initialState;
    default:
      return state;
  }
}


//Add new banner
export function VendorAddNewBanner() {

  const [FORM_STATE, FORM_DISPATCH] = useReducer(reducer, initialState);


  const { isDark, t } = useValues();
  const dispatch = useDispatch()
  const [processingLoader, setProcessingLoader] = useState(false)

  const VALIDATE_FORM = (): boolean => {
    let valid = true;

    FORM_DISPATCH({ type: 'RESET_ERRORS' });


    if (FORM_STATE.bannerTitle.trim() === '') {
      FORM_DISPATCH({ type: 'SET__ERROR__BANNER__TITLE', payload: t('newDeveloper.Required') });
      valid = false;
    }

    if (FORM_STATE.bannerImage === '') {
      FORM_DISPATCH({ type: 'SET__BANNER__IMAGE__ERROR', payload: t('newDeveloper.Required') });
      valid = false;
    }


    return valid

  }


  //handle   create a banner
  const handleCreateBanner = async () => {
    if (VALIDATE_FORM()) {
      const formData = new FormData()
      formData.append('title', FORM_STATE.bannerTitle)
      formData.append('default_link', FORM_STATE.bannerUrl)
      formData.append('image', {
        uri: FORM_STATE.bannerImage,
        name: 'banner.jpg',
        type: 'image/jpeg',
      });

      setProcessingLoader(true)
      const response: Response = await uploadBanner(formData)
      if (response?.data?.message) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response?.data?.message,
        });
        FORM_DISPATCH({ type: 'RESET_ALL' })

      } else if (response?.data?.errors) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response?.data?.errors?.[0]?.message,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: "Process failed",
        });
      }
      setProcessingLoader(false)
    }
  }

  return (
    <>

      <ScrollView
        contentContainerStyle={{ paddingBottom: windowHeight(3) }}
        showsVerticalScrollIndicator={false}
        style={[
          GlobalStyle.mainView,
          { backgroundColor: isDark ? appColors.darkCard : appColors.white },
        ]}>
        <Header showBackArrow={true} title={'newDeveloper.AddNewBanner'} />

        <View
          style={[
            GlobalStyle.horizontalLine,
            {
              marginTop: windowHeight(3),
              marginHorizontal: 20,
              borderColor: isDark ? appColors.darkBorder : appColors.border,
            },
          ]}
        />
        <InputView
          bannerTitle={FORM_STATE.bannerTitle}
          setBannerTitle={(value) => {
            FORM_DISPATCH({ type: 'SET__BANNER__TITLE', payload: value })
            FORM_DISPATCH({ type: 'SET__ERROR__BANNER__TITLE', payload: '' })
          }}
          errorBannerTitle={FORM_STATE.errorBannerTitle}
          bannerUrl={FORM_STATE.bannerUrl}
          setBannerUrl={(value) => {
            FORM_DISPATCH({ type: 'SET__BANNER__URL', payload: value })
            FORM_DISPATCH({ type: 'SET__ERROR__BANNER__URL', payload: '' })
          }}
          errorBannerUrl={FORM_STATE.errorBannerUrl}
          bannerImage={FORM_STATE.bannerImage}
          setBannerImage={(value) => {
            FORM_DISPATCH({ type: 'SET__BANNER__IMAGE', payload: value })
            FORM_DISPATCH({ type: 'SET__BANNER__IMAGE__ERROR', payload: '' })
          }}
          bannerImageError={FORM_STATE.bannerImageError}
        />
        <GradientBtn
          label="newDeveloper.AddBanner"
          onPress={handleCreateBanner}
          additionalStyle={{
            marginHorizontal: windowWidth(5),
            marginTop: windowHeight(3),
          }}
        />
        <Spinner
          visible={processingLoader}
          textContent={'Processing.....'}
          textStyle={{ color: '#FFF' }}
        />
      </ScrollView>

    </>
  );
}
