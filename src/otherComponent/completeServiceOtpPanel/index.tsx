import { View, StyleSheet, Alert,Text } from 'react-native';
import React from 'react';
import { GlobalStyle } from '@style/styles';
import CancelHeader from '@commonComponents/cancelHeader';
import { useValues } from '../../../App';
import appColors from '@theme/appColors';
import OTPTextInput from 'react-native-otp-textinput';
import { windowHeight, windowWidth } from '@src/theme/appConstant';
import GradientBtn from '@src/commonComponents/gradientBtn';

//Complete service otp panel
export default function CompleteServiceOtpPanel({
    setShowModal
}: {
    setShowModal: (value: boolean) => void
}) {
    const { t, isDark } = useValues()
    return (
        <View
            style={[
                GlobalStyle.modal,
                { backgroundColor: isDark ? appColors.darkCard : appColors.white },
            ]}>
            <CancelHeader
                gotoScreen={() => {
                    setShowModal(false);
                }}
                title={'newDeveloper.EnterOtpHere'}
            />

            <View style={styles.paddingBottom}>
                <View style={styles.margin}>
                    <OTPTextInput
                        inputCount={6}
                        textInputStyle={{
                            color: isDark ? appColors.white : appColors.darkText,
                            ...styles.otpTextInput,
                            backgroundColor: isDark
                                ? appColors.darkText
                                : appColors.textInput,
                        }}
                    />
                </View>
                 <Text style={{ color: isDark ? appColors.white : appColors.darkText, fontWeight:'bold' }}>{t('newDeveloper.CollectOtpFromCustomer')}</Text>
                <GradientBtn
                    label={t('newDeveloper.verifyOtp')}
                    onPress={() => { 
                        Alert.alert('Verify OTP')   
                        setShowModal(false);
                    }}
                    authText={'auth.resendCode'}
                    
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.background,
    },
    paddingBottom: {
        paddingBottom: windowHeight(2.6),
        
    },
    margin: {
        paddingHorizontal: windowWidth(4),
    },
    otpTextInput: {
        backgroundColor: appColors.textInput,
        borderRadius: windowWidth(2),
        borderBottomColor: appColors.white,
        borderBottomWidth: 0,
        width: windowWidth(13),
        right: windowWidth(2),
        height: windowHeight(6.3),
    },
    blankView: {
        height: windowHeight(11),
    },

})