import appColors from '@src/theme/appColors';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have react-native-vector-icons installed

const WithdrawBalance: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Icon name="account-balance-wallet" size={40} color="#fff" />
        <View style={styles.textContainer}>
          <Text style={styles.label}>Withdrawable Balance</Text>
          <Text style={styles.amount}>₹ 1,109</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.withdrawButton}>
        <Text style={styles.withdrawButtonText}>Withdraw</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: appColors.primary,
    padding: 16,
    borderRadius: 8,
    margin: 16,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 16,
  },
  label: {
    color: '#fff',
    fontSize: 14,
  },
  amount: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  withdrawButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  withdrawButtonText: {
    color:appColors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WithdrawBalance;
