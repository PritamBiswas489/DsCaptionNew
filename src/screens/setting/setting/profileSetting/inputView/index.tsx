import {View} from 'react-native';
import React, {useState} from 'react';
import {windowHeight} from '@theme/appConstant';
import InputContainer from '../inputContainer';
import GradientBtn from '@commonComponents/gradientBtn';

export default function InputView({
  setModalVisible,
}: {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [userName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setNumber] = useState('');

  return (
    <View style={{marginTop: windowHeight(1)}}>
      <InputContainer
        userName={userName}
        setName={setName}
        email={email}
        setEmail={setEmail}
        phoneNumber={phoneNumber}
        setNumber={setNumber}
      />
      <View style={{height:windowHeight(20)}}/>
      <GradientBtn
        additionalStyle={{}}
        label={'profileSetting.updateProfile'}
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
}
