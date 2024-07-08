import {View, FlatList} from 'react-native';
import React, {useRef} from 'react';
import {subCategoryData} from './data/data';
import {styles} from './styles';
import {categoryType} from './data/types';
import RenderItem from './renderItem';

export default function SubCategory({
  selectedCategory,
  setCategory,
}: categoryType) {
  const flatListRef = useRef<FlatList>(null);

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({index, animated: true});
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        contentContainerStyle={styles.mainContainer}
        data={subCategoryData}
        renderItem={({index, item}) => {
          return (
            <RenderItem
              selectedCategory={selectedCategory}
              setCategory={setCategory}
              item={item}
              index={index}
              scrollIndex={scrollToIndex(index)}
            />
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
