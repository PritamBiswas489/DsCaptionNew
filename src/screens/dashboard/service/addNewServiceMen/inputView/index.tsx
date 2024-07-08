import {View} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import TextInputComponent from '@otherComponent/auth/textInput';
import {
  Email,
  Experience,
  Identity,
  Location,
  Notes,
  Password,
  Person,
} from '@utils/icons';
import {windowHeight, windowWidth} from '@theme/appConstant';
import PhoneTextInput from '@otherComponent/auth/phoneTextInput';
import {IdentityData, experienceData} from './data';
import UploadContainerView from '@otherComponent/auth/uploadContainer';
import MultiSelectionDrodpwn from '@otherComponent/multiSelectionDropdown';
import {InputType} from '@otherComponent/auth/textInput/types';
import appColors from '@theme/appColors';
import {ImageLibraryOptions} from 'react-native-image-picker';
import {handleImagePicker} from '@utils/functions';
import {GlobalStyle} from '@style/styles';
import {DropdownItem} from './data/types';
import {DropdownWithIcon} from '@commonComponents/dropdownWithIcon';
import {useValues} from '../../../../../../App';
export default function InputView() {
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [selectIdentity, setSelectIdentity] = useState<
    DropdownItem | undefined
  >();
  const [identityNo, setIdentityNo] = useState('');
  const [experience, setExperience] = useState('');
  const [experienceYear, setExperienceYear] = useState<
    DropdownItem | undefined
  >();
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState<string | null>('');
  const [address, setAddress] = useState('');
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
    <View style={styles.container}>
      <TextInputComponent
        placeholder={t('auth.enterName')}
        Icon={<Person />}
        value={name}
        onChangeText={value => {
          setName(value);
        }}
        containerStyle={{marginTop: 0}}
      />
      <PhoneTextInput
        countyContainer={styles.countyContainer}
        phoneContent={
          <>
            <TextInputComponent
              textContainerStyle={{width: windowWidth(45)}}
              placeholder={t('auth.phoneNumber')}
              keyboardType="number-pad"
              value={phoneNo}
              onChangeText={value => {
                setPhoneNo(value);
              }}
            />
          </>
        }
      />
      <TextInputComponent
        placeholder={t('auth.email')}
        Icon={<Email />}
        value={email}
        onChangeText={value => {
          setEmail(value);
        }}
        containerStyle={{marginTop: 0}}
        keyboardType={'email-address'}
      />

      <DropdownWithIcon
        icon={<Identity />}
        label="Select sub category"
        data={IdentityData}
        onSelect={setSelectIdentity}
      />

      <TextInputComponent
        placeholder={t('auth.identityNo')}
        Icon={<Identity />}
        value={identityNo}
        onChangeText={value => {
          setIdentityNo(value);
        }}
        keyboardType={'number-pad'}
      />
      <UploadContainerView
        title={'auth.identityPhoto'}
        containerStyle={{
          marginTop: windowWidth(3),
          marginBottom: windowWidth(3),
        }}
        onPress={() => openImage()}
        image={image}
        setImage={setImage}
      />
      <MultiSelectionDrodpwn />
      <View style={styles.row}>
        <TextInputComponent
          inputStyle={styles.containerView}
          placeholder={t('servicemen.addExperience')}
          Icon={<Experience />}
          value={experience}
          onChangeText={value => {
            setExperience(value);
          }}
          textContainerStyle={styles.textContainerStyle}
          containerStyle={{marginTop: windowWidth(2)}}
        />
        <DropdownWithIcon
          data={experienceData}
          label={'auth.month'}
          onSelect={setExperienceYear}
          dropdownStyle={GlobalStyle.dropdown}
          overlayStyle={GlobalStyle.overlayStyle}
          iconStyle={GlobalStyle.iconStyle}
          dropdownOptionStyle={GlobalStyle.dropdownOptionStyle}
        />
      </View>
      <TextInputComponent
        Icon={<Location />}
        onChangeText={value => {
          setAddress(value);
        }}
        placeholder={t('servicemen.selectAddress')}
        value={address}
      />

      <TextInputComponent
        inputType={InputType.PASSWORD}
        placeholder={t('introSlider.passwordPlaceholder')}
        Icon={<Password color={appColors.lightText} />}
        onChangeText={value => {
          setPassword(value);
        }}
        value={password}
        inputStyle={styles.passwordInput}
      />

      <TextInputComponent
        placeholder={t('auth.details')}
        Icon={<Notes />}
        value={description}
        onChangeText={value => {
          setDescription(value);
        }}
        containerStyle={{marginBottom: windowHeight(0)}}
        multiline={true}
        inputStyle={styles.inputStyle}
      />
      <TextInputComponent
        inputType={InputType.PASSWORD}
        placeholder={t('introSlider.passwordPlaceholder')}
        Icon={<Password color={appColors.lightText} />}
        onChangeText={value => {
          setPassword(value);
        }}
        value={password}
        inputStyle={styles.passwordInput}
      />
    </View>
  );
}
