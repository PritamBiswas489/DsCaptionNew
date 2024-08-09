import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import HeadingRow from '@commonComponents/headingRow';
import { PopularService } from '../../popularService';
import { ActiveServiceMen } from '../../activeServicemen';
import { popularService as initialPopularService } from '../../popularService/data/data';
import { RootStackParamList } from 'src/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useValues } from '../../../../../../App';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';
import { serviceMenType } from '../../activeServicemen/data/types';

type navigationProp = NativeStackNavigationProp<RootStackParamList>;

export function ProviderLogin() {
  const [popularService, setPopularService] = useState(initialPopularService);
  const { navigate } = useNavigation<navigationProp>();
  const { isFreelancerLogin } = useValues();
  const [activeServiceMenList,setActiveServiceMenList] = useState<serviceMenType[]>()
  
  const {
    data: ServiceMenList,
  } = useSelector((state: RootState) => state['serviceMenDataField'])

  useEffect(()=>{
     if(ServiceMenList.length > 0){
        setActiveServiceMenList(ServiceMenList.slice(0,4))
     }
  },[ServiceMenList])

  useEffect(()=>{
  },[activeServiceMenList])

  return (
    <View>
      <HeadingRow
        gotoScreen={() => navigate('ServiceList')}
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
            rowStyle={{ marginTop: 0 }}
            title={'home.activeServiceMen'}
            content={'home.viewAll'}
            gotoScreen={() => navigate('ServiceMenList')}
          />
         {activeServiceMenList && <ActiveServiceMen data={activeServiceMenList} />} 
        </>
      )}
    </View>
  );
}
