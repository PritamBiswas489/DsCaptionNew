import {View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {Camera} from '@utils/icons';
import {ImageLibraryOptions} from 'react-native-image-picker';
import {handleImagePicker} from '@utils/functions';
import { useValues } from '../../../../../../App';
import appColors from '@theme/appColors';
export default function ProfileSection() {
  const [image, setImage] = useState<string | null>('');
  const {isDark} = useValues()
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
    <>
      <View style={styles.container}></View>
      <View style={styles.mainView}>
        <View style={[styles.mainContainer,{backgroundColor: isDark ? appColors.darkText : appColors.white}]}>
          {image ? (
            <TouchableOpacity onPress={openImage} activeOpacity={0.9}>
              <Image source={{uri: image}} style={styles.imageStyle} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity activeOpacity={0.9} onPress={openImage}>
              <Camera />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}
