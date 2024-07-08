import React, {useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {RootStackParamList} from 'src/navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import PhoneTextInput from '@otherComponent/auth/phoneTextInput';
import GradientBtn from '@commonComponents/gradientBtn';
import HeaderComponent from '@otherComponent/auth/header';
import TextInputComponent from '@otherComponent/auth/textInput';
import {windowWidth} from '@theme/appConstant';
import AuthBg from '@otherComponent/auth/authBg';
import {useValues} from '../../../../App';
import appColors from '@theme/appColors';
import OptionalModal from '@otherComponent/auth/optionalModal';

type forgotPswProps = NativeStackNavigationProp<RootStackParamList>;

const ForgotPassword=()=> {
  const {navigate} = useNavigation<forgotPswProps>();
  const [errors, setErrors] = useState({phoneNo: ''});
  const [form, setForm] = useState({phoneNo: ''});
  const {isDark, t} = useValues();
  const [selectOptionModal, setOptionModal] = useState<boolean>(false);

  const onChange = ({name, value}: {name: string; value: string}) => {
    setForm({...form, [name]: value});
    if (value !== '') {
      setErrors(prev => {
        return {...prev, [name]: null};
      });
    }
  };

  const onOtpClick = () => {
    if (!form.phoneNo) {
      setErrors(prev => {
        return {...prev, phoneNo: t('error.phoneNo')};
      });
    } else {
      navigate('VerifyOtp');
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDark ? appColors.darkText : appColors.background},
      ]}>
      <AuthBg
        authContent={
          <View style={styles.paddingBottom}>
            <HeaderComponent
              showBack={true}
              authTitle={'auth.forgotPassword'}
              content={'auth.forgetPasswordContent'}
            />

            <PhoneTextInput
              phoneContent={
                <>
                  <TextInputComponent
                    textContainerStyle={{width: windowWidth(45)}}
                    placeholder={t('auth.phoneNumber')}
                    keyboardType="number-pad"
                    value={form.phoneNo}
                    onChangeText={value => {
                      onChange({name: 'phoneNo', value});
                    }}
                    error={errors.phoneNo}
                  />
                </>
              }
            />
            <View style={styles.blankView}></View>
            <GradientBtn
              accountText="introSlider.anAccount"
              authText="introSlider.signUp"
              label="auth.sendOtp"
              onPress={onOtpClick}
              gotoScreen={() => setOptionModal(true)}
            />
          </View>
        }
      />
      <OptionalModal
        visible={selectOptionModal}
        onClose={() => setOptionModal(false)}
        providerLogin={true}
        setOptionModal={setOptionModal}
      />
    </View>
  );
}

export default ForgotPassword;
