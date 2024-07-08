import {View} from 'react-native';
import React, {useState} from 'react';
import {Person, Email, Identity, Password} from '@utils/icons';
import {windowHeight, windowWidth} from '@theme/appConstant';
import TextInputComponent from '@otherComponent/auth/textInput';
import PhoneTextInput from '@otherComponent/auth/phoneTextInput';
import appColors from '@theme/appColors';
import {InputType} from '@otherComponent/auth/textInput/types';
import MultiSelectionDrodpwn from '@otherComponent/multiSelectionDropdown';
import {IdentityData} from './data/data';
import UploadContainerView from '@otherComponent/auth/uploadContainer';
import {ImageLibraryOptions} from 'react-native-image-picker';
import {handleImagePicker} from '@utils/functions';
import {DropdownWithIcon} from '@commonComponents/dropdownWithIcon';
import {DropdownItem} from './data/types';
import {useValues} from '../../../../../../../App';
export default function InputView() {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phoneNo, setPhone] = useState(' ');
  const [identityNumber, setIdentityNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectIdentity, setSelectIdentity] = useState<
    DropdownItem | undefined
  >();
  const [image, setImage] = useState<string | null>('');
  const {t} = useValues();
  const openImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    handleImagePicker(options, (imageUri: string) => {
      setImage(imageUri);
    });
  };

  return (
    <View>
      <TextInputComponent
        placeholder={t('auth.enterName')}
        Icon={<Person />}
        value={name}
        onChangeText={value => {
          setName(value);
        }}
        containerStyle={{marginBottom: windowHeight(1)}}
      />
      <TextInputComponent
        placeholder={t('auth.enterMail')}
        Icon={<Email />}
        value={mail}
        onChangeText={value => {
          setMail(value);
        }}
        containerStyle={{marginBottom: windowHeight(1)}}
        keyboardType="email-address"
      />

      <PhoneTextInput
        phoneContent={
          <>
            <TextInputComponent
              textContainerStyle={{width: windowWidth(45)}}
              placeholder={t('auth.phoneNumber')}
              keyboardType="number-pad"
              value={phoneNo}
              onChangeText={value => {
                setPhone(value);
              }}
            />
          </>
        }
      />
      <MultiSelectionDrodpwn />
      <TextInputComponent
        placeholder={t('auth.identityNo')}
        Icon={<Identity />}
        value={identityNumber}
        onChangeText={value => {
          setIdentityNumber(value);
        }}
        containerStyle={{marginBottom: windowHeight(1)}}
        keyboardType={'number-pad'}
      />
      <DropdownWithIcon
        icon={<Identity />}
        label="auth.selectIdentity"
        data={IdentityData}
        onSelect={setSelectIdentity}
      />

      <UploadContainerView
        title={'auth.identityPhoto'}
        containerStyle={{
          marginTop: windowHeight(2),
        }}
        onPress={() => openImage()}
        image={image}
        setImage={setImage}
      />

      <TextInputComponent
        placeholder={t('introSlider.passwordPlaceholder')}
        Icon={<Password color={appColors.lightText} />}
        value={password}
        onChangeText={value => {
          setPassword(value);
        }}
        containerStyle={{marginBottom: windowHeight(1)}}
        inputType={InputType.PASSWORD}
      />

      <TextInputComponent
        placeholder={t('auth.reEnterPassword')}
        Icon={<Password color={appColors.lightText} />}
        value={confirmPassword}
        onChangeText={value => {
          setConfirmPassword(value);
        }}
        containerStyle={{marginBottom: windowHeight(1)}}
        inputType={InputType.PASSWORD}
      />
    </View>
  );
}
