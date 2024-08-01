import {View, Text, Alert } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import React, {useState} from 'react';
import {GlobalStyle} from '@style/styles';
import HeaderView from '@otherComponent/headerWithSearch';
import {styles} from './styles';
import {filterData, serviceMenListData} from './data';
import {ActiveServiceMen} from '@screens/dashboard/home';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/types';
import {useValues} from '../../../../../App';
import appColors from '@theme/appColors';
import {windowWidth} from '@theme/appConstant';
import {DropdownWithIcon} from '@commonComponents/dropdownWithIcon';
import {filterType} from './data/types';
import { getSericeMenList } from '@src/services/profile.service';

type props = NativeStackNavigationProp<RootStackParamList>;

export function ServiceMenList() {
  const [experience, setExperience] = useState<filterType | null>();
  const {navigate} = useNavigation<props>();
  const {isDark,t} = useValues();
  //navigate('AddNewServiceMen')
 

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        GlobalStyle.mainView,
        {backgroundColor: isDark ? appColors.darkCard : appColors.white},
      ]}
      contentContainerStyle={styles.contentContainerStyle}>
      <HeaderView
        title="servicemen.servicemenList"
        gotoScreen={async () => navigate('AddNewServiceMen')}
      />
      <View style={styles.blankView} />
      <ActiveServiceMen data={serviceMenListData} />
    </ScrollView>
  );
}
