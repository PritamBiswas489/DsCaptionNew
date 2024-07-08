import {View, Text} from 'react-native';
import React, {useState} from 'react';
import HeadingRow from '@commonComponents/headingRow';
import {PopularService} from '../../popularService';
import {ActiveServiceMen} from '../../activeServicemen';
import {popularService as initialPopularService} from '../../popularService/data/data';
import {RootStackParamList} from 'src/navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useValues} from '../../../../../../App';

type navigationProp = NativeStackNavigationProp<RootStackParamList>;

export function ProviderLogin() {
  const [popularService, setPopularService] = useState(initialPopularService);
  const {navigate} = useNavigation<navigationProp>();
  const {isFreelancerLogin} = useValues();
  return (
    <View>
      <HeadingRow
        gotoScreen={() => navigate('PopularServiceView')}
        title={'home.popularService'}
        content={'home.viewAll'}
      />
      <PopularService
        data={popularService}
        setData={setPopularService}
        isHorizontal={true}
      />

      {!isFreelancerLogin && (
        <>
          <HeadingRow
            rowStyle={{marginTop: 0}}
            title={'home.activeServiceMen'}
            content={'home.viewAll'}
            gotoScreen={() => navigate('ServiceMenList')}
          />
          <ActiveServiceMen />
        </>
      )}
    </View>
  );
}
