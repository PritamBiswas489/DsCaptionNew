import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import {styles} from './styles';
import appColors from '@theme/appColors';
import {Filter} from '@assets/icons/home/filter';
import {GlobalStyle} from '@style/styles';
import {useValues} from '../../../../App';
import {searchType} from './types';

export function SearchBar({
  containerStyle,
  inputContainerStyle,
  showFilter,
  gotoScreen,
  searchIcon,
  textInputSize,
}: searchType) {
  const {isDark,t} = useValues();

  return (
    <View
      style={[
        styles.rowContainer,
        styles.textInput,
        styles.margin,
        containerStyle,
        {
          backgroundColor: isDark ? appColors.darkTheme : appColors.white,
          borderWidth: isDark ? 1 : 1.3,
          borderColor: isDark ? appColors.darkBorder : appColors.border,
        },
      ]}>
      {searchIcon}
      <TextInput
        placeholderTextColor={appColors.lightText}
        placeholder={t('servicemen.search')}
        style={[
          styles.inputStyle,
          inputContainerStyle,
          {
            fontSize: textInputSize,
            color: isDark ? appColors.white : appColors.darkText,
          },
        ]}
      />
      {showFilter && (
        <View style={styles.rowContainer}>
          <View style={GlobalStyle.verticalLine}></View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={
              gotoScreen as unknown as (event: GestureResponderEvent) => void
            }>
            <Filter />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
