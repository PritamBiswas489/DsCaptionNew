import {Alert, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {GlobalStyle} from '@style/styles';
import CustomDropDown from './dropDown';
import {langues} from './data/data';
import IntroData from './introData';
import ContentData from './contentData';
import {styles} from './styles';
import OptionalModal from '@otherComponent/auth/optionalModal';
import {useValues} from '../../../../App';
import appColors from '@theme/appColors';
import {getValue, setValue} from '@utils/localstorage';
import {useTranslation} from 'react-i18next';
import Spinner from 'react-native-loading-spinner-overlay';
import { getAuthUserService } from '@src/services/auth.service';
import { serviceProviderAccountDataActions } from '@src/store/redux/service-provider-account-data.redux';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {RootStackParamList} from 'src/navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type navigationProps = NativeStackNavigationProp<RootStackParamList>;
const IntroSlider=()=> {
  const [selectOptionModal, setOptionModal] = useState(false);
  const {isDark} = useValues();
  const {i18n} = useTranslation();
  const [authProcessLoader,setProcessLoader] = useState(true);
  const [spinnerloader,setSpinnerLoader] = useState(true);
  const {navigate} = useNavigation<navigationProps>();
  const dispatch = useDispatch()

  useEffect(() => {
    getLanguageCode();
  }, []);

  useEffect(()=>{
    if(!authProcessLoader){
      setSpinnerLoader(false)
    }
  },[authProcessLoader])

  useEffect(()=>{
   const checkuser = async () =>{
     const response = await getAuthUserService()
     if(response?.data?.response_code === 'default_200' && response?.data?.content?.id){
        dispatch(serviceProviderAccountDataActions.setData(response?.data?.content))
        navigate('BottomTab');
     } 
     setProcessLoader(false)
   }
   checkuser()
  },[])

  

  const getLanguageCode = async () => {
    const languageCode = await getValue('languageCode');
    if (languageCode !== null) {
      i18n.changeLanguage(languageCode);
      setValue('languageCode', languageCode);
    }
  };

  return (
    <View
      style={[
        GlobalStyle.mainView,
        {backgroundColor: isDark ? appColors.darkText : appColors.white},
      ]}>
      <View
        style={[
          styles.container,
          {backgroundColor: isDark ? appColors.darkText : appColors.boxBg},
        ]}>
        <IntroData />
        <View style={styles.innerContainer}></View>
        <CustomDropDown countryData={langues} />
      </View>
      <ContentData setOptionModal={setOptionModal} />
      <OptionalModal
        visible={selectOptionModal}
        setOptionModal={setOptionModal}
        onClose={() => setOptionModal(false)}
      />

         <Spinner
            visible={spinnerloader}
            textContent={'Processing.....'}
            textStyle={{ color: '#FFF' }}
          />
    </View>
  );
}
export default IntroSlider;
