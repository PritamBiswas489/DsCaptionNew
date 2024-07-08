import { Alert, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import UploadContainerView from '@otherComponent/auth/uploadContainer';
import TextInputComponent from '@otherComponent/auth/textInput';
import { Company, Experience } from '@utils/icons';
import PhoneTextInput from '@otherComponent/auth/phoneTextInput';
import { windowHeight, windowWidth } from '@theme/appConstant';
import { Notes, Email, Location } from '@utils/icons';
import { experienceData } from '../data/data';
import { ImageLibraryOptions } from 'react-native-image-picker';
import { handleImagePicker } from '@utils/functions';
import { DropdownWithIcon } from '@commonComponents/dropdownWithIcon';
import { GlobalStyle } from '@style/styles';
import { dropDownType } from './types';
import { useValues } from '../../../../../../../App';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';
import { registerFieldActions } from '@src/store/redux/register-field-redux';
import SelectionDropdown from '@src/otherComponent/selectionDropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface DataItem {
  label: string;
  value: string;
}

const data: DataItem[] = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];


export default function InputField() {
  const dispatch = useDispatch()

  const { t } = useValues();
  const [image, setImage] = useState<string | null>('');

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
      <SelectionDropdown
        data={data}
        label={t('newDeveloper.SelectZone')}
        value={''}
        setValue={() => { }}
      />

      <SelectionDropdown
        data={data}
        label={t('newDeveloper.IndentityDocumentType')}
        value={''}
        setValue={() => { }}
      />

      <TextInputComponent
        placeholder={t('newDeveloper.IndentityNumber')}
        Icon={<AntDesign
          style={{}}
          color={'black'}
          name="Safety"
          size={20}
        />}
        value={''}
        onChangeText={value => {

        }}
        containerStyle={{
          marginBottom: windowWidth(1),
          marginTop: windowWidth(1),
        }}
      />

      <UploadContainerView
        title={'auth.uploadLogo'}
        onPress={() => openImage()}
        image={image}
        setImage={setImage}
      />
    </View>
  );
}
