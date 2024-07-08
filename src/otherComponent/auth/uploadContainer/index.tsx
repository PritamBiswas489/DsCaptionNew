import {
  View,
  TouchableOpacity,
  Image,
  Text,
  GestureResponderEvent,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {upload, uploadImage, darkUploadImage} from '@utils/images';
import {ImageLibraryOptions} from 'react-native-image-picker';
import {handleImagePicker} from '@utils/functions';
import {propsType} from './types';
import {useValues} from '../../../../App';

export default function UploadContainerView({
  title,
  containerStyle,
  onPress,
  image,
  setImage,
}: propsType) {
  const {isDark,t} = useValues();

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
      {image ? (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={openImage}
          style={styles.imageContainer}>
          <Image source={{uri: image}} style={styles.imageStyle} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPress as unknown as (event: GestureResponderEvent) => void}
          style={[styles.container, containerStyle]}>
          <ImageBackground
            resizeMode={'stretch'}
            source={isDark ? darkUploadImage : uploadImage}
            style={styles.imageView}>
            <View style={styles.textView}>
              <Image source={upload} style={styles.image} />
              <Text style={styles.text}>{t(title)}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )}
    </>
  );
}
