import {View, Image, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {GlobalStyle} from '@style/styles';
import {windowHeight, windowWidth} from '@theme/appConstant';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {gallery, camera} from '@utils/images';
import {useValues} from '../../../../../../../App';
import appColors from '@theme/appColors';

export default function ImageOptions() {
  const [selectedImage, setSelectedImage] = useState('');
  const [image, setImage] = useState('');
  const {isDark,t} = useValues();
  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        const source: string | undefined =
          response.assets && response.assets.length > 0
            ? response.assets[0].uri
            : '';
        if (source) {
          setSelectedImage(source);
        }
      }
    });
  };

  const handleCameraLaunch = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        // Process the captured image
        let imageUri: string | undefined =
          response.assets && response.assets.length > 0
            ? response.assets?.[0]?.uri
            : '';
        imageUri && setImage(imageUri);
      }
    });
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDark ? appColors.darkTheme : appColors.boxBg},
      ]}>
      <View style={styles.innerContainer}>
        {selectedImage ? (
          <>
            <Image
              source={{uri: selectedImage}}
              style={[
                styles.image,
                {
                  height: windowHeight(5),
                  width: windowHeight(5),
                  borderRadius: windowHeight(3),
                },
              ]}
            />
          </>
        ) : (
          <>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.imageView,
                {
                  backgroundColor: isDark
                    ? appColors.darkCard
                    : appColors.white,
                  borderColor: isDark ? appColors.darkBorder : appColors.border,
                },
              ]}
              onPress={() => openImagePicker()}>
              <Image source={gallery} style={styles.image} />
            </TouchableOpacity>
          </>
        )}
        <Text
          style={[
            styles.name,
            {color: isDark ? appColors.white : appColors.darkText},
          ]}>
          {t('profileSetting.chooseGallery')}
        </Text>
      </View>
      <View
        style={[
          GlobalStyle.horizontalLine,
          {marginBottom: windowWidth(4)},
        ]}></View>
      <View style={styles.innerContainer}>
        {image ? (
          <>
            <Image
              source={{uri: image}}
              style={[
                styles.image,
                {
                  height: windowHeight(5),
                  width: windowHeight(5),
                  borderRadius: windowHeight(3),
                },
              ]}
            />
          </>
        ) : (
          <>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.imageView,
                {
                  backgroundColor: isDark
                    ? appColors.darkCard
                    : appColors.white,
                  borderColor: isDark ? appColors.darkBorder : appColors.border,
                },
              ]}
              onPress={() => handleCameraLaunch()}>
              <Image source={camera} style={styles.image} />
            </TouchableOpacity>
          </>
        )}
        <Text
          style={[
            styles.name,
            {color: isDark ? appColors.white : appColors.darkText},
          ]}>
          {t('profileSetting.openCamera')}
        </Text>
      </View>
    </View>
  );
}
