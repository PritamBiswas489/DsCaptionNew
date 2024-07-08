import {View} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '@style/styles';
import Header from '@commonComponents/header';
import {Bank, Person, ServiceMen, Identity} from '@utils/icons';
import {styles} from './styles';
import TextInput from '@otherComponent/auth/textInput';
import GradientBtn from '@commonComponents/gradientBtn';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/types';
import {useNavigation} from '@react-navigation/native';
import {useValues} from '../../../../../App';
import appColors from '@theme/appColors';

export function BankDetails() {
  const [bankName, setBankName] = useState('');
  const [holderName, setHolderName] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [branchName, setBranchName] = useState('');
  const [IFsc, setIFsc] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const {isDark, t} = useValues();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View
      style={[
        GlobalStyle.mainView,
        {backgroundColor: isDark ? appColors.darkCard : appColors.white},
      ]}>
      <Header showBackArrow={true} title="bankDetails.bankDetail" />
      <View style={styles.container}>
        <TextInput
          placeholder={t('wallet.bankName')}
          containerStyle={styles.inputContainer}
          Icon={
            <Bank color={isDark ? appColors.lightText : appColors.darkText} />
          }
          value={bankName}
          onChangeText={value => {
            setBankName(value);
          }}
        />

        <TextInput
          placeholder={t('bankDetails.holderName')}
          containerStyle={styles.inputContainer}
          Icon={
            <Person color={isDark ? appColors.lightText : appColors.darkText} />
          }
          value={holderName}
          onChangeText={value => {
            setHolderName(value);
          }}
        />

        <TextInput
          placeholder={t('bankDetails.accountNo')}
          containerStyle={styles.inputContainer}
          Icon={
            <ServiceMen
              color={isDark ? appColors.lightText : appColors.darkText}
            />
          }
          value={accountNo}
          onChangeText={value => {
            setAccountNo(value);
          }}
        />

        <TextInput
          placeholder={t('bankDetails.branchName')}
          containerStyle={styles.inputContainer}
          Icon={
            <Bank color={isDark ? appColors.lightText : appColors.darkText} />
          }
          value={branchName}
          onChangeText={value => {
            setBranchName(value);
          }}
        />

        <TextInput
          placeholder={t('bankDetails.IFSCode')}
          containerStyle={styles.inputContainer}
          Icon={
            <Identity
              color={isDark ? appColors.lightText : appColors.darkText}
              strokeWidth={'1.5'}
            />
          }
          value={IFsc}
          onChangeText={value => {
            setIFsc(value);
          }}
        />

        <TextInput
          placeholder={t('bankDetails.swiftCode')}
          containerStyle={styles.inputContainer}
          Icon={
            <Identity
              color={isDark ? appColors.lightText : appColors.darkText}
              strokeWidth={'1.5'}
            />
          }
          value={swiftCode}
          onChangeText={value => {
            setSwiftCode(value);
          }}
        />
      </View>
      <View style={styles.blanView} />
      <GradientBtn label="common.submit" onPress={() => navigation.goBack()} />
    </View>
  );
}
