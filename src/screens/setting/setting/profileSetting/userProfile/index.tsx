import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {customer3} from '@utils/images';
import {Edit} from '@utils/icons';
import appColors from '@theme/appColors';

export default function UserProfile({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={customer3} style={styles.image} />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setShowModal(true)}
          style={styles.iconView}>
          <Edit color={appColors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
