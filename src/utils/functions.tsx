import {useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import {clearValue, getValue} from './localstorage';
import {
  launchImageLibrary,
  ImagePickerResponse,
  ImageLibraryOptions,
} from 'react-native-image-picker';

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

type ImagePickerCallback = (imageUri: string) => void;

export const handleImagePicker = (
  options: ImageLibraryOptions,
  callback: ImagePickerCallback,
) => {
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
        callback(source);
      }
    }
  });
};

export const getServiceMenCredentials = async () => {
  try {
    const servicemenEmail = await getValue('servicemenEmail');
    const servicemenPassword = await getValue('servicemenPassword');
    return servicemenEmail && servicemenPassword ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const clearServiceMenCredential = async () => {
  try {
    await clearValue('servicemenEmail');
    await clearValue('servicemenPassword');
    await clearValue('freelancerLogin');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
