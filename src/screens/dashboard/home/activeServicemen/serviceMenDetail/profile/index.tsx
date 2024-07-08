import {View, Image, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {person} from '@utils/images';
import {GlobalStyle} from '@style/styles';
import {Verify, Star, StarIcon, Location} from '@utils/icons';
import {ExperienceDetail} from '@otherComponent/home';
import {windowWidth} from '@theme/appConstant';
import {useValues} from '../../../../../../../App';
import appColors from '@theme/appColors';
export default function Profile() {
  const {t, isDark} = useValues();
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.innerContainer,
          {backgroundColor: isDark ? appColors.darkCard : appColors.ratingBg},
        ]}
      />
      <View style={styles.profileContainer}>
        <Image source={person} style={styles.personImg} />
        <View style={[styles.row, {bottom: 20}]}>
          <Text
            style={[
              GlobalStyle.title,
              {color: isDark ? appColors.white : appColors.darkText},
            ]}>
            {t('providerDetail.username')}
          </Text>
          <View style={styles.iconContainer}>
            <Verify />
          </View>
        </View>
        <View style={[styles.row, {marginTop: 6, bottom: 12}]}>
          <Star width={'18'} />
          <Star width={'18'} />
          <Star width={'18'} />
          <Star width={'18'} />
          <StarIcon />
          <Text
            style={[
              styles.review,
              {color: isDark ? appColors.white : appColors.darkText},
            ]}>
            {' '}
            3.8 {t('reviews.reviews')} (50){' '}
          </Text>
        </View>
        <View style={styles.row}>
          <Location />
          <Text style={styles.address}>{t('serviceManDetails.address')}</Text>
        </View>
      </View>
      <ExperienceDetail
        contentStyle={{width: windowWidth(90), marginTop: 8}}
        providerContent={'serviceManDetails.detail'}
      />
    </View>
  );
}
