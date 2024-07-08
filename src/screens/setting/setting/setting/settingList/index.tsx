import {View, FlatList} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {settingData, serviceMenSettingData} from './data/data';
import RenderItem from './renderItem';
import {useValues} from '../../../../../../App';

export function SettingList({setModalVisible}: {setModalVisible: any}) {
  const {isServiceManLogin} = useValues();
  return (
    <View style={[styles.container]}>
      <FlatList
        data={isServiceManLogin ? serviceMenSettingData : settingData}
        renderItem={({item}) => (
          <RenderItem setModalVisible={setModalVisible} item={item} />
        )}
      />
    </View>
  );
}
