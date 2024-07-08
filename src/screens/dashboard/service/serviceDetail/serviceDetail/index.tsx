import {View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Delete, Edit} from '@utils/icons';
import {GlobalStyle} from '@style/styles';
import Header from '@commonComponents/header';
import appColors from '@theme/appColors';
import SliderContainer from '@otherComponent/sliderContainer';
import {sliderData} from '../data/data';
import {styles} from './styles';
import HeadingRow from '@commonComponents/headingRow';
import {ReviewDetail} from '@otherComponent/index';
import {windowWidth} from '@theme/appConstant';
import ServiceArea from '@otherComponent/home/serviceArea';
import AddressList from '../../locationList/addressList';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/types';
import {useValues} from '../../../../../../App';
import {Detail} from './detail';

type ReviewRouteProps = NativeStackNavigationProp<RootStackParamList>;

export function ServiceDetail() {
  const [address, setAddress] = useState<number[]>([]);
  const {navigate} = useNavigation<ReviewRouteProps>();
  const {isDark} = useValues();
  return (
    <View
      style={[
        GlobalStyle.mainView,
        {backgroundColor: isDark ? appColors.darkTheme : appColors.white},
      ]}>
      <Header
        showBackArrow={true}
        title={'serviceDetail.title'}
        trailIcon={
          <Edit color={isDark ? appColors.white : appColors.darkText} />
        }
        gotoScreen={() => {}}
        trailIcon1={<Delete color={appColors.error} />}
        trail1IconContainer={{backgroundColor: '#FAE8E8'}}
      />
      <ScrollView
        style={[
          GlobalStyle.mainView,
          {backgroundColor: isDark ? appColors.darkTheme : appColors.white},
        ]}
        showsVerticalScrollIndicator={false}>
        <SliderContainer data={sliderData} />
        <View
          style={[
            styles.mainContainer,
            {
              borderBottomColor: isDark
                ? appColors.darkBorder
                : appColors.border,
              backgroundColor: isDark ? appColors.darkText : appColors.boxBg,
              borderBottomWidth: isDark ? 0.1 : 1,
            },
          ]}>
          <View
            style={[styles.innerContainer, {borderWidth: isDark ? 0.1 : 1.4}]}>
            <Detail />
            <View
              style={[
                GlobalStyle.horizontalLine,
                {
                  marginTop: 0,
                  borderColor: isDark ? appColors.darkBorder : appColors.border,
                },
              ]}
            />
            <ServiceArea setAddress={setAddress} />
            {address.length > 0 && (
              <AddressList
                containerStyle={{marginHorizontal: 0, marginTop: 0}}
                selectedAddress={address}
              />
            )}
            <HeadingRow
              rowStyle={{marginTop: windowWidth(4), marginHorizontal: 0}}
              title={'reviews.reviews'}
              content={'reviews.seeAll'}
              gotoScreen={() => navigate('Reviews')}
            />
            <ReviewDetail />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
