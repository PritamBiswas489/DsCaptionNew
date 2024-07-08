import React from 'react';
import {View, FlatList} from 'react-native';
import {dashBoardData} from './data/data';
import GridItem from './gridItem';
import {styles} from '../dashBoard/gridItem/styles';

export const DashBoard = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={dashBoardData}
        renderItem={({index, item}) => <GridItem item={item} />}
        numColumns={2}
      />
    </View>
  );
};
