import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Plus, Search} from '@utils/icons';
import Header from '@commonComponents/header';
import {SearchBar} from '@otherComponent/home';
import appColors from '@theme/appColors';
import {useValues} from '../../../App';

export default function HeaderView({
  title,
  gotoScreen,
}: {
  title: string;
  gotoScreen: () => {};
}) {
  const {isDark} = useValues();
  return (
    <View>
      <Header
        showBackArrow={true}
        title={title}
        trailIcon={
          <Plus
            color={isDark ? appColors.white : appColors.darkText}
            height={'20'}
            width={'20'}
          />
        }
        gotoScreen={gotoScreen}
        content={
          <TouchableOpacity activeOpacity={0.9} onPress={() => {}}>
            <SearchBar searchIcon={<Search />} />
          </TouchableOpacity>
        }
      />
    </View>
  );
}
