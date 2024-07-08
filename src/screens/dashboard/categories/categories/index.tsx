import {View} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '@style/styles';
import Header from '@commonComponents/header';
import {GridIcon, Listviewicon, Search} from '@utils/icons';
import ItemsList from './itemsList';
import {useValues} from '../../../../../App';
import appColors from '@theme/appColors';
import {styles} from './styles';

export function Categories() {
  const [isGrid, setIsGrid] = useState(true);
  const {isDark} = useValues();
  const [showSearchBar, setSearchBar] = useState<boolean>();
  return (
    <View
      style={[
        GlobalStyle.mainView,
        {backgroundColor: isDark ? appColors.darkTheme : appColors.white},
      ]}>
      <Header
        showBackArrow={true}
        title={'serviceList.categories'}
        trailIcon1={
          isGrid ? (
            <Listviewicon
              color={isDark ? appColors.white : appColors.darkText}
            />
          ) : (
            <GridIcon color={isDark ? appColors.white : appColors.darkText} />
          )
        }
        onTrailIcon={() => {
          setIsGrid(!isGrid);
        }}
        trailIcon={
          <Search color={isDark ? appColors.white : appColors.lightText} />
        }
        showSearchBar={showSearchBar}
        searchContainerStyle={styles.searchContainer}
        gotoScreen={() => setSearchBar(!showSearchBar)}
      />
      <ItemsList isGrid={isGrid} />
    </View>
  );
}
