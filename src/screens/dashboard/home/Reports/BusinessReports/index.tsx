import {View, Alert,Text} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '@style/styles';
import Header from '@commonComponents/header';
import {GridIcon, Listviewicon, Search} from '@utils/icons';
import {useValues} from '../../../../../../App';
import appColors from '@theme/appColors';

export function BusinessReports(){
    const {isDark} = useValues();
    return (
        <View
          style={[
            GlobalStyle.mainView,
            {backgroundColor: isDark ? appColors.darkTheme : appColors.white},
          ]}>
          <Header
            showBackArrow={true}
            title={'newDeveloper.BusinessReport'}
            showSearchBar={false}     
          />
        <Text>Business reports</Text>
        </View>
      );
}