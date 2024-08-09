import {View, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {subCategoryData} from './data/data';
import {styles} from './styles';
import {categoryType} from './data/types';
import RenderItem from './renderItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';

export default function SubCategory({}) {
  const flatListRef = useRef<FlatList>(null);
  const [onLoad,SetOnload] = useState(false);

  
  const [selectedCategory,setCategory]  = useState('')

  const {
     
    selected:ServiceSubCategories
  } = useSelector((state: RootState) => state['serviceSubCategories'])

  console.log("============ selected ==============")
  console.log(ServiceSubCategories)

  useEffect(()=>{
    SetOnload(true)
  },[ServiceSubCategories])
 
  return (
    <View>
      <FlatList
        ref={flatListRef}
        contentContainerStyle={styles.mainContainer}
        data={ServiceSubCategories.subcategories}
        renderItem={({index, item}) => {
          return (
            <RenderItem
              selectedCategory={selectedCategory}
              setCategory={setCategory}
              item={item}
              index={index}
              flatListRef={flatListRef}
            />
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
