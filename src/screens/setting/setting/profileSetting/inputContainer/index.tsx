import {View} from 'react-native';
import React from 'react';
import TextInputComponent from '@otherComponent/auth/textInput';
import {Email, Person} from '@utils/icons';
import appColors from '@theme/appColors';
import PhoneTextInput from '@otherComponent/auth/phoneTextInput';
import {windowWidth} from '@theme/appConstant';
import {useValues} from '../../../../../../App';
interface textInputProps {
  userName: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber: string;
  setNumber: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputContainer({
  userName,
  setName,
  email,
  setEmail,
  phoneNumber,
  setNumber,
}: textInputProps) {
  const {t} = useValues();
  return (
    <View>
      <TextInputComponent
        placeholder={t('auth.useName')}
        Icon={<Person color={appColors.lightText} />}
        value={userName}
        onChangeText={value => {
          setName(value);
        }}
      />
      <TextInputComponent
        containerStyle={{marginBottom: windowWidth(2)}}
        keyboardType="email-address"
        placeholder={t('auth.email')}
        Icon={<Email color={appColors.lightText} />}
        value={email}
        onChangeText={value => {
          setEmail(value);
        }}
      />
      <PhoneTextInput
        phoneContent={
          <>
            <TextInputComponent
              containerStyle={{marginTop: windowWidth(3)}}
              textContainerStyle={{
                width: windowWidth(45),
              }}
              placeholder={t('auth.phoneNumber')}
              keyboardType="number-pad"
              value={phoneNumber}
              onChangeText={value => {
                setNumber(value);
              }}
            />
          </>
        }
      />
    </View>
  );
}
