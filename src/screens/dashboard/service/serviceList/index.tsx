import {Text, ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '@style/styles';
import Header from '@commonComponents/header';
import {Plus, Search} from '@utils/icons';
import {styles} from './styles';
import HomeCategory from '@otherComponent/home/homeCategory';
import appColors from '@theme/appColors';
import SubCategory from '@otherComponent/home/subCategory';
import {PopularService} from '@screens/dashboard/home';
import {serviceListData} from './data/data';
import {useValues} from '../../../../../App';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'src/navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type routeProps = NativeStackNavigationProp<RootStackParamList>;

export function ServiceList() {
  const [category, setCategory] = useState(0);
  const [popularService, setPopularService] = useState(serviceListData);
  const {isDark,t} = useValues();
  const [showSearchBar, setSearchBar] = useState<boolean>();
  const {navigate} = useNavigation<routeProps>();
  return (
    <ScrollView
      style={[
        GlobalStyle.mainView,
        {backgroundColor: isDark ? appColors.darkCard : appColors.white},
      ]}>
      <Header
        title={'serviceList.title'}
        trailIcon={
          <Search color={isDark ? appColors.white : appColors.lightText} />
        }
        trailIcon1={
          <Plus color={isDark ? appColors.white : appColors.darkText} />
        }
        onTrailIcon={() => navigate('AddNewService')}
        showBackArrow={true}
        gotoScreen={() => setSearchBar(!showSearchBar)}
        showSearchBar={showSearchBar}
        searchContainerStyle={styles.searchContainer}
        content={
          <View style={styles.contentView}>
            <Text
              style={[
                styles.titleStyle,
                {color: isDark ? appColors.white : appColors.darkText},
              ]}>
              {t('serviceList.categories')}
            </Text>
            <HomeCategory />
          </View>
        }
      />
      <SubCategory selectedCategory={category} setCategory={setCategory} />
      <View style={styles.blankView} />
      <PopularService
        data={popularService}
        setData={setPopularService}
        providerImageStyle={styles.providerImageStyle}
        itemSeparator={styles.itemSeparator}
      />
    </ScrollView>
  );
}
