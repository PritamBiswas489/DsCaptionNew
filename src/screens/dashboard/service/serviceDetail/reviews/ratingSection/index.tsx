import React, {useState} from 'react';
import {View, Text} from 'react-native';
import CircularProgress from '../CircularProgress';
import {styles} from './styles';
import {GlobalStyle} from '@style/styles';
import {ratingData} from './data';
import {useValues} from '../../../../../../../App';
import appColors from '@theme/appColors';
import {DropdownWithIcon} from '@commonComponents/dropdownWithIcon';
import {dropDownType} from './data/types';
import {windowHeight, windowWidth} from '@theme/appConstant';

const RatingSection=()=> {
  const [ratings, setRatings] = useState<dropDownType | undefined>();
  const {isDark,t} = useValues();
  return (
    <View>
       <View style={styles.ratingContainer}>
        <Text style={styles.rating}>4.5 /5</Text>
        <Text
          style={[
            styles.ratingText,
            {color: isDark ? appColors.white : appColors.darkText},
          ]}>
          {t('reviews.averageRating')}
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <CircularProgress />
        <View style={styles.row}>
          <Text
            style={[
              GlobalStyle.title,
              GlobalStyle.mainContainer,
              {color: isDark ? appColors.white : appColors.darkText},
            ]}>
            {t('reviews.reviews')}
          </Text>
          <View>
            <DropdownWithIcon
              data={ratingData}
              label={'reviews.lowestRate'}
              onSelect={setRatings}
              dropdownStyle={styles.dropdown}
              overlayStyle={GlobalStyle.overlayStyle}
              iconStyle={GlobalStyle.iconStyle}
              dropdownOptionStyle={[
                GlobalStyle.dropdownOptionStyle,
                {width: windowWidth(40)},
              ]}
            />
          </View>
        </View>
        <View style={styles.blankView}></View>
      </View> 
    </View>
  );
} 

export default RatingSection;
