import appColors from '@src/theme/appColors';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have react-native-vector-icons installed
import { useValues } from '../../../../../App';
const SearchExpense: React.FC = () => {
  const [fromDate, setFromDate] = useState('01 Dec 2024');
  const [toDate, setToDate] = useState('10 Dec 2024');
  const [orderId, setOrderId] = useState('');
  const { isDark, t } = useValues();
  return (
    <View style={[styles.container, { backgroundColor: isDark ? appColors.darkCardBg : appColors.white, }]}>
      <View style={[styles.searchContainer, {backgroundColor: isDark ? appColors.darkTheme : appColors.textInput}]}>
        <TextInput
          style={[styles.searchInput, {color: isDark ? appColors.white : appColors.darkText},]}
          placeholderTextColor={appColors.lightText}
          placeholder="Search with order id"
          value={orderId}
          onChangeText={setOrderId}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.dateContainer}>
        <Text style={[styles.dateLabel, { color: isDark ? appColors.white : appColors.darkText }]}>From</Text>
        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateText}>{fromDate}</Text>
        </TouchableOpacity>
        <Text style={[styles.dateLabel,{ color: isDark ? appColors.white : appColors.darkText }]}>To</Text>
        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateText}>{toDate}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.calendarButton}>
          <Icon name="calendar-today" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 6,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 6,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  searchButton: {
    backgroundColor: appColors.primary,
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateLabel: {
    marginRight: 8,
  },
  dateButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  dateText: {
    color: '#000',
  },
  calendarButton: {
    backgroundColor: appColors.primary,
    padding: 8,
    borderRadius: 8,
  },
});

export default SearchExpense;
