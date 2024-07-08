import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {GlobalStyle} from '@style/styles';
import Header from '@commonComponents/header';
import RatingSection from './ratingSection';
import {ReviewDetail} from '@otherComponent/index';
import {allReviews} from './data';
import {windowHeight} from '@theme/appConstant';
import { useValues } from '../../../../../../App';
import appColors from '@theme/appColors';

export function Reviews() {
  const {isDark} = useValues()
  return (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      style={[GlobalStyle.mainView,{backgroundColor : isDark ? appColors.darkCard : appColors.white}]}
      showsVerticalScrollIndicator={false}>
      <Header title="reviews.reviews" showBackArrow={true} />
      <RatingSection />
      <View style={styles.container}>
        <ReviewDetail data={allReviews} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowHeight(2),
  },
  mainContainer: {
    paddingBottom: windowHeight(4),
  },
});
