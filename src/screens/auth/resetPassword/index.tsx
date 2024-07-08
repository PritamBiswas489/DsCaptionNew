import React, {useState} from 'react';
import {View} from 'react-native';
import AuthBg from '@otherComponent/auth/authBg';
import HeaderComponent from '@otherComponent/auth/header';
import TextInputComponent from '@otherComponent/auth/textInput';
import {Password} from '@assets/icons/auth/passwords';
import {InputType} from '@otherComponent/auth/textInput/types';
import appColors from '@theme/appColors';
import GradientBtn from '@commonComponents/gradientBtn';
import ModalComponent from '@commonComponents/modal';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/types';
import {styles} from './styles';
import {useValues} from '../../../../App';

type resetPswProps = NativeStackNavigationProp<RootStackParamList>;
const ResetPassword=()=> {
  const [modalVisible, setModalVisible] = useState(false);
  const [failedModal, setFailedModal] = useState(false);
  const {isDark,t} = useValues();
  const {navigate} = useNavigation<resetPswProps>();

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
  });
  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
  });

  const onChange = ({name, value}: {name: string; value: string}) => {
    setForm({...form, [name]: value});
    if (value !== '') {
      setErrors(prev => {
        return {...prev, [name]: null};
      });
    }
  };
  const resetPswCLick = () => {
    if (!form.password) {
      setErrors(prev => {
        return {...prev, password: t('error.password')};
      });
    } else if (form.password.length < 8) {
      setErrors(prev => {
        return {...prev, password: t('error.validPassword')};
      });
    }
    if (!form.confirmPassword) {
      setErrors(prev => {
        return {...prev, confirmPassword: t('error.confirmPassword')};
      });
    } else if (form.confirmPassword !== form.password) {
      setErrors(prev => {
        return {...prev, confirmPassword: t('error.validConfirmPassword')};
      });
    } else {
      setModalVisible(true);
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
              authTitle={'auth.resetPassword'}
              content={'auth.resetPasswordContent'}
            />
            <TextInputComponent
              inputType={InputType.PASSWORD}
              placeholder={t('introSlider.passwordPlaceholder')}
              Icon={
                <Password
                  color={
                    form.password
                      ? isDark
                        ? appColors.lightText
                        : appColors.darkText
                      : appColors.lightText
                  }
                />
              }
              onChangeText={value => {
                onChange({name: 'password', value});
              }}
              value={form.password}
              error={errors.password}
            />
            <TextInputComponent
              inputType={InputType.PASSWORD}
              placeholder={t('auth.reEnterNewPassword')}
              Icon={
                <Password
                  color={
                    form.password
                      ? isDark
                        ? appColors.lightText
                        : appColors.darkText
                      : appColors.lightText
                  }
                />
              }
              onChangeText={value => {
                onChange({name: 'confirmPassword', value});
              }}
              value={form.confirmPassword}
              error={errors.confirmPassword}
            />
            <View style={styles.marginTop}></View>
            <GradientBtn
              label="auth.resetPassword"
              onPress={resetPswCLick}
              gotoScreen={() => {}}
            />
          </View>
        }
      />

      {/* Reset Success modal */}
      <ModalComponent
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        success={true}
        title="auth.authSuccess"
        content="auth.successContent"
        btnTitle="auth.loginAgain"
        gotoScreen={() => {
          navigate('IntroSlider');
        }}
      />
      {/* Reset Failed modal */}
      <ModalComponent
        visible={failedModal}
        onClose={() => setFailedModal(false)}
        success={false}
        title="auth.authError"
        content="auth.errorContent"
        btnTitle="auth.tryAgain"
        gotoScreen={() => {
          navigate('IntroSlider');
        }}
      />
    </View>
  );
}
export default ResetPassword;
