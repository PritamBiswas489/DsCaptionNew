import React from 'react';
import {View} from 'react-native';
import AuthBg from '@otherComponent/auth/authBg';
import HeaderComponent from '@otherComponent/auth/header';
import OTPTextInput from 'react-native-otp-textinput';
import GradientBtn from '@commonComponents/gradientBtn';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/types';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {styles} from './styles';
import {useValues} from '../../../../App';
import appColors from '@theme/appColors';

type otpProps = NativeStackNavigationProp<RootStackParamList>;
type otpRouteProps = RouteProp<RootStackParamList, 'VerifyOtp'>;

const VerifyOtp=()=> {
  const inputCount = 6;
  const {navigate} = useNavigation<otpProps>();
  const {params} = useRoute<otpRouteProps>();
  const {isDark,t} = useValues();

  const onOtpClick = () => {
    if (params?.screen) {
    } else {
      navigate('ResetPassword');
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
              authTitle={'auth.verifyOtp'}
              content={'auth.verificationCode'}
            />
            <View style={styles.margin}>
              <OTPTextInput
                inputCount={inputCount}
                textInputStyle={{
                  color: isDark ? appColors.white : appColors.darkText,
                  ...styles.otpTextInput,

                  backgroundColor: isDark
                    ? appColors.darkText
                    : appColors.textInput,
                }}
              />
            </View>
            <View style={styles.blankView}></View>
            <GradientBtn
              label={t('auth.verifySignIn')}
              onPress={onOtpClick}
              authText={'auth.resendCode'}
              gotoScreen={() => {}}
            />
          </View>
        }
      />
    </View>
  );
}
export default VerifyOtp;
